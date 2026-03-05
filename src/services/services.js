import { Octokit } from "octokit";

const octokit = new Octokit();

export const blogService = {
  // Get all blog posts
  async getPosts(owner, repo) {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: owner,
        repo: repo,
        labels: 'blog',
        state: 'open',
        sort: 'created',
        direction: 'desc'
      });
      
      return response.data.map(issue => ({
        id: issue.number,
        title: issue.title,
        date: new Date(issue.created_at).toLocaleDateString(),
        content: issue.body,
        excerpt: issue.body?.substring(0, 200) + '...',
        comments: issue.comments,
        url: issue.html_url,
        labels: issue.labels
      }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  // Get single post
  async getPost(owner, repo, postNumber) {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
        owner: owner,
        repo: repo,
        issue_number: postNumber
      });
      
      return {
        id: response.data.number,
        title: response.data.title,
        date: new Date(response.data.created_at).toLocaleDateString(),
        content: response.data.body,
        comments: response.data.comments
      };
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  },

  // Get comments for a post
  async getComments(owner, repo, postNumber) {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/comments', {
        owner: owner,
        repo: repo,
        issue_number: postNumber
      });
      
      return response.data.map(comment => ({
        id: comment.id,
        user: comment.user.login,
        avatar: comment.user.avatar_url,
        date: new Date(comment.created_at).toLocaleDateString(),
        content: comment.body
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }
};