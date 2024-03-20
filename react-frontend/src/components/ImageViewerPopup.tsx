import { useState } from "react";
import remoteService from "../services/RemoteService";
import LoadingPage from "../shared/LoadingPage";
import Button from "../shared/Button";

interface ImageViewerPopupProps {
  instruction: string;
}

const ImageViewerPopup: React.FC<ImageViewerPopupProps> = ({ instruction }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClosePopup = () => {
    setImageUrl(undefined);
  };

  function fetchImage() {
    setIsLoading(true);
    remoteService
      .post<string>("/mvp/image", instruction)
      .then((value: string) => {
        setImageUrl(value);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  if (imageUrl == undefined) {
    if (isLoading) {
      return <LoadingPage></LoadingPage>;
    }
    return (
      <div className="popup">
        <div className="popup-content">
          <Button onClick={fetchImage}>Fetch Image</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <img src={imageUrl} alt="Instruction Image" />
        <Button onClick={handleClosePopup}>Close</Button>
      </div>
    </div>
  );
};

export default ImageViewerPopup;
