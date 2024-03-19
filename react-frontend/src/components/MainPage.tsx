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
  const [nextDay, setNextDay] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    remoteService.get<WorkoutPlan>("/mvp").then((value: WorkoutPlan) => {
      if(value){
        setWorkoutPlan(value);
        setNextDay(getNextDate());
        document.getElementsByClassName("CardNext")[0].scrollIntoView();
      }
    });
  }

  function compareDateStrings(date1: string, date2: string): number {
    var date1x = date1.split("-");
    var date2x = date2.split("-");
    if(date1x[0] < date2x[0]){
      return -1;
    }
    if(date1x[0] > date2x[0]){
      return 1;
    }
    if(date1x[1] < date2x[1]){
      return -1;
    }
    if(date1x[1] > date2x[1]){
      return 1;
    }
    if(date1x[2] < date2x[2]){
      return -1;
    }
    if(date1x[2] > date2x[2]){
      return 1;
    }
    return 0;
  }

  function getNextDate(): string {
    var nextDate = "2000-01-01";
    var isFound = false;
    var counter = 0;
    // while(!isFound || !workoutPlan || counter < workoutPlan?.days.length){
    //   var day = workoutPlan?.days[counter];
    //   counter++;
      
    //   if(day?.date){
    //     if(compareDateStrings(day.date.toString(), "2024-03-27") === -1){
    //       console.log(day?.date?.toString());
    //       nextDate = day.date.toString();
    //       isFound = true;
    //     }
    //   }
    // }
    return nextDate;
  }
  

  return (
    <Section>
      <Title>Training Plan</Title>
      {workoutPlan?.days?.map((day: Day) => (
        <Card day={day} nextExercise={day.date?.toString() === nextDay}></Card>
      ))}
    </Section>
  );
}
