import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, RefreshCw, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { repoService } from '@/services/api';
import { toast } from 'sonner';

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const data = await repoService.listRepositories();
      setRepositories(data.repositories);
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
      toast.error('Failed to load repositories');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAnalyze = (repoId) => {
    navigate(`/analyze/${repoId}`);
  };

  const filteredRepos = repositories.filter(repo =>
    repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" data-testid="dashboard-loading">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading repositories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="dashboard">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Your Repositories</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={fetchRepositories} size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={handleLogout} size="sm" data-testid="logout-btn">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="search-input"
            />
          </div>
        </div>

        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 text-sm">Analysis Limitations</h3>
              <p className="text-xs text-yellow-800 mt-1">
                This MVP analyzes repositories up to 300 files and 40,000 lines of code. 
                Analysis is deterministic and does not guarantee prediction of real failures. 
                We only request read-only access and do not store your source code.
              </p>
            </div>
          </div>
        </div>

        {filteredRepos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No repositories found</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="repo-grid">
            {filteredRepos.map((repo) => (
              <div 
                key={repo.id} 
                className="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow"
                data-testid={`repo-card-${repo.id}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
                    {repo.name}
                  </h3>
                  {repo.private && (
                    <span className="ml-2 px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded flex-shrink-0">
                      Private
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 mb-2">{repo.full_name}</p>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
                  {repo.description || 'No description'}
                </p>
                
                {repo.language && (
                  <div className="mb-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {repo.language}
                    </span>
                  </div>
                )}
                
                <Button 
                  onClick={() => handleAnalyze(repo.id)}
                  className="w-full"
                  size="sm"
                  data-testid={`analyze-btn-${repo.id}`}
                >
                  Analyze Repository
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
