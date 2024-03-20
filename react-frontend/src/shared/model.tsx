export interface Exercise {
  instruction: string;
}

export interface Day {
  date?: Date;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  days: Day[];
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
