import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaCheckCircle, 
  FaUsers, 
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaClock,
  FaChartLine,
  FaCodeBranch,
  FaArrowRight,
  FaQuoteLeft,
  FaQuoteRight
} from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-3 bg-green-600 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-white">🚀 Now in Public Beta</span>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              The GitHub Extension 
              <span className="block text-green-400">Developers Actually Want</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop juggling multiple tabs. PEI brings all your GitHub repositories together with real-time monitoring, 
              advanced analytics, and intelligent insights - all in one familiar interface.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/login"
                className="flex items-center space-x-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <FaGithub className="w-5 h-5" />
                <span>Start Free with GitHub</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <FaCheckCircle className="w-5 h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
            </div>
            
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <FaUsers className="w-4 h-4" />
                <span>10,000+ developers</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCodeBranch className="w-4 h-4" />
                <span>50,000+ repos monitored</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaStar className="w-4 h-4" />
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Developers Choose PEI Over GitHub Alone
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We're not replacing GitHub - we're supercharging it with the features you've been asking for.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">85%</div>
              <p className="text-gray-300 font-medium mb-1">Faster Issue Detection</p>
              <p className="text-gray-400 text-sm">Catch problems before they impact production</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">3x</div>
              <p className="text-gray-300 font-medium mb-1">Better Visibility</p>
              <p className="text-gray-400 text-sm">Unified dashboard across all repositories</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <p className="text-gray-300 font-medium mb-1">Real-time Monitoring</p>
              <p className="text-gray-400 text-sm">Never miss important repository changes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Developers at Leading Companies
            </h2>
            <p className="text-lg text-gray-300">
              See what your fellow developers are saying about PEI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <FaQuoteLeft className="w-6 h-6 text-gray-600 mb-4" />
              <p className="text-gray-300 mb-4 italic">
                "PEI transformed how we monitor our 50+ repositories. The real-time alerts alone have saved us countless hours."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://github.com/github.png" alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-white font-medium">Sarah Chen</p>
                  <p className="text-gray-400 text-sm">Senior DevOps Engineer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <FaQuoteLeft className="w-6 h-6 text-gray-600 mb-4" />
              <p className="text-gray-300 mb-4 italic">
                "Finally, a GitHub extension that actually understands developers. The analytics dashboard is exactly what we needed."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://github.com/github.png" alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-white font-medium">Alex Rodriguez</p>
                  <p className="text-gray-400 text-sm">Full Stack Developer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <FaQuoteLeft className="w-6 h-6 text-gray-600 mb-4" />
              <p className="text-gray-300 mb-4 italic">
                "The GitHub OAuth integration is seamless. Our whole team was up and running in under 5 minutes."
              </p>
              <div className="flex items-center space-x-3">
                <img src="https://github.com/github.png" alt="User" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-white font-medium">Jordan Taylor</p>
                  <p className="text-gray-400 text-sm">Engineering Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              PEI vs. GitHub Native Features
            </h2>
            <p className="text-lg text-gray-300">
              See how we enhance your GitHub experience
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-6 py-4 text-white font-medium">Feature</th>
                  <th className="text-center px-6 py-4 text-white font-medium">GitHub</th>
                  <th className="text-center px-6 py-4 text-white font-medium">PEI Enhanced</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="px-6 py-4 text-gray-300">Repository Monitoring</td>
                  <td className="px-6 py-4 text-center text-gray-400">Basic</td>
                  <td className="px-6 py-4 text-center text-green-400">
                    <FaCheckCircle className="w-5 h-5 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-6 py-4 text-gray-300">Real-time Notifications</td>
                  <td className="px-6 py-4 text-center text-gray-400">Limited</td>
                  <td className="px-6 py-4 text-center text-green-400">
                    <FaCheckCircle className="w-5 h-5 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-6 py-4 text-gray-300">Cross-Repo Analytics</td>
                  <td className="px-6 py-4 text-center text-gray-400">❌</td>
                  <td className="px-6 py-4 text-center text-green-400">
                    <FaCheckCircle className="w-5 h-5 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-6 py-4 text-gray-300">Advanced Search</td>
                  <td className="px-6 py-4 text-center text-gray-400">Basic</td>
                  <td className="px-6 py-4 text-center text-green-400">
                    <FaCheckCircle className="w-5 h-5 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-300">Team Collaboration</td>
                  <td className="px-6 py-4 text-center text-gray-400">Standard</td>
                  <td className="px-6 py-4 text-center text-green-400">
                    <FaCheckCircle className="w-5 h-5 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Built with Developer Trust in Mind
            </h2>
            <p className="text-lg text-gray-300">
              Enterprise-grade security and GitHub's authentication standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 mb-4">
                <FaShieldAlt className="w-8 h-8 text-green-400 mx-auto" />
              </div>
              <h3 className="text-white font-medium mb-2">SOC 2 Compliant</h3>
              <p className="text-gray-400 text-sm">Enterprise security standards</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 mb-4">
                <FaGithub className="w-8 h-8 text-blue-400 mx-auto" />
              </div>
              <h3 className="text-white font-medium mb-2">GitHub OAuth</h3>
              <p className="text-gray-400 text-sm">Secure authentication</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 mb-4">
                <FaClock className="w-8 h-8 text-purple-400 mx-auto" />
              </div>
              <h3 className="text-white font-medium mb-2">99.9% Uptime</h3>
              <p className="text-gray-400 text-sm">Reliable monitoring</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 mb-4">
                <FaChartLine className="w-8 h-8 text-orange-400 mx-auto" />
              </div>
              <h3 className="text-white font-medium mb-2">Real-time Sync</h3>
              <p className="text-gray-400 text-sm">Instant data updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your GitHub Workflow?
          </h2>
          <p className="text-xl text-green-50 mb-8">
            Join thousands of developers who've already upgraded their GitHub experience with PEI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <FaGithub className="w-6 h-6" />
              <span>Start Free Today</span>
              <FaArrowRight className="w-5 h-5" />
            </Link>
            
            <div className="text-white text-sm">
              <FaCheckCircle className="inline w-4 h-4 mr-1" />
              Free forever for open source
            </div>
          </div>
          
          <div className="mt-8 text-green-50 text-sm">
            No setup required • Connect with GitHub in 30 seconds • Cancel anytime
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
