import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xvzwpkae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="contact-container">
      <h2>Get In Touch</h2>
      <p className="contact-subtitle">
        Have a question or want to work together? Send me a message!
      </p>

      {status === 'success' && (
        <div className="alert success">
          ✅ Message sent successfully! I'll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="alert error">
          ❌ Something went wrong. Please try again or email me directly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'sending'}
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'sending'}
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            disabled={status === 'sending'}
            placeholder="What's this about?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={status === 'sending'}
            placeholder="Your message here..."
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : 'Send Message'}
        </button>
      </form>

      <div className="contact-info">
        <h3>Other Ways to Connect</h3>
        <div className="info-links">
          <a href="mailto:gizachewkassa22@gmail.com" target="_blank" rel="noopener noreferrer" className="info-link">
            <span className="info-icon">📧</span>
            gizachewkassa22@gmai.com
          </a>
          <a href="https://github.com/gizachew-k" target="_blank" rel="noopener noreferrer" className="info-link">
            <span className="info-icon">🐙</span>
            GitHub
          </a>
          {/* <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener" className="info-link">
            <span className="info-icon">💼</span>
            LinkedIn
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;