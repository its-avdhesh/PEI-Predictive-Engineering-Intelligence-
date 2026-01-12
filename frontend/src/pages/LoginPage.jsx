import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaGithub, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaLock,
  FaUsers,
  FaCodeBranch,
  FaExclamationTriangle,
  FaArrowLeft
} from 'react-icons/fa';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGitHubLogin = () => {
    setIsLoading(true);
    // Simulate OAuth flow - in production, this would redirect to GitHub OAuth
    setTimeout(() => {
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/github/login`;
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FaGithub className="w-6 h-6 text-white" />
              <span className="text-lg font-semibold">PEI</span>
            </Link>
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left Side - Authentication Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Sign in to PEI
              </h1>
              <p className="text-gray-300">
                Connect your GitHub account to start monitoring repositories
              </p>
            </div>

            {/* GitHub OAuth Button */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <button
                onClick={handleGitHubLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all transform hover:scale-105 disabled:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Connecting to GitHub...</span>
                  </>
                ) : (
                  <>
                    <FaGithub className="w-6 h-6" />
                    <span>Continue with GitHub</span>
                  </>
                )}
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  We'll redirect you to GitHub for secure authentication
                </p>
              </div>
            </div>

            {/* Security Information */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3">
                <FaShieldAlt className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Secure OAuth Integration</p>
                  <p className="text-gray-400 text-sm">Uses GitHub's proven authentication system</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaLock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Minimal Permissions</p>
                  <p className="text-gray-400 text-sm">Read-only access to repository metadata</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaCheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Revoke Anytime</p>
                  <p className="text-gray-400 text-sm">Control your access through GitHub settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Features Preview */}
        <div className="flex-1 bg-gray-800 p-8 lg:p-12 flex items-center justify-center">
          <div className="max-w-lg w-full">
            <h2 className="text-2xl font-bold text-white mb-6">
              What you'll get access to:
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FaCodeBranch className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Repository Monitoring</h3>
                  <p className="text-gray-400 text-sm">
                    Real-time updates across all your GitHub repositories
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FaUsers className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Team Analytics</h3>
                  <p className="text-gray-400 text-sm">
                    Insights into contributor activity and collaboration patterns
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FaShieldAlt className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Security Monitoring</h3>
                  <p className="text-gray-400 text-sm">
                    Automated alerts for security vulnerabilities and issues
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <FaExclamationTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-gray-300">Privacy First</span>
              </div>
              <p className="text-xs text-gray-400">
                We never store your code, only analyze repository metadata and activity patterns. 
                All data is encrypted and processed securely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <span>© 2024 PEI</span>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="w-4 h-4" />
              <span>SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
