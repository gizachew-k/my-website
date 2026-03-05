import React, { useState, useEffect } from 'react';
import { fetchGitHubData } from '../services/github';
import './profile.css';

const Profile = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const data = await fetchGitHubData.getProfile(username);
      setProfile(data);
      setLoading(false);
    };
    
    loadProfile();
  }, [username]);

  if (loading) {
    return <div className="loader">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="error">Profile not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={profile.avatar_url} alt={profile.name} className="profile-avatar" />
        
        <div className="profile-info">
          <h1>{profile.name || username}</h1>
          <p className="profile-bio">{profile.bio || 'No bio available'}</p>
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{profile.public_repos}</span>
              <span className="stat-label">Repositories</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
          
          <div className="profile-details">
            {profile.location && (
              <div className="detail">
                <span>📍</span>
                <span>{profile.location}</span>
              </div>
            )}
            {profile.blog && (
              <div className="detail">
                <span>🌐</span>
                <a href={profile.blog} target="_blank" rel="noopener noreferrer">{profile.blog}</a>
              </div>
            )}
            {profile.company && (
              <div className="detail">
                <span>🏢</span>
                <span>{profile.company}</span>
              </div>
            )}
            <div className="detail">
              <span>📅</span>
              <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;