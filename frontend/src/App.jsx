import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import GitHubHeader from './components/GitHubHeader.jsx';
import HomePage from './pages/HomePage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AnalysisPage from './pages/AnalysisPage.jsx';
import DocumentationPage from './pages/DocumentationPage.jsx';
import RepositoryDetailPage from './pages/RepositoryDetailPage.jsx';
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <AuthProvider>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-900">
                    <GitHubHeader 
                      darkMode={darkMode} 
                      toggleDarkMode={toggleDarkMode}
                      isAuthenticated={true}
                      user={{ login: 'developer' }}
                      onLogout={() => {}}
                    />
                    <Dashboard />
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analyze/:repoId" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-900">
                    <GitHubHeader 
                      darkMode={darkMode} 
                      toggleDarkMode={toggleDarkMode}
                      isAuthenticated={true}
                      user={{ login: 'developer' }}
                      onLogout={() => {}}
                    />
                    <AnalysisPage />
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/repository/:owner/:repo" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-900">
                    <GitHubHeader 
                      darkMode={darkMode} 
                      toggleDarkMode={toggleDarkMode}
                      isAuthenticated={true}
                      user={{ login: 'developer' }}
                      onLogout={() => {}}
                    />
                    <RepositoryDetailPage />
                  </div>
                </ProtectedRoute>
              } 
            />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
