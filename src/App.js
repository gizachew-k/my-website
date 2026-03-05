import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Projects from './components/projects';
import Blog from './components/blog';
import BlogPost from './components/blogpost';
import Profile from './components/profile';
import Contacts from './components/contacts';
import './App.css';

function App() {
  // REPLACE THESE WITH YOUR INFO
  const GITHUB_USERNAME = 'gizachew-k';
  const REPO_NAME = 'my-website'; // Your repository name

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>GIZACHEW KASSA</h1>
          <nav>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Profile
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
              Projects
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>
              Blog
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
              Contact
            </NavLink>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Profile username={GITHUB_USERNAME} />} />
            <Route path="/projects" element={<Projects username={GITHUB_USERNAME} />} />
            <Route path="/blog" element={<Blog owner={GITHUB_USERNAME} repo={REPO_NAME} />} />
            <Route path="/blog/:id" element={<BlogPost owner={GITHUB_USERNAME} repo={REPO_NAME} />} />
            <Route path="/contact" element={<Contacts />} />
          </Routes>
        </main>
        
        <footer>
          <p>© 2024 | Built with React + GitHub | Hosted on GitHub Pages</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
