import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaSyncAlt, 
  FaChartLine, 
  FaCodeBranch,
  FaStar,
  FaUsers,
  FaClock,
  FaArrowRight,
  FaShieldAlt,
  FaRocket,
  FaSearch,
  FaBell
} from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-3 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
                <FaGithub className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-green-400">GitHub Extension</span>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              PEI - Predictive Engineering Intelligence
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate GitHub extension for real-time repository monitoring and analysis. 
              Track changes, analyze performance, and get insights across all your repositories in one unified dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="flex items-center space-x-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all transform hover:scale-105"
              >
                <FaGithub className="w-5 h-5" />
                <span>Start with GitHub</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>
              
              <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-all">
                View Demo
              </button>
            </div>
            
            <p className="mt-4 text-sm text-gray-400">
              No credit card required • Free for open source • GitHub OAuth integration
            </p>
          </div>
        </div>
      </section>

        {/* Features Grid */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Built for GitHub Developers
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need to monitor and analyze your GitHub repositories in real-time
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FaSyncAlt className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Real-time Updates</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Get instant notifications when commits are pushed, issues are created, or pull requests are updated across all your repositories.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaClock className="w-4 h-4 text-green-400" />
                  <span>Live commit tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaBell className="w-4 h-4 text-green-400" />
                  <span>Instant notifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCodeBranch className="w-4 h-4 text-green-400" />
                  <span>Branch monitoring</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <FaChartLine className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Advanced Analytics</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Deep insights into repository performance, contributor activity, and code quality metrics with beautiful visualizations.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaUsers className="w-4 h-4 text-green-400" />
                  <span>Contributor analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaChartLine className="w-4 h-4 text-green-400" />
                  <span>Performance trends</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaStar className="w-4 h-4 text-green-400" />
                  <span>Engagement metrics</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-600 rounded-lg">
                  <FaShieldAlt className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">GitHub Integration</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Seamless integration with GitHub's API and OAuth. Authenticate with your GitHub account and start monitoring instantly.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaGithub className="w-4 h-4 text-green-400" />
                  <span>GitHub OAuth</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaShieldAlt className="w-4 h-4 text-green-400" />
                  <span>Secure authentication</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaRocket className="w-4 h-4 text-green-400" />
                  <span>Quick setup</span>
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-600 rounded-lg">
                  <FaSearch className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Smart Search</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Powerful search functionality across all your repositories. Find code, issues, and discussions instantly.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaSearch className="w-4 h-4 text-green-400" />
                  <span>Cross-repo search</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaClock className="w-4 h-4 text-green-400" />
                  <span>Real-time indexing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCodeBranch className="w-4 h-4 text-green-400" />
                  <span>Advanced filters</span>
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-600 rounded-lg">
                  <FaBell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Smart Alerts</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Customizable alerts for important events. Get notified about security vulnerabilities, performance issues, and more.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaBell className="w-4 h-4 text-green-400" />
                  <span>Custom notifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaShieldAlt className="w-4 h-4 text-green-400" />
                  <span>Security alerts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaChartLine className="w-4 h-4 text-green-400" />
                  <span>Performance monitoring</span>
                </li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <FaUsers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Team Collaboration</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Share insights with your team, collaborate on repository analysis, and stay aligned on project progress.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaUsers className="w-4 h-4 text-green-400" />
                  <span>Team dashboards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaChartLine className="w-4 h-4 text-green-400" />
                  <span>Shared analytics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCodeBranch className="w-4 h-4 text-green-400" />
                  <span>Collaborative insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Integration Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Seamless GitHub Integration
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                PEI works directly with GitHub's API to provide real-time insights without disrupting your existing workflow. 
                It's like having a supercharged GitHub dashboard that understands your repositories deeply.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaGithub className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Native GitHub OAuth</h4>
                    <p className="text-gray-400 text-sm">Sign in with your GitHub account - no passwords to remember</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FaSyncAlt className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Real-time Synchronization</h4>
                    <p className="text-gray-400 text-sm">Automatically syncs with your GitHub repositories in real-time</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FaShieldAlt className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Enterprise Security</h4>
                    <p className="text-gray-400 text-sm">Built with security best practices and GitHub's security standards</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all"
                >
                  <FaGithub className="w-5 h-5" />
                  <span>Connect with GitHub</span>
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-2">github-extension-demo</span>
                </div>
                <div className="space-y-2">
                  <div className="text-green-400">$ git clone https://github.com/user/repo.git</div>
                  <div className="text-gray-300">Cloning into 'repo'...</div>
                  <div className="text-blue-400">remote: Enumerating objects: 156, done.</div>
                  <div className="text-blue-400">remote: Counting objects: 100% (156/156), done.</div>
                  <div className="text-gray-400">...</div>
                  <div className="text-green-400">$ pei monitor --repo user/repo</div>
                  <div className="text-blue-400">✓ Repository monitoring started</div>
                  <div className="text-blue-400">✓ Real-time updates enabled</div>
                  <div className="text-blue-400">✓ Analytics dashboard ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to supercharge your GitHub experience?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Join thousands of developers who are already using PEI to monitor and analyze their GitHub repositories.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <FaGithub className="w-6 h-6" />
              <span>Get Started Free</span>
              <FaArrowRight className="w-5 h-5" />
            </Link>
            
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-all">
              Schedule Demo
            </button>
          </div>
          
          <div className="mt-8 flex justify-center space-x-8 text-sm text-green-50">
            <div className="flex items-center space-x-2">
              <FaUsers className="w-5 h-5" />
              <span>10,000+ Developers</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCodeBranch className="w-5 h-5" />
              <span>50,000+ Repositories</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaStar className="w-5 h-5" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
