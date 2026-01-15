import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaChartLine, 
  FaCheck, 
  FaExclamationTriangle, 
  FaClock,
  FaGithub,
  FaCodeBranch,
  FaUsers,
  FaFire,
  FaShieldAlt,
  FaBug,
  FaFileCode,
  FaGitAlt,
  FaEye,
  FaDownload,
  FaUser
} from 'react-icons/fa';

const AnalysisPage = () => {
  const { repoId } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock analysis data for demonstration
    setTimeout(() => {
      setAnalysis({
        repo_name: 'react-components',
        repo_url: 'https://github.com/developer/react-components',
        feasibility: {
          is_feasible: true,
          stats: {
            total_files: 156,
            total_loc: 12450,
            primary_language: 'JavaScript',
            max_depth: 8
          }
        },
        analysis_time_seconds: 3.2,
        risks: [
          {
            title: 'Large Component File Detected',
            why_it_matters: 'Large component files are harder to maintain and test',
            files: ['src/components/DataTable.jsx'],
            suggested_action: 'Consider breaking down into smaller, focused components'
          },
          {
            title: 'High Cyclomatic Complexity',
            why_it_matters: 'Complex functions are difficult to understand and maintain',
            files: ['src/utils/formatters.js'],
            suggested_action: 'Extract complex logic into separate, testable functions'
          }
        ],
        metrics: {
          code_quality: 85,
          test_coverage: 72,
          maintainability: 78,
          security_score: 92
        },
        contributors: [
          { name: 'John Doe', commits: 45, contributions: 89 },
          { name: 'Jane Smith', commits: 32, contributions: 67 },
          { name: 'Bob Johnson', commits: 28, contributions: 54 }
        ],
        recent_activity: {
          commits_this_week: 12,
          issues_opened: 3,
          pull_requests_merged: 5
        }
      });
      setLoading(false);
    }, 2000);
  }, [repoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Repository Analysis</h1>
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-lg transition-all"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-400">Analyzing repository...</p>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-900/20 border-green-800';
    if (score >= 60) return 'bg-yellow-900/20 border-yellow-800';
    return 'bg-red-900/20 border-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gray-800 rounded-lg">
                <FaGithub className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{analysis.repo_name}</h1>
                <p className="text-gray-400">Repository Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <a 
                href={analysis.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FaEye className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <FaDownload className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
          
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-lg transition-all"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FaFileCode className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Total</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analysis.feasibility.stats.total_files}</div>
            <div className="text-sm text-gray-400">Files</div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-600 rounded-lg">
                <FaCodeBranch className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Total</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analysis.feasibility.stats.total_loc.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Lines of Code</div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-600 rounded-lg">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Active</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analysis.contributors.length}</div>
            <div className="text-sm text-gray-400">Contributors</div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <FaClock className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-gray-400">Analysis</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analysis.analysis_time_seconds}s</div>
            <div className="text-sm text-gray-400">Processing Time</div>
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Quality Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-4 rounded-lg border ${getScoreBg(analysis.metrics.code_quality)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Code Quality</span>
                <FaChartLine className={`w-4 h-4 ${getScoreColor(analysis.metrics.code_quality)}`} />
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(analysis.metrics.code_quality)}`}>
                {analysis.metrics.code_quality}%
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${getScoreBg(analysis.metrics.test_coverage)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Test Coverage</span>
                <FaCheck className={`w-4 h-4 ${getScoreColor(analysis.metrics.test_coverage)}`} />
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(analysis.metrics.test_coverage)}`}>
                {analysis.metrics.test_coverage}%
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${getScoreBg(analysis.metrics.maintainability)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Maintainability</span>
                <FaGitAlt className={`w-4 h-4 ${getScoreColor(analysis.metrics.maintainability)}`} />
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(analysis.metrics.maintainability)}`}>
                {analysis.metrics.maintainability}%
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${getScoreBg(analysis.metrics.security_score)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Security Score</span>
                <FaShieldAlt className={`w-4 h-4 ${getScoreColor(analysis.metrics.security_score)}`} />
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(analysis.metrics.security_score)}`}>
                {analysis.metrics.security_score}%
              </div>
            </div>
          </div>
        </div>

        {/* Risks and Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <FaExclamationTriangle className="w-5 h-5 text-yellow-400 mr-2" />
              Detected Risks
            </h2>
            {analysis.risks && analysis.risks.length > 0 ? (
              <div className="space-y-4">
                {analysis.risks.map((risk, index) => (
                  <div key={index} className="border-l-4 border-red-500 bg-red-900/20 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-red-200 mb-2">{risk.title}</h3>
                    <p className="text-red-300 text-sm mb-2">{risk.why_it_matters}</p>
                    <div className="mb-2">
                      <span className="text-xs font-medium text-red-400">Files: {risk.files.join(', ')}</span>
                    </div>
                    <div className="text-xs text-blue-400">
                      💡 {risk.suggested_action}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🎉</div>
                <p className="text-green-400">No structural risks detected!</p>
                <p className="text-gray-400 text-sm mt-2">Your repository follows good engineering practices.</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <FaFire className="w-5 h-5 text-blue-400 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <FaGitAlt className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Commits this week</p>
                    <p className="text-gray-400 text-sm">Active development</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-green-400">{analysis.recent_activity.commits_this_week}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-600 rounded-lg">
                    <FaBug className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Issues opened</p>
                    <p className="text-gray-400 text-sm">Community engagement</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-yellow-400">{analysis.recent_activity.issues_opened}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <FaCodeBranch className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">PRs merged</p>
                    <p className="text-gray-400 text-sm">Code integration</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-purple-400">{analysis.recent_activity.pull_requests_merged}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <FaUsers className="w-5 h-5 text-green-400 mr-2" />
            Top Contributors
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Contributor
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Commits
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Contributions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Activity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {analysis.contributors.map((contributor, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                          <FaUser className="w-4 h-4 text-gray-300" />
                        </div>
                        <span className="text-sm font-medium text-white">{contributor.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      {contributor.commits}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      {contributor.contributions}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full" 
                            style={{ width: `${(contributor.commits / 50) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">High</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
