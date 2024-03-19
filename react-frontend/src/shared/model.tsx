export interface OpenAiResponseDto {
  response: string;
}

export interface OpenAiRequestDto {
  freeText: string;
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
