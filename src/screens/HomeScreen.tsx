import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { allLessonsInOrder, content, playableLessons, unitById } from '../content';
import type { Lesson, Unit } from '../content/types';
import Dragon from '../components/Dragon';
import TipText from '../components/TipText';
import { Check, Chest, Close, Lock, Star } from '../components/ui';
import type { Progress } from '../state/progress';
import { colors } from '../theme';

type Props = { progress: Progress; onStart: (unit: Unit, lesson: Lesson) => void };

const OFFSETS = [0, 52, 78, 52, 0, -52, -78, -52];

export default function HomeScreen({ progress, onStart }: Props) {
  const [tipUnit, setTipUnit] = useState<Unit | null>(null);
  const order = allLessonsInOrder();
  const current = order.find(x => !progress.done[x.lesson.id])?.lesson.id;

  return (
    <>
      <ScrollView contentContainerStyle={styles.scroll}>
        {content.secciones.map(section => (
          <View key={section.nombre} style={{ gap: 18 }}>
            <Text style={styles.section}>{section.nombre}</Text>
            {section.unidades.map(uid => {
              const unit = unitById(uid);
              if (!unit) return null;
              const lessons = playableLessons(unit);
              const locked = !!unit.bloqueada;
              return (
                <View key={unit.id} style={{ gap: 16 }}>
                  <View style={[styles.banner, locked && { backgroundColor: colors.locked }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.bannerKicker}>{unit.tema}</Text>
                      <Text style={styles.bannerTitle}>{unit.titulo}</Text>
                    </View>
                    {unit.consejo && !locked ? (
                      <Pressable style={styles.tipBtn} onPress={() => setTipUnit(unit)}>
                        <Text style={styles.tipBtnText}>Consejos</Text>
                      </Pressable>
                    ) : null}
                  </View>
                  {locked ? (
                    <Text style={styles.soon}>Próximamente</Text>
                  ) : (
                    <View style={styles.path}>
                      {lessons.map((lesson, k) => {
                        const done = !!progress.done[lesson.id];
                        const isCurrent = lesson.id === current;
                        const open = done || isCurrent || progress.unlockAll;
                        const bg = done ? colors.oro : open ? colors.monte : colors.locked;
                        return (
                          <View key={lesson.id} style={{ transform: [{ translateX: OFFSETS[k % OFFSETS.length] }], alignItems: 'center' }}>
                            {isCurrent ? (
                              <View style={styles.startTag}>
                                <Text style={styles.startTagText}>EMPEZAR</Text>
                              </View>
                            ) : null}
                            <Pressable
                              disabled={!open}
                              onPress={() => onStart(unit, lesson)}
                              style={({ pressed }) => [styles.node, { backgroundColor: bg, transform: [{ translateY: pressed ? 3 : 0 }] }]}
                            >
                              {lesson.repaso ? <Chest /> : done ? <Check /> : open ? <Star /> : <Lock />}
                            </Pressable>
                            <Text style={styles.nodeLabel}>{lesson.nombre}</Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ))}
        <View style={styles.footer}>
          <Dragon mood="think" size={110} />
          <Text style={styles.footerText}>Más unidades en camino. ¡Dica luego!</Text>
        </View>
      </ScrollView>

      <Modal visible={!!tipUnit} animationType="slide" transparent onRequestClose={() => setTipUnit(null)}>
        <View style={styles.modalBack}>
          <View style={styles.sheet}>
            <View style={styles.sheetHead}>
              <Text style={styles.sheetTitle}>{tipUnit?.consejo?.titulo}</Text>
              <Pressable onPress={() => setTipUnit(null)} hitSlop={12}>
                <Close />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
              {tipUnit?.consejo ? <TipText html={tipUnit.consejo.html} /> : null}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, gap: 28, paddingBottom: 40 },
  section: { fontSize: 13, fontWeight: '800', color: colors.muted, textTransform: 'uppercase', letterSpacing: 1 },
  banner: {
    backgroundColor: colors.rojo, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12,
    borderBottomWidth: 4, borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  bannerKicker: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: '700' },
  bannerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  tipBtn: { borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 },
  tipBtnText: { color: '#fff', fontWeight: '800' },
  soon: { textAlign: 'center', color: colors.muted, fontWeight: '700' },
  path: { alignItems: 'center', gap: 14, paddingVertical: 4 },
  node: {
    width: 72, height: 66, borderRadius: 36, alignItems: 'center', justifyContent: 'center',
    borderBottomWidth: 6, borderBottomColor: 'rgba(0,0,0,0.22)',
  },
  nodeLabel: { marginTop: 4, fontSize: 12, fontWeight: '700', color: colors.muted },
  startTag: {
    backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 4, marginBottom: 6,
  },
  startTagText: { color: colors.monte, fontWeight: '800', fontSize: 12 },
  footer: { alignItems: 'center', gap: 8, marginTop: 8 },
  footerText: { color: colors.muted, fontWeight: '700' },
  modalBack: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '85%' },
  sheetHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 12 },
  sheetTitle: { fontSize: 20, fontWeight: '800', color: colors.ink, flex: 1 },
});
