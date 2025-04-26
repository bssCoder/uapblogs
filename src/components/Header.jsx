import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userActions"; // Fixed import path
import axios from "axios"; // Add axios import
import "./Header.css";

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);

  // Function to check if user is logged in via cookie
  const checkLoginStatus = async () => {
    try {
      // Send a request to the backend to verify login status using the token in the cookie
      const response = await axios.post(
        "http://localhost:7070/api/user/login-cookie",
        // "https://uap-f7ii.onrender.com/api/user/login-cookie", // Ensure your backend URL is correct
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Make sure cookies are sent with the request
        }
      );
      console.log(response);
      if (response.data?.user) {
        const { user, token } = response.data;
        console.log("User data from cookie:", user);
        // Dispatch user info to Redux store
        dispatch(setUser(user, token));
      }
    } catch (error) {
      console.error("Error verifying login status:", error);
    }
  };
  const navigate = useNavigate();
  // Use effect to check login status on initial load
  useEffect(() => {
    checkLoginStatus();
  }, [dispatch]);
  const handleLogin = () => {
    if (user) {
      console.log("User is logged in:", user);
      window.location.href = "http://localhost:3002/dashboard";

    } else {
      window.location.href = "http://localhost:3000/login";
    }
  };
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">TechBlog</span>
        </Link>

        <nav className="nav-menu">
          <Link
            to="/"
            className={`nav-item ${
              location.pathname === "/" ? "nav-item-active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/category/technology"
            className={`nav-item ${
              location.pathname === "/category/technology"
                ? "nav-item-active"
                : ""
            }`}
          >
            Technology
          </Link>
          <Link
            to="/category/programming"
            className={`nav-item ${
              location.pathname === "/category/programming"
                ? "nav-item-active"
                : ""
            }`}
          >
            Programming
          </Link>
          <Link
            to="/category/design"
            className={`nav-item ${
              location.pathname === "/category/design" ? "nav-item-active" : ""
            }`}
          >
            Design
          </Link>
        </nav>

        <div className="search-container">
          <div className="search-wrapper">
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search articles"
            />
          </div>
        </div>

        <div className="header-actions">
          <Link onClick={handleLogin} className="header-button">
            {user ? (
              <span className="user-name">Dashboard</span>
            ) : (
              <span className="login-text">Login</span>
            )}
          </Link>
          <Link to="/write" className="header-button primary">
            Write Article
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
