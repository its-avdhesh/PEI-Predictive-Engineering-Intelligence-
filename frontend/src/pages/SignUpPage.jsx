import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaShieldAlt, FaCheckCircle, FaUsers, FaCodeBranch, FaArrowLeft, FaRocket, FaStar } from 'react-icons/fa';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubSignUp = () => {
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
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign in
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
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* Left Side - Sign Up Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-full">
                  <FaRocket className="w-4 h-4" />
                  <span className="text-sm font-medium">Free Forever for Open Source</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Join PEI
              </h1>
              <p className="text-gray-300">
                Start monitoring your GitHub repositories in seconds
              </p>
            </div>

            {/* GitHub OAuth Button */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <button
                onClick={handleGitHubSignUp}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all transform hover:scale-105 disabled:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating your account...</span>
                  </>
                ) : (
                  <>
                    <FaGithub className="w-6 h-6" />
                    <span>Sign up with GitHub</span>
                  </>
                )}
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  No password needed • GitHub handles authentication
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start space-x-3">
                <FaCheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Free for Open Source</p>
                  <p className="text-gray-400 text-sm">Unlimited repositories for public projects</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaCheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">14-Day Free Trial</p>
                  <p className="text-gray-400 text-sm">Full access to all premium features</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaCheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">No Credit Card Required</p>
                  <p className="text-gray-400 text-sm">Start monitoring immediately</p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                By signing up, you agree to our{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300">Privacy Policy</button>.
                {' '}We'll only request read access to repository metadata.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Social Proof */}
        <div className="flex-1 bg-gray-800 p-8 lg:p-12 flex items-center justify-center">
          <div className="max-w-lg w-full">
            <h2 className="text-2xl font-bold text-white mb-6">
              Join 10,000+ developers already using PEI
            </h2>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">50K+</div>
                <p className="text-gray-400 text-sm">Repositories Monitored</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">4.9/5</div>
                <p className="text-gray-400 text-sm">User Rating</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FaCodeBranch className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Real-time Monitoring</h3>
                  <p className="text-gray-400 text-sm">
                    Track commits, issues, and pull requests as they happen
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FaUsers className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Team Collaboration</h3>
                  <p className="text-gray-400 text-sm">
                    Share insights and collaborate with your team
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <FaShieldAlt className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Enterprise Security</h3>
                  <p className="text-gray-400 text-sm">
                    SOC 2 compliant with enterprise-grade security
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic mb-2">
                "PEI has transformed how we monitor our repositories. The real-time alerts alone have saved us countless hours."
              </p>
              <p className="text-xs text-gray-400">
                - Sarah Chen, Senior DevOps Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
