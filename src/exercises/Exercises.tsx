import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { normalize, shuffle } from '../content';
import type { BuildExercise, ChoiceExercise, Exercise, FillExercise, MatchExercise, PickExercise } from '../content/types';
import { Chip } from '../components/ui';
import { colors } from '../theme';

// Cada ejercicio informa de la respuesta elegida con onReady(respuesta | null).
// La pantalla de lección decide si es correcta con isCorrect(). "Unir parejas" se corrige solo.

type Props<E> = { ex: E; locked: boolean; onReady: (answer: string | null) => void };

export function isCorrect(ex: Exercise, answer: string): boolean {
  switch (ex.t) {
    case 'pick':
    case 'fill':
      return answer === ex.answer;
    case 'choice':
      return Number(answer) === ex.answer;
    case 'build':
      return normalize(answer) === normalize(ex.answer);
    case 'match':
      return true;
  }
}

export function correctText(ex: Exercise): string {
  switch (ex.t) {
    case 'pick':
      return ex.answer;
    case 'choice':
      return ex.options[ex.answer];
    case 'build':
      return ex.answer;
    case 'fill':
      return `${ex.before} ${ex.answer} ${ex.after}`.replace(/\s+([.,?!])/g, '$1').trim();
    case 'match':
      return '';
  }
}

export function instruction(ex: Exercise): string {
  return {
    pick: 'Elige la imagen correcta',
    choice: '¿Qué significa esto?',
    build: 'Traduce esta frase',
    fill: 'Completa la frase',
    match: 'Une las parejas',
  }[ex.t];
}

/* ---------- Elegir la imagen ---------- */
function Pick({ ex, locked, onReady }: Props<PickExercise>) {
  const options = useMemo(() => shuffle(ex.options), [ex]);
  const [sel, setSel] = useState<string | null>(null);
  return (
    <View style={{ gap: 18 }}>
      <Text style={styles.prompt}>«{ex.es}»</Text>
      <View style={styles.grid}>
        {options.map(([word, emoji]) => (
          <Chip
            key={word}
            disabled={locked}
            state={sel === word ? 'selected' : 'idle'}
            onPress={() => { setSel(word); onReady(word); }}
            style={styles.pickCard}
          >
            <Text style={{ fontSize: 44 }}>{emoji}</Text>
            <Text style={styles.option}>{word}</Text>
          </Chip>
        ))}
      </View>
    </View>
  );
}

/* ---------- Traducir (elegir la traducción) ---------- */
function Choice({ ex, locked, onReady }: Props<ChoiceExercise>) {
  const order = useMemo(() => shuffle(ex.options.map((_, i) => i)), [ex]);
  const [sel, setSel] = useState<number | null>(null);
  return (
    <View style={{ gap: 18 }}>
      <Bubble text={ex.ar} />
      <View style={{ gap: 10 }}>
        {order.map(i => (
          <Chip
            key={i}
            disabled={locked}
            state={sel === i ? 'selected' : 'idle'}
            onPress={() => { setSel(i); onReady(String(i)); }}
            style={{ alignItems: 'stretch' }}
          >
            <Text style={styles.option}>{ex.options[i]}</Text>
          </Chip>
        ))}
      </View>
    </View>
  );
}

/* ---------- Construir la frase ---------- */
function Build({ ex, locked, onReady }: Props<BuildExercise>) {
  const tiles = useMemo(() => shuffle(ex.tiles.map((w, i) => ({ w, i }))), [ex]);
  const [built, setBuilt] = useState<number[]>([]);
  const update = (next: number[]) => {
    setBuilt(next);
    onReady(next.length ? next.map(i => ex.tiles[i]).join(' ') : null);
  };
  return (
    <View style={{ gap: 18 }}>
      <Text style={styles.prompt}>{ex.es}</Text>
      <View style={styles.answerLine}>
        {built.map(i => (
          <Chip key={i} disabled={locked} onPress={() => update(built.filter(b => b !== i))}>
            <Text style={styles.tile}>{ex.tiles[i]}</Text>
          </Chip>
        ))}
      </View>
      <View style={styles.wrap}>
        {tiles.map(({ w, i }) => (
          <Chip key={i} disabled={locked} state={built.includes(i) ? 'used' : 'idle'} onPress={() => update([...built, i])}>
            <Text style={styles.tile}>{w}</Text>
          </Chip>
        ))}
      </View>
    </View>
  );
}

