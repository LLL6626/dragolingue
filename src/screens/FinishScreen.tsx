import { StyleSheet, Text, View } from 'react-native';
import Dragon from '../components/Dragon';
import { BigButton, Gem, Heart } from '../components/ui';
import { MAX_LIVES, XP_LESSON, XP_PERFECT_BONUS } from '../state/progress';
import { colors } from '../theme';
import type { LessonResult } from './LessonScreen';

export default function FinishScreen({ result, onContinue }: { result: LessonResult; onContinue: () => void }) {
  if (result.outOfLives) {
    return (
      <View style={styles.wrap}>
        <Dragon mood="sad" size={190} />
        <Text style={styles.title}>¡Te has quedado sin vidas!</Text>
        <Text style={styles.sub}>Las vidas se recuperan solas con el tiempo. Si haces un repaso, las recuperas todas.</Text>
        <BigButton label="Volver" onPress={onContinue} style={styles.btn} />
      </View>
    );
  }
  const xp = XP_LESSON + (result.perfect ? XP_PERFECT_BONUS : 0);
  return (
    <View style={styles.wrap}>
      <Dragon mood="cheer" size={200} />
      <Text style={styles.title}>{result.review ? '¡Repaso completado!' : '¡Lección completada!'}</Text>
      <View style={styles.cards}>
        <View style={[styles.card, { borderColor: colors.oro }]}>
          <Gem size={24} />
          <Text style={styles.cardValue}>+{xp} XP</Text>
          <Text style={styles.cardLabel}>{result.perfect ? '¡Sin fallos!' : 'Ganados'}</Text>
        </View>
        {result.review ? (
          <View style={[styles.card, { borderColor: colors.rojo }]}>
            <Heart size={24} />
            <Text style={styles.cardValue}>{MAX_LIVES}/{MAX_LIVES}</Text>
            <Text style={styles.cardLabel}>Vidas llenas</Text>
          </View>
        ) : null}
      </View>
      <BigButton label="Continuar" color={colors.ok} onPress={onContinue} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 18 },
  title: { fontSize: 26, fontWeight: '800', color: colors.ink, textAlign: 'center' },
  sub: { fontSize: 16, color: colors.muted, textAlign: 'center' },
  cards: { flexDirection: 'row', gap: 12 },
  card: {
    minWidth: 120, alignItems: 'center', gap: 4, padding: 14, borderRadius: 16, borderWidth: 2,
    backgroundColor: colors.surface,
  },
  cardValue: { fontSize: 20, fontWeight: '800', color: colors.ink },
  cardLabel: { fontSize: 13, fontWeight: '700', color: colors.muted },
  btn: { alignSelf: 'stretch', marginTop: 10 },
});
