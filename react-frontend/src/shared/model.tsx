export interface Instructions {
  instruction: string;
}

export interface Day {
  date?: Date;
  exercises: Instructions[];
}

export interface WorkoutPlan {
  days: Day[];
}

export interface OpenAiRequestDto {
  freeText: string;
}
