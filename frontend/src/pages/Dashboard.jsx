import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaPlus, 
  FaSearch,
  FaSyncAlt,
  FaCodeBranch,
  FaStar,
  FaUsers,
  FaFire,
  FaChartLine,
  FaClock,
  FaFilter,
  FaHistory,
  FaRocket,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEye
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setRepositories([
        {
          id: 1,
          name: 'react-components',
          full_name: 'developer/react-components',
          description: 'Reusable React component library with modern hooks',
          language: 'JavaScript',
          stargazers_count: 1234,
          forks_count: 89,
          open_issues_count: 12,
          updated_at: '2024-01-15T10:30:00Z',
          recent_activity: 'high',
          contributors: 8,
          branches: 15,
          status: 'active'
        },
        {
          id: 2,
          name: 'api-server',
          full_name: 'developer/api-server',
          description: 'RESTful API server with Node.js and Express',
          language: 'TypeScript',
          stargazers_count: 567,
          forks_count: 45,
          open_issues_count: 3,
          updated_at: '2024-01-14T15:45:00Z',
          recent_activity: 'medium',
          contributors: 5,
          branches: 8,
          status: 'active'
        },
        {
          id: 3,
          name: 'mobile-app',
          full_name: 'developer/mobile-app',
          description: 'React Native mobile application for iOS and Android',
          language: 'JavaScript',
          stargazers_count: 892,
          forks_count: 67,
          open_issues_count: 8,
          updated_at: '2024-01-13T09:20:00Z',
          recent_activity: 'low',
          contributors: 6,
          branches: 12,
          status: 'active'
        },
        {
          id: 4,
          name: 'data-pipeline',
          full_name: 'developer/data-pipeline',
          description: 'ETL pipeline for processing large datasets',
          language: 'Python',
          stargazers_count: 234,
          forks_count: 23,
          open_issues_count: 5,
          updated_at: '2024-01-12T14:10:00Z',
          recent_activity: 'medium',
          contributors: 3,
          branches: 6,
          status: 'active'
        },
        {
          id: 5,
          name: 'ml-models',
          full_name: 'developer/ml-models',
          description: 'Machine learning models and training scripts',
          language: 'Python',
          stargazers_count: 445,
          forks_count: 34,
          open_issues_count: 2,
          updated_at: '2024-01-11T11:55:00Z',
          recent_activity: 'low',
          contributors: 4,
          branches: 9,
          status: 'active'
        },
        {
          id: 6,
          name: 'design-system',
          full_name: 'developer/design-system',
          description: 'Component library and design tokens',
          language: 'TypeScript',
          stargazers_count: 789,
          forks_count: 56,
          open_issues_count: 7,
          updated_at: '2024-01-10T16:30:00Z',
          recent_activity: 'high',
          contributors: 7,
          branches: 11,
          status: 'active'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRepos = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || repo.language?.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === 'updated') {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
    if (sortBy === 'stars') {
      return b.stargazers_count - a.stargazers_count;
    }
    if (sortBy === 'activity') {
      const activityOrder = { high: 3, medium: 2, low: 1 };
      return activityOrder[b.recent_activity] - activityOrder[a.recent_activity];
    }
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  const getActivityColor = (activity) => {
    switch (activity) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getLanguageColor = (language) => {
    switch (language) {
      case 'JavaScript': return 'bg-yellow-600';
      case 'TypeScript': return 'bg-blue-600';
      case 'Python': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">
                Monitor and analyze all your GitHub repositories in one place
              </p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all">
              <FaPlus className="w-4 h-4" />
              <span>Add Repository</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Languages</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="updated">Last Updated</option>
                <option value="stars">Stars</option>
                <option value="activity">Activity</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-lg transition-all">
                <FaSyncAlt className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FaCodeBranch className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Total</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{repositories.length}</div>
            <div className="text-sm text-gray-400">Repositories</div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <FaStar className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Total</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Stars</div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-600 rounded-lg">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Total</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {repositories.reduce((sum, repo) => sum + repo.contributors, 0)}
            </div>
            <div className="text-sm text-gray-400">Contributors</div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-600 rounded-lg">
                <FaExclamationTriangle className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Open</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {repositories.reduce((sum, repo) => sum + repo.open_issues_count, 0)}
            </div>
            <div className="text-sm text-gray-400">Issues</div>
          </div>
        </div>

        {/* Repository List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-400">Loading repositories...</p>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Repository
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Language
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Stars
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Forks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Issues
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {sortedRepos.map(repo => (
                    <tr key={repo.id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center">
                              <FaGithub className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {repo.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {repo.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLanguageColor(repo.language)}`}>
                          {repo.language}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center">
                          <FaStar className="w-4 h-4 text-yellow-500 mr-1" />
                          {repo.stargazers_count.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center">
                          <FaCodeBranch className="w-4 h-4 text-gray-400 mr-1" />
                          {repo.forks_count}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {repo.open_issues_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActivityColor(repo.recent_activity)}`}>
                          <FaFire className="w-3 h-3 mr-1" />
                          {repo.recent_activity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatTimeAgo(repo.updated_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/repository/${repo.full_name}`}
                            className="text-blue-400 hover:text-blue-300 flex items-center"
                          >
                            <FaEye className="w-4 h-4 mr-1" />
                            View
                          </Link>
                          <Link
                            to={`/analyze/${repo.id}`}
                            className="text-green-400 hover:text-green-300 flex items-center"
                          >
                            <FaChartLine className="w-4 h-4 mr-1" />
                            Analyze
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
