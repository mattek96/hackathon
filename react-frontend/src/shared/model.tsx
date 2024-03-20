export interface Instructions {
  instruction: string;
}

export interface Day {
  date: Date;
  exercises: Instructions[];
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
