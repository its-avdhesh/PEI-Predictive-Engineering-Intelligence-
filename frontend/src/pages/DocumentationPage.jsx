import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaRocket } from 'react-icons/fa';

const DocumentationPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Documentation</h1>
          <div className="max-w-4xl mx-auto text-left">
            {/* Getting Started */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Getting Started</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                PEI provides deterministic structural analysis for your codebase. Our system identifies architectural risks without relying on AI predictions.
              </p>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Features</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <FaCheck className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>God Files Detection</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Circular Dependencies Analysis</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>High Coupling Detection</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Architecture Assessment</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Risk Quantification</span>
                </li>
              </ul>
            </div>

            {/* How It Works */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How It Works</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Repository Analysis</h3>
                  <p>Connect your GitHub account and select any repository to analyze. PEI clones your repository and performs structural analysis.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Feasibility Check</h3>
                  <p>Each repository is checked against MVP limits (≤300 files, ≤40k LOC, single language, no monorepos).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Risk Detection</h3>
                  <p>Our deterministic algorithms identify god files, circular dependencies, high coupling, and architectural issues.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">4. Detailed Reporting</h3>
                  <p>Get comprehensive reports with evidence, suggested actions, and risk severity levels.</p>
                </div>
              </div>
            </div>

            {/* MVP Limitations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">MVP Limitations</h2>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Repository Size</h3>
                  <p>Maximum 300 files and 40,000 lines of code per repository.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Language Support</h3>
                  <p>Single primary language analysis only (no multi-language repositories).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Monorepos</h3>
                  <p>Multi-package repositories (monorepos) are not supported in this version.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Educational Purpose</h3>
                  <p>Analysis results are for educational and informational purposes only.</p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Security & Privacy</h2>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Read-Only Access</h3>
                  <p>PEI requests read-only access to your repositories. No code modification or storage.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Authentication</h3>
                  <p>OAuth-based GitHub authentication with secure token handling.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Privacy</h3>
                  <p>Your code analysis results are not stored permanently and are deleted after analysis completion.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Revoke Access</h3>
                  <p>You can revoke PEI's access to your repositories at any time through GitHub settings.</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <FaRocket className="mr-2" />
                Start Analyzing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
