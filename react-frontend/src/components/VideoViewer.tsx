import { useState } from "react";
import remoteService from "../services/RemoteService";
import LoadingPage from "../shared/LoadingPage";
import Button from "../shared/Button";

interface ImageViewerPopupProps {
  instruction: string;
}

const ImageViewerPopup: React.FC<ImageViewerPopupProps> = ({ instruction }) => {
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClosePopup = () => {
    setVideoUrl(undefined);
  };

  function fetchVideo() {
    setIsLoading(true);
    remoteService
      .post<string>("/mvp/video", instruction)
      .then((value: string) => {
        setVideoUrl(value);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  if (videoUrl == undefined) {
    if (isLoading) {
      return <label>Video is Loading..</label>;
    }
    return (
      <div className="popup">
        <div className="popup-content">
          <Button onClick={fetchVideo}>Fetch Video</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <label>{videoUrl}</label>
        <Button onClick={handleClosePopup}>Close</Button>
      </div>
    </div>
  );
};

export default ImageViewerPopup;
