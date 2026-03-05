import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { blogService } from '../services/services';
import './blog.css';

const Blog = ({ owner, repo }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const blogPosts = await blogService.getPosts(owner, repo);
      setPosts(blogPosts);
      setLoading(false);
    };
    
    loadPosts();
  }, [owner, repo]);

  if (loading) {
    return <div className="loader">Loading blog posts...</div>;
  }

  return (
    <div className="blog-container">
      <h2>Blog Posts</h2>
      
      {posts.length === 0 ? (
        <p className="no-posts">No blog posts yet. Check back soon!</p>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <article key={post.id} className="blog-post-card">
              <h3>
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h3>
              
              <div className="post-meta">
                <span className="post-date">📅 {post.date}</span>
                <span className="post-comments">💬 {post.comments} comments</span>
              </div>
              
              <div className="post-excerpt">
                <ReactMarkdown>{post.excerpt}</ReactMarkdown>
              </div>
              
              <Link to={`/blog/${post.id}`} className="read-more">
                Read More →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;