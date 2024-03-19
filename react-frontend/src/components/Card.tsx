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

interface Props {
  day: Day;
}

export default function Card({ day }: Props) {
  return (
    <StyledCard>
      <p>{day.date}</p>
      {day.exercises.map((exercise: Instructions) => (
        <p>{exercise.instruction}</p>
      ))}
    </StyledCard>
  );
}
