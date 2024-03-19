import styled from "styled-components";
import { DayWithUrl, ExtendedExercise } from "../shared/model";

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
  day: DayWithUrl;
  nextExercise: boolean;
}

export default function Card({ day, nextExercise }: Props) {
  if(nextExercise){
    return (
      <StyledCardNext className="CardNext">
      <p>{day.date?.toString()}</p>
      {day.exercises.map((exercise: ExtendedExercise) => (
        <p>{exercise.instruction}</p>
      ))}
    </StyledCardNext>
    )
  }
  return (
    <StyledCard>
      <p>{day.date?.toString()}</p>
      {day.exercises.map((exercise: ExtendedExercise) => (
        <div key={Math.random()}> {/* Make sure to add a unique key */}
            <p>{exercise.instruction}</p>
            <img src={exercise.url} alt="Instruction Image" />
      </div>
      ))}
    </StyledCard>
    
  );
}
