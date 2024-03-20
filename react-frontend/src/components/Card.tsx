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
  background-color: ${(props) => (props.$color ? "green" : "white")};
  margin: 10px;
`;

interface Props {
  day: Day;
  nextExercise: boolean;
}

export default function Card({ day, nextExercise }: Props) {
  if (nextExercise) {
    return (
      <StyledCard $color className="CardNext">
        <p>{day.date}</p>
        {day.exercises.map((exercise: Instructions, index) => (
          <p key={index}>{exercise.instruction}</p>
        ))}
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <p>{day.date}</p>
      {day.exercises.map((exercise: Instructions, index) => (
        <p key={index}>{exercise.instruction}</p>
      ))}
    </StyledCard>
  );
}
