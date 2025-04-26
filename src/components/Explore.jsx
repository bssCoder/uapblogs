import React, { useState, useEffect } from "react";
import axios from "axios";
import MasonryGrid from "./MasonryGrid";
import "./Explore.css";
import { useSelector } from "react-redux";

const Explore = () => {
  const [pins, setPins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:7070/api/website/pins",

          // "https://uap-f7ii.onrender.com/api/website/pins",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setPins(response.data.data);
        } else {
          setError("Failed to fetch pins");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch pins");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && token) {
      fetchPins();
    }
  }, [user, token]);

  if (error) {
    return (
      <div className="explore-error">
        <div className="error-content">
          <svg className="error-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <h2>Error</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Login to continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="explore">
      <div className="explore-header">
        <h1>Explore</h1>
        <p>Discover amazing pins from our community</p>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Loading pins...</span>
        </div>
      ) : (
        <MasonryGrid pins={pins} />
      )}
    </div>
  );
};

export default Explore;
