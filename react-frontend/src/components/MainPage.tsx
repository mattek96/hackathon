import styled from "styled-components";
import remoteService from "../services/RemoteService.tsx";
import { useEffect, useState } from "react";
import { Day, WorkoutPlan } from "../shared/model.tsx";
import Card from "./Card.tsx";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 0;
  color: var(--secondary);
  padding-bottom: 4%;
`;

export default function MainPage() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | undefined>(
    undefined
  );

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    remoteService.get<WorkoutPlan>("/mvp").then((value: WorkoutPlan) => {
      setWorkoutPlan(value);
    });
  }

  return (
    <Section>
      <Title>Training Plan</Title>
      {workoutPlan?.days.map((day: Day) => (
        <Card day={day}></Card>
      ))}
    </Section>
  );
}
