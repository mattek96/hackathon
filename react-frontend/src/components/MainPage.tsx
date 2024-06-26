import styled from "styled-components";
import remoteService from "../services/RemoteService.tsx";
import { useEffect, useState } from "react";
import { Day, WorkoutPlan } from "../shared/model.tsx";
import Card from "./Card.tsx";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 0;
  color: var(--secondary);
  padding-bottom: 4%;
`;

const isTrue = false;

export default function MainPage() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | undefined>(
    undefined
  );
  const [nextDay, setNextDay] = useState<Day | undefined>();
  

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    scrollNextIntoView();
  });

  useEffect(() => {
    if (workoutPlan != null) {
      setNextWorkout();
    }
  }, [workoutPlan]);

  function loadData() {
    remoteService.get<WorkoutPlan>("/mvp").then((value: WorkoutPlan) => {
      if (value) {
        setWorkoutPlan(value);
      }
    });
  }

  function setNextWorkout() {
    var nextWorkout = workoutPlan!.days.filter((value) => {
      return (
        new Date(value.date!.toString()).getFullYear() >=
          new Date().getFullYear() &&
        new Date(value.date!.toString()).getMonth() >= new Date().getMonth() &&
        new Date(value.date!.toString()).getDate() >= new Date().getDate()
      );
    });
    setNextDay(nextWorkout.at(0));
  }

  function scrollNextIntoView() {
    document.getElementsByClassName("CardNext")[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <Section>
      <Title>Training Plan</Title>
      {workoutPlan?.days.map((day: Day, index) => (
        <Card key={index} day={day} nextExercise={day === nextDay}></Card>
      ))}

    </Section>
  );
}
