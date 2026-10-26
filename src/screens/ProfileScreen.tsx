import type { ReactNode } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { allLessonsInOrder } from '../content';
import Dragon from '../components/Dragon';
import { BigButton, Fire, Gem, Heart } from '../components/ui';
import { MAX_LIVES, minutesToNextLife, visibleStreak, type Progress } from '../state/progress';
import { colors } from '../theme';

type Props = { progress: Progress; onReset: () => void; onUnlockAll: (v: boolean) => void };

export default function ProfileScreen({ progress, onReset, onUnlockAll }: Props) {
  const total = allLessonsInOrder().length;
  const done = allLessonsInOrder().filter(x => progress.done[x.lesson.id]).length;
  const next = minutesToNextLife(progress);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={{ alignItems: 'center' }}>
        <Dragon mood="happy" size={150} />
        <Text style={styles.title}>Tu progreso</Text>
      </View>
      <View style={styles.stats}>
        <Stat icon={<Fire size={26} />} value={String(visibleStreak(progress))} label="días de racha" />
        <Stat icon={<Gem size={26} />} value={String(progress.xp)} label="XP" />
        <Stat icon={<Heart size={26} />} value={`${progress.lives}/${MAX_LIVES}`} label={next ? `+1 en ${next} min` : 'vidas'} />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Lecciones completadas: <Text style={{ fontWeight: '800' }}>{done} de {total}</Text></Text>
      </View>
      <View style={[styles.card, styles.rowCard]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Desbloquear todo</Text>
          <Text style={styles.cardSub}>Para revisar el contenido sin seguir el orden.</Text>
        </View>
        <Switch value={progress.unlockAll} onValueChange={onUnlockAll} trackColor={{ true: colors.monte }} />
      </View>
      <BigButton
        label="Borrar progreso"
        color={colors.rojo}
        onPress={() =>
          Alert.alert('Borrar progreso', 'Se perderán la racha, la XP y las lecciones hechas en este móvil.', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Borrar', style: 'destructive', onPress: onReset },
          ])
        }
      />
      <Text style={styles.note}>
        El progreso se guarda solo en este móvil. Las cuentas llegarán en la fase 4.
      </Text>
    </ScrollView>
  );
}

function Stat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <View style={styles.stat}>
      {icon}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 16, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: colors.ink, marginTop: 6 },
  stats: { flexDirection: 'row', gap: 10 },
  stat: {
    flex: 1, alignItems: 'center', gap: 4, backgroundColor: colors.surface, borderRadius: 16,
    borderWidth: 2, borderColor: colors.line, paddingVertical: 14,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.ink },
  statLabel: { fontSize: 12, color: colors.muted, fontWeight: '700', textAlign: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 2, borderColor: colors.line, padding: 16 },
  rowCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardText: { fontSize: 16, color: colors.ink },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.ink },
  cardSub: { fontSize: 14, color: colors.muted },
  note: { fontSize: 13, color: colors.muted, textAlign: 'center' },
});
