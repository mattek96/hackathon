export interface Instructions {
  instruction: string;
}

export interface Day {
  date: string;
  exercises: Instructions[];
}

export interface WorkoutPlan {
  days: Day[];
}

export interface OpenAiRequestDto {
  freeText: string;
}
