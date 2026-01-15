import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaGithub, 
  FaSearch,
  FaCodeBranch,
  FaBell,
  FaPlus,
  FaCaretDown,
  FaSun,
  FaMoon
} from 'react-icons/fa';

const GitHubHeader = ({ darkMode, toggleDarkMode, isAuthenticated, user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleGitHubAuth = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/github/login`;
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false);
      setShowCreateMenu(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-full">
        <div className="flex items-center justify-between px-3 h-16">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center space-x-6">
            {/* GitHub Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <FaGithub className="w-8 h-8 text-white" />
              <span className="text-xl font-semibold hidden md:block">PEI</span>
            </Link>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium hover:text-gray-300 transition-colors ${
                  location.pathname === '/dashboard' ? 'text-white' : 'text-gray-300'
                }`}
              >
                Dashboard
              </Link>
              <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Pull requests
              </button>
              <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Issues
              </button>
              <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Marketplace
              </button>
              <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Explore
              </button>
            </nav>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search or jump to..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </form>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-3">
            {/* Create Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCreateMenu(!showCreateMenu);
                }}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-all"
              >
                <FaPlus className="w-4 h-4" />
                <FaCaretDown className="w-3 h-3" />
              </button>
              
              {showCreateMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      New repository
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      Import repository
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      New codespace
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      New gist
                    </button>
                    <hr className="my-2 border-gray-700" />
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                      New organization
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pull Requests */}
            <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-all">
              <FaCodeBranch className="w-5 h-5" />
            </button>

            {/* Issues */}
            <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-all">
              <FaCodeBranch className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-all">
              <FaBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-all"
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(!showUserMenu);
                  }}
                  className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-800 transition-all"
                >
                  <img
                    src={user?.avatar_url || `https://github.com/github.png`}
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <FaCaretDown className="w-3 h-3 text-gray-300" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">Signed in as</p>
                      <p className="text-sm text-gray-300">{user?.login || 'user'}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        Your repositories
                      </Link>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Your organizations
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Your enterprises
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Your projects
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Your stars
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Your gists
                    </button>
                      <hr className="my-2 border-gray-700" />
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Upgrade
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Feature preview
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Help
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Settings
                      </button>
                      <hr className="my-2 border-gray-700" />
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleGitHubAuth}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-all"
              >
                <FaGithub className="w-4 h-4" />
                <span>Sign in with GitHub</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GitHubHeader;
