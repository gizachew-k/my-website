import React, { useState, useEffect } from 'react';
import { fetchGitHubData } from '../services/github';
import './projects.css';

const Projects = ({ username }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const repos = await fetchGitHubData.getRepositories(username);
      setProjects(repos);
      setLoading(false);
    };
    
    loadProjects();
  }, [username]);

  const languages = ['all', ...new Set(projects.map(p => p.language).filter(Boolean))];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.language === filter;
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
                         project.description?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div className="loader">Loading projects...</div>;
  }

  return (
    <div className="projects-container">
      <h2>My Projects</h2>
      
      <div className="projects-filters">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        
        <div className="language-filters">
          {languages.map(lang => (
            <button
              key={lang}
              className={`filter-btn ${filter === lang ? 'active' : ''}`}
              onClick={() => setFilter(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <h3>{project.name}</h3>
              <div className="project-stats">
                <span>⭐ {project.stars}</span>
                <span>🍴 {project.forks}</span>
              </div>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-tech">
              {project.language && (
                <span className="tech-tag">{project.language}</span>
              )}
              {project.topics.slice(0, 3).map(topic => (
                <span key={topic} className="topic-tag">{topic}</span>
              ))}
            </div>
            
            <div className="project-links">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                View Code
              </a>
              {project.homepage && (
                <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
            </div>
            
            <div className="project-footer">
              <small>Updated: {project.updated}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;