import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { repoService } from '@/services/api';
import { toast } from 'sonner';

const AnalysisPage = () => {
  const { repoId } = useParams();
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (repoId) {
      analyzeRepo();
    }
  }, [repoId]);

  const analyzeRepo = async () => {
    try {
      setAnalyzing(true);
      setError(null);
      const data = await repoService.analyzeRepository(parseInt(repoId));
      setResult(data);
      
      if (data.feasibility.is_feasible) {
        toast.success(`Analysis complete: ${data.risks.length} risks detected`);
      } else {
        toast.error('Repository does not meet feasibility requirements');
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
      toast.error('Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const getRiskColor = (confidence) => {
    switch (confidence) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-orange-200 bg-orange-50';
      case 'low':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getRiskIcon = (confidence) => {
    switch (confidence) {
      case 'high':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'low':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" data-testid="analyzing">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Analyzing Repository</h2>
          <p className="mt-2 text-gray-600">
            Cloning repository, checking feasibility, and detecting engineering risks...
          </p>
          <p className="mt-4 text-sm text-gray-500">This may take 30-60 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50" data-testid="analysis-error">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <XCircle className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-xl font-bold text-red-900">Analysis Failed</h2>
            </div>
            <p className="text-red-800">{error}</p>
            <Button onClick={analyzeRepo} className="mt-4" data-testid="retry-btn">
              Retry Analysis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="analysis-results">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} data-testid="back-btn">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{result.repo_name}</h1>
          <p className="text-gray-600">{result.repo_full_name}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {result.analysis_time_seconds}s
            </span>
            <span className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              {result.feasibility.stats.total_files} files
            </span>
            <span>
              {result.feasibility.stats.total_loc.toLocaleString()} LOC
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className={`p-6 rounded-lg border-2 ${
            result.feasibility.is_feasible 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center mb-4">
              {result.feasibility.is_feasible ? (
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 mr-3" />
              )}
              <h2 className="text-xl font-bold">
                {result.feasibility.is_feasible ? 'Feasibility Check Passed' : 'Feasibility Check Failed'}
              </h2>
            </div>

            {!result.feasibility.is_feasible && (
              <div className="space-y-2">
                <p className="font-semibold text-red-900">Reasons:</p>
                <ul className="list-disc list-inside space-y-1">
                  {result.feasibility.reasons.map((reason, idx) => (
                    <li key={idx} className="text-red-800">{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.feasibility.warnings && result.feasibility.warnings.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="font-semibold text-yellow-900">Warnings:</p>
                <ul className="list-disc list-inside space-y-1">
                  {result.feasibility.warnings.map((warning, idx) => (
                    <li key={idx} className="text-yellow-800">{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Language</p>
                <p className="font-semibold">{result.feasibility.stats.primary_language}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Files</p>
                <p className="font-semibold">{result.feasibility.stats.total_files}</p>
              </div>
              <div>
                <p className="text-gray-600">Lines of Code</p>
                <p className="font-semibold">{result.feasibility.stats.total_loc.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Max Depth</p>
                <p className="font-semibold">{result.feasibility.stats.max_depth}</p>
              </div>
            </div>
          </div>
        </div>

        {result.feasibility.is_feasible && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Detected Risks ({result.risks.length})
            </h2>

            {result.risks.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-900 font-semibold">No significant risks detected!</p>
                <p className="text-green-700 text-sm mt-2">
                  Your repository appears to follow good architectural practices.
                </p>
              </div>
            ) : (
              <div className="space-y-4" data-testid="risks-list">
                {result.risks.map((risk, idx) => (
                  <div 
                    key={idx} 
                    className={`p-6 border-2 rounded-lg ${getRiskColor(risk.confidence)}`}
                    data-testid={`risk-card-${idx}`}
                  >
                    <div className="flex items-start mb-4">
                      {getRiskIcon(risk.confidence)}
                      <div className="ml-3 flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{risk.title}</h3>
                        <span className="text-xs font-medium text-gray-600 uppercase">
                          {risk.confidence} confidence
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Files Involved:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {risk.files.map((file, fileIdx) => (
                            <li key={fileIdx} className="font-mono text-xs">{file}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Evidence:</p>
                        <p className="text-sm text-gray-600">{risk.evidence}</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Why It Matters:</p>
                        <p className="text-sm text-gray-600">{risk.why_it_matters}</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Suggested Action:</p>
                        <p className="text-sm text-gray-600">{risk.suggested_action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <p className="text-xs text-gray-700">
            <strong>Disclaimer:</strong> This analysis is based on static code structure and does not guarantee 
            the prediction of real failures. Results are for educational and informational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
