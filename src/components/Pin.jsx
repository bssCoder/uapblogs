import { useState } from "react"
import "./Pin.css"

function Pin({ pin, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="pin" onClick={() => !imageError && onClick(pin)}>
      <div className="pin-image-container">
        {!imageLoaded && !imageError && (
          <div className="pin-image-placeholder" aria-label="Loading image...">
            <div className="loading-spinner"></div>
          </div>
        )}
        {imageError ? (
          <div className="pin-image-error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="error-icon">
              <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"/>
              <path d="M12 14a1 1 0 01-1-1V7a1 1 0 112 0v6a1 1 0 01-1 1zm0 4a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
            <span>Unable to load image</span>
          </div>
        ) : (
          <img
            src={pin.image}
            alt={pin.title}
            className={`pin-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        {imageLoaded && !imageError && (
          <>
            <div className="pin-overlay"></div>
            <div className="pin-actions">
              <div className="pin-action-group">
                <button className="pin-action-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <button className="pin-action-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </button>
              </div>
              <button className="pin-action-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="pin-content">
        <h3 className="pin-title">{pin.title}</h3>
        <div className="pin-user">
          <img
            src={
              pin.userAvatar ||
              "https://images.unsplash.com/photo-1502767089025-6572583495d4?auto=format&fit=crop&w=200&q=80"
            }
            alt={pin.user}
            className="pin-user-avatar"
          />
          <span className="pin-user-name">{pin.user}</span>
        </div>
      </div>
    </div>
  )
}

export default Pin
