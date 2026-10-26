import raw from './contenido.json';
import type { Content, Exercise, Lesson, Unit } from './types';

// El contenido viaja dentro de la app. Más adelante (fase 4) se podrá descargar una versión más nueva.
export const content = raw as unknown as Content;

export const units: Unit[] = content.unidades;

export function unitById(id: string): Unit | undefined {
  return units.find(u => u.id === id);
}

export function playableLessons(unit: Unit): Lesson[] {
  return unit.bloqueada ? [] : unit.lecciones ?? [];
}

/** Orden global de todas las lecciones jugables, para saber cuál toca después. */
export function allLessonsInOrder(): { unit: Unit; lesson: Lesson }[] {
  const out: { unit: Unit; lesson: Lesson }[] = [];
  for (const section of content.secciones) {
    for (const uid of section.unidades) {
      const unit = unitById(uid);
      if (!unit || unit.bloqueada) continue;
      for (const lesson of playableLessons(unit)) out.push({ unit, lesson });
    }
  }
  return out;
}

/** Ejercicios de una lección. Un repaso mezcla ejercicios del resto de la unidad, con más peso para los fallados. */
export function exercisesFor(unit: Unit, lesson: Lesson, missed: Record<string, number>): Exercise[] {
  if (!lesson.repaso) return lesson.ejercicios ?? [];
  const pool = playableLessons(unit).filter(l => !l.repaso).flatMap(l => l.ejercicios ?? []);
  const weighted = pool
    .map(ex => ({ ex, w: Math.random() + (missed[ex.id] ?? 0) }))
    .sort((a, b) => b.w - a.w)
    .map(x => x.ex);
  return weighted.slice(0, 8);
}

export function shuffle<T>(items: T[]): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function normalize(s: string): string {
  return s.toLowerCase().replace(/[¿?¡!.,]/g, '').replace(/\s+/g, ' ').trim();
}
