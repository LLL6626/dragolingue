import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { units } from '../content';
import type { Progress } from '../state/progress';
import { colors } from '../theme';

export default function VocabScreen({ progress }: { progress: Progress }) {
  const open = units.filter(u => !u.bloqueada && (u.vocabulario?.length ?? 0) > 0);
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>Vocabulario</Text>
      <Text style={styles.sub}>Las palabras de cada unidad. Las de las unidades que ya has empezado salen en azul.</Text>
      {open.map(u => {
        const started = (u.lecciones ?? []).some(l => progress.done[l.id]);
        return (
          <View key={u.id} style={styles.card}>
            <Text style={styles.unit}>{u.titulo}</Text>
            {(u.vocabulario ?? []).map((v, i) => (
              <View key={i} style={[styles.row, i > 0 && styles.line]}>
                <Text style={[styles.ar, !started && { color: colors.ink }]}>{v.ar}</Text>
                <Text style={styles.es}>{v.es}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 16, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '800', color: colors.ink },
  sub: { fontSize: 15, color: colors.muted },
  card: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 2, borderColor: colors.line, padding: 14 },
  unit: { fontSize: 17, fontWeight: '800', color: colors.rojo, marginBottom: 6 },
  row: { flexDirection: 'row', paddingVertical: 9, gap: 12 },
  line: { borderTopWidth: 1, borderTopColor: colors.line },
  ar: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.monte },
  es: { flex: 1, fontSize: 16, color: colors.muted },
});
