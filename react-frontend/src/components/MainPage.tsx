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
      if(value){
        setWorkoutPlan(value);
        document.getElementsByClassName("CardNext")[0].scrollIntoView();
      }
    });
  }
  function dateIsEqual(date1?: Date, date2?: Date): boolean {
    var date1x = date1 ? new Date(date1) : undefined;
    var date2x = date2 ? new Date(date2) : undefined;
    if(date1x?.getFullYear() === date2x?.getFullYear() && date1x?.getMonth() === date2x?.getMonth() && date1x?.getDate() === date2x?.getDate()){
      return true;
    }
    return false;
  }
  var nextDate = new Date("2000-01-01");
  var isFound = false;
  var counter = 0;
  while(!isFound || !workoutPlan || counter >= workoutPlan?.days.length){
    var day = workoutPlan?.days[counter];
    counter++;
    if(day?.date){
      var dayDate = new Date(day.date);
      if(dayDate > new Date("2024-03-27") || dateIsEqual(dayDate, new Date("2024-03-27"))){
        nextDate = day.date;
        isFound = true;
      }
    }
  }

  return (
    <Section>
      <Title>Training Plan</Title>
      {workoutPlan?.days?.map((day: Day) => (
        <Card day={day} nextExercise={dateIsEqual(day.date ? new Date(day.date) : undefined, nextDate)}></Card>
      ))}
    </Section>
  );
}
