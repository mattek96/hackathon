import styled from "styled-components";
import { Day, Instructions } from "../shared/model";
import { useState } from "react";
import ImageViewerPopup from "./ImageViewerPopup";
import remoteService from "../services/RemoteService.tsx";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  
  const handleButtonClick = (instructionText: string) => {
    remoteService.post<string>("/mvp/image", instructionText).then((value: string) => {
      if (value) {
        setImageUrl(value); 
        setShowPopup(true);
      }
    }).catch( () => {setShowPopup(false);});

    
  }

  const handleClosePopup = () => {
    setImageUrl(null); 
    setShowPopup(false); 
  };

  if (nextExercise) {
    return (
      <StyledCard $color className="CardNext">
      <p>{day.date}</p>
        {day.exercises.map((exercise: Instructions, index) => (
          <div key={index}>
          <p>{exercise.instruction}</p>
          <button onClick={() => handleButtonClick(exercise.instruction)}>View Image</button>
          {showPopup && imageUrl && (<ImageViewerPopup imageUrl={imageUrl} onClose={handleClosePopup} />)}
          </div>
        ))} 
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <p>{day.date}</p>
      {day.exercises.map((exercise: Instructions, index) => (
        <div key={index}>
        <p>{exercise.instruction}</p>
        <button onClick={() => handleButtonClick(exercise.instruction)}>View Image</button>
        {showPopup && imageUrl && (<ImageViewerPopup imageUrl={imageUrl} onClose={handleClosePopup} />)}
        </div>
      ))} 
    </StyledCard>
  );
}



