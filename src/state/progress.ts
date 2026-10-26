import Storage from 'expo-sqlite/kv-store';
import { useCallback, useEffect, useState } from 'react';

// Reglas de juego (documento de la fase 3).
export const MAX_LIVES = 5;
export const LIFE_MINUTES = 30; // pendiente de confirmar: tiempo para recuperar 1 vida
export const XP_LESSON = 10;
export const XP_PERFECT_BONUS = 5;

const KEY = 'dragolingue-progreso-v1';

export type Progress = {
  done: Record<string, boolean>; // lecciones completadas
  xp: number;
  streak: number;
  lastDay: string | null; // AAAA-MM-DD en hora local
  lives: number;
  livesUpdatedAt: number; // ms
  unlockAll: boolean;
  missed: Record<string, number>; // fallos por ejercicio, para los repasos
};

const initial = (): Progress => ({
  done: {},
  xp: 0,
  streak: 0,
  lastDay: null,
  lives: MAX_LIVES,
  livesUpdatedAt: Date.now(),
  unlockAll: false,
  missed: {},
});

export function localDay(d = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const [ya, ma, da] = a.split('-').map(Number);
  const [yb, mb, db] = b.split('-').map(Number);
  return Math.round((Date.UTC(yb, mb - 1, db) - Date.UTC(ya, ma - 1, da)) / 86400000);
}

/** Recupera las vidas que tocan según el tiempo pasado. */
export function regenerate(p: Progress, now = Date.now()): Progress {
  if (p.lives >= MAX_LIVES) return { ...p, livesUpdatedAt: now };
  const step = LIFE_MINUTES * 60000;
  const gained = Math.floor((now - p.livesUpdatedAt) / step);
  if (gained <= 0) return p;
  const lives = Math.min(MAX_LIVES, p.lives + gained);
  return { ...p, lives, livesUpdatedAt: lives >= MAX_LIVES ? now : p.livesUpdatedAt + gained * step };
}

/** Minutos que faltan para la próxima vida (0 si están llenas). */
export function minutesToNextLife(p: Progress, now = Date.now()): number {
  if (p.lives >= MAX_LIVES) return 0;
  const left = p.livesUpdatedAt + LIFE_MINUTES * 60000 - now;
  return Math.max(1, Math.ceil(left / 60000));
}

/** Racha que se ve hoy: si ayer no se practicó, se ha perdido. */
export function visibleStreak(p: Progress): number {
  if (!p.lastDay) return 0;
  return daysBetween(p.lastDay, localDay()) <= 1 ? p.streak : 0;
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    (async () => {
      let p = initial();
      try {
        const raw = await Storage.getItem(KEY);
        if (raw) p = { ...p, ...JSON.parse(raw) };
      } catch {
        // si no se puede leer, se empieza de cero
      }
      setProgress(regenerate(p));
    })();
  }, []);

  const save = useCallback((next: Progress) => {
    setProgress(next);
    Storage.setItem(KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const update = useCallback(
    (fn: (p: Progress) => Progress) => {
      setProgress(prev => {
        if (!prev) return prev;
        const next = fn(regenerate(prev));
        Storage.setItem(KEY, JSON.stringify(next)).catch(() => {});
        return next;
      });
    },
    [],
  );

  const loseLife = useCallback(() => {
    update(p => ({
      ...p,
      lives: Math.max(0, p.lives - 1),
      livesUpdatedAt: p.lives >= MAX_LIVES ? Date.now() : p.livesUpdatedAt,
    }));
  }, [update]);

  const recordMiss = useCallback((exId: string) => {
    update(p => ({ ...p, missed: { ...p.missed, [exId]: (p.missed[exId] ?? 0) + 1 } }));
  }, [update]);

  const completeLesson = useCallback(
    (lessonId: string, perfect: boolean, isReview: boolean) => {
      update(p => {
        const today = localDay();
        let streak = p.streak;
        if (p.lastDay !== today) {
          streak = p.lastDay && daysBetween(p.lastDay, today) === 1 ? p.streak + 1 : 1;
        }
        return {
          ...p,
          done: { ...p.done, [lessonId]: true },
          xp: p.xp + XP_LESSON + (perfect ? XP_PERFECT_BONUS : 0),
          streak,
          lastDay: today,
          // un repaso completo devuelve todas las vidas
          lives: isReview ? MAX_LIVES : p.lives,
          livesUpdatedAt: isReview ? Date.now() : p.livesUpdatedAt,
        };
      });
    },
    [update],
  );

  const reset = useCallback(() => save(initial()), [save]);
  const setUnlockAll = useCallback((v: boolean) => update(p => ({ ...p, unlockAll: v })), [update]);
  const refresh = useCallback(() => update(p => p), [update]);

  return { progress, loseLife, recordMiss, completeLesson, reset, setUnlockAll, refresh };
}
