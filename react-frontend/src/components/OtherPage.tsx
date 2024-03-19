import styled from "styled-components";
import Button from "../shared/Button.tsx";
import remoteService from "../services/RemoteService.tsx";
import { SetStateAction, useState } from "react";
import { UserInput } from "../shared/model.tsx";
import Dropdown from "../shared/Dropdown.tsx";
import Input from "../shared/Input.tsx";
import LoadingPage from "../shared/LoadingPage.tsx";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExampleTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 0;
  color: var(--secondary);
  padding-bottom: 4%;
`;

const sexOptions = ["Male", "Female", "Other"];
const sportLevelOptions = ["Beginner", "Intermediate", "Advanced"];
const workoutsPerWeekOptions = ["1", "2", "3", "4", "5", "6", "7"];

export default function OtherPage() {
  const [sex, setSex] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [athleticism, setAthleticism] = useState<string>("Beginner");
  const [durationInWeeks, setDurationInWeeks] = useState<number>(0);
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState<number>(0);
  const [trainingGoal, setTrainingGoal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const goToHomePage = () => navigate('/');

  function postUserInformation() {
    const request: UserInput = {
      freeText: trainingGoal,
      athleticism: sportLevelOptions.indexOf(athleticism),
      age: age,
      sex: sexOptions.indexOf(sex),
      frequency: workoutsPerWeek,
      durationInWeeks: durationInWeeks,
    };
    setIsLoading(true);

    remoteService.post<UserInput>("/mvp", request).then(() => {
      goToHomePage();
    }).catch( () => {setIsLoading(false);});
  }

  const callbackSetSex = (newValue: SetStateAction<string>) => {
    setSex(newValue);
  };

  const callbackSetAthleticism = (newValue: SetStateAction<string>) => {
    setAthleticism(newValue);
  };

  const callbackSetWorkoutsPerWeek = (newValue: SetStateAction<number>) => {
    setWorkoutsPerWeek(newValue);
  };

  if (isLoading == undefined ||!isLoading)
  {
    return (
      <Section>
        <ExampleTitle>Please select your user profile</ExampleTitle>
  
        <label>Gender</label>
        <Dropdown options={sexOptions} callback={callbackSetSex}></Dropdown>
        <label>Athleticism</label>
        <Dropdown
          options={sportLevelOptions}
          callback={callbackSetAthleticism}
        ></Dropdown>
        <label>Age</label>
        <Input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.valueAsNumber)}
        />
        <label>Duration in weeks</label>
        <Input
          type="number"
          value={durationInWeeks}
          onChange={(e) => setDurationInWeeks(e.target.valueAsNumber)}
        />
        <label>Training sessions per week</label>
        <Dropdown
          options={workoutsPerWeekOptions}
          callback={callbackSetWorkoutsPerWeek}
        ></Dropdown>
        <label>Describe your training goal:</label>
        <Input
          type="string"
          value={trainingGoal}
          onChange={(e) => setTrainingGoal(e.target.value)}
        />
        <Button onClick={postUserInformation}>Submit</Button>
      </Section>
    );
  }
  else
  {
    return <LoadingPage/>
  }
 
}
