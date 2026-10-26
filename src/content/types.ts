// Tipos del contenido de contenido.json (grafía oficial de 2023).

export type PickExercise = { id: string; t: 'pick'; es: string; answer: string; options: [string, string][] };
export type ChoiceExercise = { id: string; t: 'choice'; ar: string; options: string[]; answer: number };
export type BuildExercise = { id: string; t: 'build'; es: string; answer: string; tiles: string[] };
export type FillExercise = { id: string; t: 'fill'; before: string; after: string; es: string; options: string[]; answer: string };
export type MatchExercise = { id: string; t: 'match'; pairs: [string, string][] };

export type Exercise = PickExercise | ChoiceExercise | BuildExercise | FillExercise | MatchExercise;

export type Lesson = {
  id: string;
  nombre: string;
  repaso?: boolean;
  ejercicios?: Exercise[];
};

export type Unit = {
  id: string;
  titulo: string;
  tema: string;
  bloqueada?: boolean;
  consejo?: { titulo: string; html: string };
  vocabulario?: { ar: string; es: string }[];
  lecciones?: Lesson[];
};

export type Section = { nombre: string; unidades: string[] };

export type Content = {
  version: number;
  secciones: Section[];
  felicitaciones: string[];
  unidades: Unit[];
};
