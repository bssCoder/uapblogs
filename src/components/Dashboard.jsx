import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userActions";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <h2 className="welcome-text">Welcome, {user?.name || user?.email}</h2>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Profile Info Card */}
          <div className="dashboard-card profile-info">
            <h3>Profile Information</h3>
            <div className="info-item">
              <span className="label">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Role:</span>
              <span>{user?.role || 'User'}</span>
            </div>
          </div>

          {/* Stats Card */}
          <div className="dashboard-card stats-card">
            <h3>Your Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{user?.pins?.length || 0}</span>
                <span className="stat-label">Pins</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{user?.followers || 0}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{user?.following || 0}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {user?.activity?.length > 0 ? (
              user.activity.map((item, index) => (
                <div key={index} className="activity-item">
                  <span className="activity-icon">●</span>
                  <span className="activity-text">{item}</span>
                </div>
              ))
            ) : (
              <p className="empty-state">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
