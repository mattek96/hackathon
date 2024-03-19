interface ImageViewerPopupProps {
    imageUrl: string;
    onClose: () => void;
  }

  const ImageViewerPopup: React.FC<ImageViewerPopupProps> = ({ imageUrl, onClose }) => {
    return (
      <div className="popup">
        <div className="popup-content">
          <img src={imageUrl} alt="Instruction Image" />
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

export default ImageViewerPopup;
