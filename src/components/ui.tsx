import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme';

/** Botón grande con "sombra" inferior, como en el prototipo. */
export function BigButton({
  label, onPress, color = colors.monte, disabled, style,
}: { label: string; onPress: () => void; color?: string; disabled?: boolean; style?: StyleProp<ViewStyle> }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.big,
        { backgroundColor: disabled ? colors.locked : color, transform: [{ translateY: pressed ? 3 : 0 }] },
        pressed ? styles.bigPressed : null,
        style,
      ]}
    >
      <Text style={styles.bigText}>{label}</Text>
    </Pressable>
  );
}

/** Ficha seleccionable (opciones, palabras para construir, parejas). */
export function Chip({
  children, onPress, state = 'idle', disabled, style,
}: {
  children: ReactNode;
  onPress?: () => void;
  state?: 'idle' | 'selected' | 'ok' | 'ko' | 'used';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const palette = {
    idle: { bg: colors.surface, border: colors.line },
    selected: { bg: colors.monteSoft, border: colors.monte },
    ok: { bg: colors.okSoft, border: colors.ok },
    ko: { bg: colors.koSoft, border: colors.ko },
    used: { bg: colors.line, border: colors.line },
  }[state];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || state === 'used'}
      style={[styles.chip, { backgroundColor: palette.bg, borderColor: palette.border }, style]}
    >
      <View style={{ opacity: state === 'used' ? 0 : 1, alignItems: 'center' }}>{children}</View>
    </Pressable>
  );
}

export function Heart({ size = 20, color = colors.rojo }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 6-8 11-8 11z" fill={color} />
    </Svg>
  );
}

export function Fire({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z" fill="#F28C1B" />
    </Svg>
  );
}

export function Gem({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M6 3h12l4 6-10 12L2 9z" fill="#F2B200" />
      <Path d="M2 9h20M8 3l4 18 4-18" stroke="#C48A00" strokeWidth={1.2} fill="none" />
    </Svg>
  );
}

export function Check({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 12l5 5L20 6" stroke="#fff" strokeWidth={3.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function Lock({ size = 26 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M7 10h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" fill="#fff" opacity={0.9} />
      <Path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="#fff" strokeWidth={2.5} fill="none" opacity={0.9} />
    </Svg>
  );
}

export function Star({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" fill="#fff" />
    </Svg>
  );
}

export function Chest({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5 9h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" fill="#fff" />
      <Path d="M3 9a9 5 0 0 1 18 0" fill="#fff" />
      <Path d="M11 11h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z" fill={colors.oro} />
    </Svg>
  );
}

export function Close({ size = 24, color = colors.muted }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2.8} strokeLinecap="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  big: {
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(0,0,0,0.22)',
  },
  bigPressed: { borderBottomWidth: 1 },
  bigText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase' },
  chip: {
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
