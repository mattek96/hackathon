export interface ExtendedExercise {
  instruction: string;
  url: string;
}

export interface DayWithUrl {
  date?: Date;
  exercises: ExtendedExercise[];
}

export interface WorkoutPlanWithUrl {
  days: DayWithUrl[];
}

export interface UserInput {
  freeText: string;
  athleticism: number;
  startDate?: string;
  age: number;
  sex: number;
  frequency: number;
  durationInWeeks: number;
}
