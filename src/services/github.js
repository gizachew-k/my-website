import { Octokit } from "octokit";

// Initialize GitHub client
const octokit = new Octokit({ 
  auth: process.env.REACT_APP_GITHUB_TOKEN 
});

export const fetchGitHubData = {
  // Get your profile
  async getProfile(username) {
    try {
      const response = await octokit.request('GET /users/{username}', {
        username: username
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  },

  // Get your repositories
  async getRepositories(username) {
    try {
      const response = await octokit.request('GET /users/{username}/repos', {
        username: username,
        sort: 'updated',
        per_page: 100,
        type: 'owner'
      });
      
      return response.data
        .filter(repo => !repo.fork)
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'No description available',
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          homepage: repo.homepage,
          updated: new Date(repo.updated_at).toLocaleDateString(),
          topics: repo.topics || []
        }));
    } catch (error) {
      console.error('Error fetching repos:', error);
      return [];
    }
  }
};