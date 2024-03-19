import styled from "styled-components";
import { Day, Instructions } from "../shared/model";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
  width: 700px;
  border-style: solid;
  min-height: 100px;
  height: fit-content;
`;

const StyledCardNext =styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
  width: 700px;
  border-style: solid;
  min-height: 100px;
  height: fit-content;
  background: green;
`;

interface Props {
  day: Day;
  nextExercise: boolean;
}

export default function Card({ day, nextExercise }: Props) {
  if(nextExercise){
    return (
      <StyledCardNext className="CardNext">
      <p>{day.date?.toString()}</p>
      {day.exercises.map((exercise: Instructions) => (
        <p>{exercise.instruction}</p>
      ))}
    </StyledCardNext>
    )
  }
  return (
    <StyledCard>
      <p>{day.date?.toString()}</p>
      {day.exercises.map((exercise: Instructions) => (
        <p>{exercise.instruction}</p>
      ))}
    </StyledCard>
    
  );
}
