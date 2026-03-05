import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { blogService } from '../services/services';
import './blog.css';

const BlogPost = ({ owner, repo }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const postData = await blogService.getPost(owner, repo, id);
      const commentsData = await blogService.getComments(owner, repo, id);
      setPost(postData);
      setComments(commentsData);
      setLoading(false);
    };
    
    loadPost();
  }, [owner, repo, id]);

  if (loading) {
    return <div className="loader">Loading post...</div>;
  }

  if (!post) {
    return <div className="error">Post not found</div>;
  }

  return (
    <div className="blog-post-container">
      <article className="blog-post-full">
        <h1>{post.title}</h1>
        
        <div className="post-meta">
          <span className="post-date">📅 {post.date}</span>
          <span className="post-comments">💬 {post.comments} comments</span>
        </div>
        
        <div className="post-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
      
      <section className="comments-section">
        <h3>Comments ({comments.length})</h3>
        
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet.</p>
        ) : (
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
                  <div className="comment-info">
                    <span className="comment-user">{comment.user}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                </div>
                <div className="comment-content">
                  <ReactMarkdown>{comment.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="add-comment">
          <p>
            <a href={`https://github.com/${owner}/${repo}/issues/${id}#issuecomment-new`} 
               target="_blank" rel="noopener noreferrer">
              Add a comment on GitHub
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;