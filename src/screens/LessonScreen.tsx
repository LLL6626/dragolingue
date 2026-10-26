import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { content, exercisesFor } from '../content';
import type { Exercise, Lesson, Unit } from '../content/types';
import Dragon, { type Mood } from '../components/Dragon';
import { BigButton, Close, Heart } from '../components/ui';
import { correctText, ExerciseView, instruction, isCorrect, Match } from '../exercises/Exercises';
import type { Progress } from '../state/progress';
import { colors } from '../theme';

export type LessonResult = { lessonId: string; total: number; perfect: boolean; review: boolean; outOfLives: boolean };

type Props = {
  unit: Unit;
  lesson: Lesson;
  progress: Progress;
  onLoseLife: () => void;
  onMiss: (exId: string) => void;
  onExit: () => void;
  onFinish: (r: LessonResult) => void;
};

type Feedback = { ok: boolean; text: string } | null;

export default function LessonScreen({ unit, lesson, progress, onLoseLife, onMiss, onExit, onFinish }: Props) {
  const review = !!lesson.repaso;
  const initial = useMemo(() => exercisesFor(unit, lesson, progress.missed), [unit, lesson]); // eslint-disable-line react-hooks/exhaustive-deps
  const [queue, setQueue] = useState<Exercise[]>(initial);
  const [i, setI] = useState(0);
  const [right, setRight] = useState(0);
  const [errors, setErrors] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const ex = queue[i];
  const total = initial.length;
  const pct = total ? Math.min(1, right / total) : 0;
  // En los repasos los fallos no cuestan vidas.
  const lives = review ? null : progress.lives;

  const praise = () => content.felicitaciones[Math.floor(Math.random() * content.felicitaciones.length)] ?? '¡Muito bien!';

  const resolve = (ok: boolean) => {
    if (ok) {
      setRight(r => r + 1);
      setFeedback({ ok: true, text: praise() });
    } else {
      setErrors(e => e + 1);
      onMiss(ex.id);
      if (!review) onLoseLife();
      setQueue(q => [...q, ex]); // el fallado vuelve al final
      setFeedback({ ok: false, text: correctText(ex) });
    }
  };

  const check = () => {
    if (answer == null) return;
    resolve(isCorrect(ex, answer));
  };

  const next = () => {
    const outOfLives = !review && feedback && !feedback.ok && progress.lives <= 0;
    if (outOfLives) {
      onFinish({ lessonId: lesson.id, total, perfect: false, review, outOfLives: true });
      return;
    }
    if (i + 1 >= queue.length) {
      onFinish({ lessonId: lesson.id, total, perfect: errors === 0, review, outOfLives: false });
      return;
    }
    setI(i + 1);
    setAnswer(null);
    setFeedback(null);
  };

  const exit = () =>
    Alert.alert('¿Salir de la lección?', 'Perderás lo que llevas de esta lección.', [
      { text: 'Seguir', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: onExit },
    ]);

  const mood: Mood = feedback ? (feedback.ok ? 'cheer' : 'sad') : 'think';

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.top}>
        <Pressable onPress={exit} hitSlop={12}>
          <Close size={26} />
        </Pressable>
        <View style={styles.bar}>
          <View style={[styles.barFill, { width: `${pct * 100}%` }]} />
        </View>
        {lives != null ? (
          <View style={styles.hearts}>
            <Heart size={22} />
            <Text style={styles.heartsText}>{lives}</Text>
          </View>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.head}>
          <Dragon mood={mood} size={84} />
          <Text style={styles.instruction}>{instruction(ex)}</Text>
        </View>
        {ex.t === 'match' ? (
          <Match key={`${i}-${ex.id}`} ex={ex} onDone={withErrors => {
            if (withErrors) { setErrors(e => e + 1); onMiss(ex.id); }
            setRight(r => r + 1);
            setFeedback({ ok: true, text: praise() });
          }} />
        ) : (
          <ExerciseView key={`${i}-${ex.id}`} ex={ex} locked={!!feedback} onReady={setAnswer} />
        )}
      </ScrollView>

      <View style={[styles.footer, feedback && (feedback.ok ? styles.footerOk : styles.footerKo)]}>
        {feedback ? (
          <View style={{ gap: 4, marginBottom: 12 }}>
            <Text style={[styles.fbTitle, { color: feedback.ok ? colors.ok : colors.ko }]}>
              {feedback.ok ? feedback.text : 'Respuesta correcta:'}
            </Text>
            {!feedback.ok ? <Text style={styles.fbText}>{feedback.text}</Text> : null}
          </View>
        ) : null}
        {feedback ? (
          <BigButton label="Continuar" color={feedback.ok ? colors.ok : colors.ko} onPress={next} />
        ) : ex.t === 'match' ? null : (
          <BigButton label="Comprobar" color={colors.ok} disabled={answer == null} onPress={check} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 12 },
  bar: { flex: 1, height: 16, borderRadius: 8, backgroundColor: colors.line, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.oro, borderRadius: 8 },
  hearts: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heartsText: { fontSize: 18, fontWeight: '800', color: colors.rojo },
  body: { padding: 16, gap: 18, paddingBottom: 30 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  instruction: { flex: 1, fontSize: 20, fontWeight: '800', color: colors.ink },
  footer: { padding: 16, borderTopWidth: 2, borderTopColor: colors.line },
  footerOk: { backgroundColor: colors.okSoft, borderTopColor: colors.okSoft },
  footerKo: { backgroundColor: colors.koSoft, borderTopColor: colors.koSoft },
  fbTitle: { fontSize: 19, fontWeight: '800' },
  fbText: { fontSize: 16, color: colors.ko },
});
