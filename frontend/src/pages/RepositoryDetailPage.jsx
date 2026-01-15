import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaCodeBranch,
  FaStar,
  FaUsers,
  FaArrowLeft
} from 'react-icons/fa';

const RepositoryDetailPage = () => {
  const { owner, repo } = useParams();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock repository data
    setTimeout(() => {
      setRepository({
        id: 1,
        name: repo,
        full_name: `${owner}/${repo}`,
        description: 'A comprehensive repository for modern web development',
        language: 'JavaScript',
        stars: 1234,
        forks: 89,
        open_issues: 12,
        watchers: 45,
        default_branch: 'main',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T10:30:00Z',
        size: 2560,
        contributors: 8,
        branches: 15,
        releases: 6,
        health_score: 85,
        commits_count: 156,
        recent_commits: [
          {
            id: 1,
            message: 'Update README with new installation instructions',
            author: 'John Doe',
            date: '2024-01-15T10:30:00Z',
            sha: 'abc123'
          },
          {
            id: 2,
            message: 'Add responsive design for mobile devices',
            author: 'Jane Smith',
            date: '2024-01-14T15:45:00Z',
            sha: 'def456'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [owner, repo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-400">Loading repository details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <FaArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                <FaGithub className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{repository.full_name}</h1>
                <p className="text-gray-400">{repository.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <FaStar className="w-4 h-4 mr-2" />
              Star
            </button>
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              <FaCodeBranch className="w-4 h-4 mr-2" />
              Fork
            </button>
          </div>
        </div>

        {/* Repository Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <FaStar className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold text-white">{repository.stars}</span>
            </div>
            <p className="text-gray-400 text-sm">Stars</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <FaCodeBranch className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-white">{repository.forks}</span>
            </div>
            <p className="text-gray-400 text-sm">Forks</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <FaUsers className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">{repository.contributors}</span>
            </div>
            <p className="text-gray-400 text-sm">Contributors</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <nav className="flex space-x-8 px-6 pt-4 border-b border-gray-700">
            {['overview', 'commits', 'branches', 'releases'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Repository Info */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white mb-4">Repository Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Language</span>
                    <span className="font-medium text-white">{repository.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Size</span>
                    <span className="font-medium text-white">{repository.size} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created</span>
                    <span className="font-medium text-white">
                      {new Date(repository.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Default Branch</span>
                    <span className="font-medium text-white">{repository.default_branch}</span>
                  </div>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white mb-4">Activity Statistics</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Commits</span>
                    <span className="font-medium text-white">{repository.commits_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contributors</span>
                    <span className="font-medium text-white">{repository.contributors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Branches</span>
                    <span className="font-medium text-white">{repository.branches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Releases</span>
                    <span className="font-medium text-white">{repository.releases}</span>
                  </div>
                </div>
              </div>

              {/* Health Score */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white mb-4">Repository Health</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Health Score</span>
                      <span className="font-medium text-white">{repository.health_score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                        style={{ width: `${repository.health_score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commits' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">Recent Commits</h2>
              <div className="space-y-3">
                {repository.recent_commits.map(commit => (
                  <div key={commit.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <FaGithub className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{commit.message}</p>
                          <p className="text-sm text-gray-400">
                            {commit.author} • {new Date(commit.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <a 
                        href={`https://github.com/${repository.full_name}/commit/${commit.sha}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View Commit
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'branches' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">Branches</h2>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400">Branch information will be available soon.</p>
              </div>
            </div>
          )}

          {activeTab === 'releases' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white mb-4">Releases</h2>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-400">Release information will be available soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetailPage;