/* ---------- Completar el hueco ---------- */
function Fill({ ex, locked, onReady }: Props<FillExercise>) {
  const options = useMemo(() => shuffle(ex.options), [ex]);
  const [sel, setSel] = useState<string | null>(null);
  return (
    <View style={{ gap: 18 }}>
      <View style={styles.fillCard}>
        <Text style={styles.fillText}>
          {ex.before}{' '}
          <Text style={[styles.gap, sel ? styles.gapFilled : null]}>{sel ?? '      '}</Text>{' '}
          {ex.after}
        </Text>
        <Text style={styles.fillEs}>{ex.es}</Text>
      </View>
      <View style={styles.wrap}>
        {options.map(o => (
          <Chip key={o} disabled={locked} state={sel === o ? 'selected' : 'idle'} onPress={() => { setSel(o); onReady(o); }}>
            <Text style={styles.tile}>{o}</Text>
          </Chip>
        ))}
      </View>
    </View>
  );
}

/* ---------- Unir parejas ---------- */
export function Match({ ex, onDone }: { ex: MatchExercise; onDone: (withErrors: boolean) => void }) {
  const left = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ w: p[0], i }))), [ex]);
  const right = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ w: p[1], i }))), [ex]);
  const [pick, setPick] = useState<{ side: 'a' | 'b'; i: number } | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrong, setWrong] = useState<{ a: number; b: number } | null>(null);
  const [hadError, setHadError] = useState(false);

  const tap = (side: 'a' | 'b', i: number) => {
    setWrong(null);
    if (!pick || pick.side === side) { setPick({ side, i }); return; }
    const a = side === 'a' ? i : pick.i;
    const b = side === 'b' ? i : pick.i;
    setPick(null);
    if (a === b) {
      const next = [...matched, a];
      setMatched(next);
      if (next.length === ex.pairs.length) onDone(hadError);
    } else {
      setHadError(true);
      setWrong({ a, b });
    }
  };

  const stateFor = (side: 'a' | 'b', i: number) => {
    if (matched.includes(i)) return 'ok' as const;
    if (wrong && ((side === 'a' && wrong.a === i) || (side === 'b' && wrong.b === i))) return 'ko' as const;
    if (pick && pick.side === side && pick.i === i) return 'selected' as const;
    return 'idle' as const;
  };

  return (
    <View style={styles.matchRow}>
      {(['a', 'b'] as const).map(side => (
        <View key={side} style={{ flex: 1, gap: 10 }}>
          {(side === 'a' ? left : right).map(({ w, i }) => (
            <Chip key={i} state={stateFor(side, i)} disabled={matched.includes(i)} onPress={() => tap(side, i)}>
              <Text style={[styles.tile, side === 'a' && { color: colors.monte }]}>{w}</Text>
            </Chip>
          ))}
        </View>
      ))}
    </View>
  );
}

function Bubble({ text }: { text: string }) {
  return (
    <View style={styles.bubble}>
      <Text style={styles.bubbleText}>{text}</Text>
    </View>
  );
}

export function ExerciseView({ ex, locked, onReady }: Props<Exercise>) {
  switch (ex.t) {
    case 'pick':
      return <Pick ex={ex} locked={locked} onReady={onReady} />;
    case 'choice':
      return <Choice ex={ex} locked={locked} onReady={onReady} />;
    case 'build':
      return <Build ex={ex} locked={locked} onReady={onReady} />;
    case 'fill':
      return <Fill ex={ex} locked={locked} onReady={onReady} />;
    case 'match':
      return null; // se pinta aparte con <Match>
  }
}

const styles = StyleSheet.create({
  prompt: { fontSize: 22, fontWeight: '800', color: colors.ink },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  pickCard: { width: '47%', paddingVertical: 18, gap: 6 },
  option: { fontSize: 17, fontWeight: '600', color: colors.ink },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  tile: { fontSize: 17, fontWeight: '600', color: colors.ink },
  answerLine: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8, minHeight: 112,
    borderBottomWidth: 2, borderTopWidth: 2, borderColor: colors.line, paddingVertical: 10, alignContent: 'flex-start',
  },
  fillCard: { backgroundColor: colors.surface, borderRadius: 16, padding: 18, borderWidth: 2, borderColor: colors.line, gap: 8 },
  fillText: { fontSize: 20, lineHeight: 34, color: colors.ink },
  gap: { borderBottomWidth: 2, color: colors.muted, textDecorationLine: 'underline' },
  gapFilled: { color: colors.monte, fontWeight: '800' },
  fillEs: { fontSize: 15, color: colors.muted },
  matchRow: { flexDirection: 'row', gap: 12 },
  bubble: {
    alignSelf: 'flex-start', backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line,
    borderRadius: 18, paddingVertical: 12, paddingHorizontal: 16,
  },
  bubbleText: { fontSize: 20, fontWeight: '700', color: colors.monte },
});
