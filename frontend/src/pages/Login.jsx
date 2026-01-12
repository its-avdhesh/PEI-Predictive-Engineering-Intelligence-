import React from 'react';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/api';

const Login = () => {
  const handleGitHubLogin = () => {
    authService.initiateGitHubLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-900">
            PEI - Predictive Engineering Intelligence
          </h1>
          <p className="mt-3 text-center text-sm text-gray-600">
            Analyze your repositories for engineering risks and architectural issues
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleGitHubLogin}
            className="w-full flex items-center justify-center gap-2"
            size="lg"
            data-testid="github-login-btn"
          >
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </Button>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> This MVP analyzes repositories up to ~300 files using structural analysis. 
              We request read-only access to your repositories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
