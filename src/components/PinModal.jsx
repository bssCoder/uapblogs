import { useEffect, useRef, useState } from "react";
import "./PinModal.css";

function PinModal({ pin, onClose }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" ref={modalRef}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>

        <div className="modal-image-container">
          {!imageLoaded && !imageError && (
            <div className="modal-image-placeholder" aria-hidden="true">
              <div className="loading-spinner"></div>
            </div>
          )}
          {imageError ? (
            <div className="modal-image-error" role="alert">
              <svg viewBox="0 0 24 24" className="error-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>Failed to load image</span>
            </div>
          ) : (
            <img
              src={pin.image}
              alt={pin.title}
              className={`modal-image ${imageLoaded ? "loaded" : ""}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>

        <div className="modal-details">
          <h2 id="modal-title" className="modal-title">
            {pin.title}
          </h2>
          <p className="modal-description">{pin.description}</p>

          <div className="modal-meta">
            <div className="modal-user">
              <img
                src={pin.userAvatar}
                alt={pin.user}
                className="modal-user-avatar"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/40")
                }
              />
              <span className="modal-user-name">{pin.user}</span>
            </div>

            <div className="modal-stats">
              <button
                className="modal-stat-button"
                aria-label={`${pin.likes} likes`}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>{pin.likes}</span>
              </button>
              <button
                className="modal-stat-button"
                aria-label={`${pin.comments} comments`}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M21 15.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>{pin.comments}</span>
              </button>
            </div>
          </div>

          {pin.tags && pin.tags.length > 0 && (
            <div className="modal-tags">
              {pin.tags.map((tag, index) => (
                <span key={index} className="modal-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PinModal;
