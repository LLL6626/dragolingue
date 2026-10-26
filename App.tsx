import { StatusBar } from 'expo-status-bar';
import { useState, type ReactNode } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import type { Lesson, Unit } from './src/content/types';
import { Fire, Gem, Heart } from './src/components/ui';
import FinishScreen from './src/screens/FinishScreen';
import HomeScreen from './src/screens/HomeScreen';
import LessonScreen, { type LessonResult } from './src/screens/LessonScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import VocabScreen from './src/screens/VocabScreen';
import { minutesToNextLife, useProgress, visibleStreak } from './src/state/progress';
import { colors } from './src/theme';

type Tab = 'aprender' | 'vocabulario' | 'perfil';
type Screen =
  | { name: 'tabs' }
  | { name: 'lesson'; unit: Unit; lesson: Lesson; run: number }
  | { name: 'finish'; result: LessonResult };

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.root} edges={['top', 'bottom', 'left', 'right']}>
        <Main />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function Main() {
  const { progress, loseLife, recordMiss, completeLesson, reset, setUnlockAll, refresh } = useProgress();
  const [tab, setTab] = useState<Tab>('aprender');
  const [screen, setScreen] = useState<Screen>({ name: 'tabs' });

  if (!progress) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.rojo} size="large" />
      </View>
    );
  }

  const start = (unit: Unit, lesson: Lesson) => {
    refresh();
    if (!lesson.repaso && progress.lives <= 0) {
      Alert.alert(
        'Sin vidas',
        `Recuperarás una vida en ${minutesToNextLife(progress)} min. También puedes hacer un repaso para recuperarlas todas.`,
      );
      return;
    }
    setScreen({ name: 'lesson', unit, lesson, run: Date.now() });
  };

  if (screen.name === 'lesson') {
    return (
      <LessonScreen
        key={screen.run}
        unit={screen.unit}
        lesson={screen.lesson}
        progress={progress}
        onLoseLife={loseLife}
        onMiss={recordMiss}
        onExit={() => setScreen({ name: 'tabs' })}
        onFinish={result => {
          if (!result.outOfLives) completeLesson(result.lessonId, result.perfect, result.review);
          setScreen({ name: 'finish', result });
        }}
      />
    );
  }

  if (screen.name === 'finish') {
    return <FinishScreen result={screen.result} onContinue={() => setScreen({ name: 'tabs' })} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.brand}>Dragolingüe</Text>
        <View style={styles.stats}>
          <Stat icon={<Fire />} value={visibleStreak(progress)} color="#E07A10" />
          <Stat icon={<Gem />} value={progress.xp} color="#C48A00" />
          <Stat icon={<Heart />} value={progress.lives} color={colors.rojo} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {tab === 'aprender' && <HomeScreen progress={progress} onStart={start} />}
        {tab === 'vocabulario' && <VocabScreen progress={progress} />}
        {tab === 'perfil' && <ProfileScreen progress={progress} onReset={reset} onUnlockAll={setUnlockAll} />}
      </View>
      <View style={styles.tabbar}>
        <TabButton label="Aprender" active={tab === 'aprender'} onPress={() => setTab('aprender')} icon={HomeIcon} />
        <TabButton label="Vocabulario" active={tab === 'vocabulario'} onPress={() => setTab('vocabulario')} icon={BookIcon} />
        <TabButton label="Perfil" active={tab === 'perfil'} onPress={() => { refresh(); setTab('perfil'); }} icon={UserIcon} />
      </View>
    </View>
  );
}

function Stat({ icon, value, color }: { icon: ReactNode; value: number; color: string }) {
  return (
    <View style={styles.stat}>
      {icon}
      <Text style={[styles.statText, { color }]}>{value}</Text>
    </View>
  );
}

function TabButton({ label, active, onPress, icon: Icon }: {
  label: string; active: boolean; onPress: () => void; icon: (p: { color: string }) => ReactNode;
}) {
  const color = active ? colors.rojo : colors.muted;
  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Icon color={color} />
      <Text style={[styles.tabText, { color }]}>{label}</Text>
    </Pressable>
  );
}

const HomeIcon = ({ color }: { color: string }) => (
  <Svg width={26} height={26} viewBox="0 0 24 24">
    <Path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
  </Svg>
);
const BookIcon = ({ color }: { color: string }) => (
  <Svg width={26} height={26} viewBox="0 0 24 24">
    <Path d="M4 4h7a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-5a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h5z" fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
  </Svg>
);
const UserIcon = ({ color }: { color: string }) => (
  <Svg width={26} height={26} viewBox="0 0 24 24">
    <Circle cx={12} cy={8} r={4} fill="none" stroke={color} strokeWidth={2} />
    <Path d="M4 21a8 8 0 0 1 16 0" fill="none" stroke={color} strokeWidth={2} />
  </Svg>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: colors.line,
  },
  brand: { fontSize: 20, fontWeight: '900', color: colors.rojo },
  stats: { flexDirection: 'row', gap: 14 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 16, fontWeight: '800' },
  tabbar: { flexDirection: 'row', borderTopWidth: 2, borderTopColor: colors.line, backgroundColor: colors.surface },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8, gap: 2 },
  tabText: { fontSize: 12, fontWeight: '800' },
});
