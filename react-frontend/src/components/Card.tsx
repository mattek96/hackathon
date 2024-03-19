import styled from "styled-components";
import { DayWithUrl, ExtendedExercise } from "../shared/model";
import { useState } from "react";
import ImageViewerPopup from "./ImageViewerPopup";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  
  // Define a function to handle button click and navigate to a new page which displays the image and a button to navigate 
  // back -> home 
  const handleButtonClick = (imageUrl: string) => {
    setImageUrl(imageUrl); 
    setShowPopup(true);
  }

  const handleClosePopup = () => {
    setImageUrl(null); 
    setShowPopup(false); 
  };

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
        <div key={Math.random()}> {/* TODO: Make sure to add a unique key */}
            <p>{exercise.instruction}</p>
            <button onClick={() => handleButtonClick(exercise.url)}>View Image</button>
            {showPopup && imageUrl && (<ImageViewerPopup imageUrl={imageUrl} onClose={handleClosePopup} />
      )}
        </div>
      ))}
    </StyledCard>
  );
}



