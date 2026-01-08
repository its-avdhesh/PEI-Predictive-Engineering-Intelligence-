# PEI - Predictive Engineering Intelligence (MVP)

A web application that analyzes GitHub repositories to detect structural engineering risks and architectural issues using deterministic code analysis.

## Features

- **GitHub OAuth Integration**: Secure authentication with read-only repository access
- **Repository Analysis**: Analyze codebases for engineering risks
- **Feasibility Checks**: Automatic validation of repository size and complexity
- **Risk Detection**:
  - God Files (large, complex files)
  - Circular Dependencies
  - High Coupling (fan-in/fan-out)
  - Missing Abstraction Layers
- **Multi-Language Support**: Python and JavaScript/TypeScript analysis
- **Clean Dashboard**: Minimal, functional UI

## Tech Stack

- **Backend**: FastAPI (Python) + MongoDB
- **Frontend**: React + shadcn/ui + TailwindCSS
- **Analysis**: AST parsing + NetworkX for dependency graphs
- **Authentication**: GitHub OAuth + JWT

## Prerequisites

- GitHub Account
- GitHub OAuth App credentials (see setup below)

## GitHub OAuth Setup

To use PEI, you need to create a GitHub OAuth App:

### Step 1: Create GitHub OAuth App

1. Go to GitHub Settings: https://github.com/settings/developers
2. Click "OAuth Apps" → "New OAuth App"
3. Fill in the details:
   - **Application name**: `PEI - Engineering Intelligence` (or your choice)
   - **Homepage URL**: `https://pei-mvp.preview.emergentagent.com`
   - **Authorization callback URL**: `https://pei-mvp.preview.emergentagent.com/api/auth/github/callback`
   - **Description**: Optional

4. Click "Register application"
5. You'll receive a **Client ID** (visible immediately)
6. Click "Generate a new client secret" to get your **Client Secret**
7. **Copy both values immediately** (the secret won't be shown again)

### Step 2: Configure PEI

After receiving the OAuth credentials from GitHub:

1. You'll need to provide these to the application owner to add to the backend `.env` file:
   ```
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   ```

2. The backend service will need to be restarted after configuration

## Limitations & Constraints

As per PRD specifications, this MVP has the following constraints:

### Hard Limits (Analysis will be rejected if exceeded)
- **Maximum Files**: 300 code files
- **Maximum LOC**: 40,000 lines of code
- **Folder Depth**: Maximum 8 levels
- **Primary Language**: Single language repositories only
- **No Monorepos**: Repositories with monorepo structure are rejected

### Soft Limits (Warnings)
- **200-300 files**: Analysis may take longer
- **30k-40k LOC**: Explanations may be limited

### Important Notes
- ✅ Analysis is **deterministic** (no LLM dependency for MVP)
- ✅ **Read-only access** to repositories
- ✅ **No source code storage** - code is cloned temporarily and deleted after analysis
- ⚠️ **No prediction guarantees** - results are for educational purposes
- ⚠️ Zero-cost solution with no paid APIs

## Usage

1. **Login**: Click "Sign in with GitHub"
2. **Authorize**: Grant read-only access to your repositories
3. **Select Repository**: Choose a repository from your list
4. **Analyze**: Click "Analyze Repository"
5. **View Results**: 
   - Feasibility check results
   - Detected engineering risks
   - Detailed explanations and suggestions

## Risk Types Detected

### 1. God Files
Files that are too large or complex, violating Single Responsibility Principle.

**Detection**: Files with >500 LOC or complexity >30

### 2. Circular Dependencies
Files that depend on each other in a circular manner, making code hard to test and refactor.

**Detection**: Cycles in import dependency graph

### 3. High Fan-In (Central Files)
Files depended upon by many other files, creating critical change points.

**Detection**: Files with ≥10 dependents

### 4. High Fan-Out (Excessive Dependencies)
Files that depend on many other files, indicating tight coupling.

**Detection**: Files with ≥15 dependencies

### 5. Missing Abstraction Layers
Files that appear to mix architectural concerns (e.g., database + API logic).

**Detection**: Heuristic-based on file naming patterns

## Architecture

### Backend Structure
```
/app/backend/
├── server.py              # Main FastAPI application
├── config.py              # Settings management
├── routes/
│   ├── auth.py           # GitHub OAuth routes
│   └── repos.py          # Repository analysis routes
├── services/
│   ├── github_service.py # GitHub API integration
│   ├── cloner.py         # Repository cloning
│   └── feasibility.py    # Feasibility checks
├── analyzers/
│   ├── code_parser.py    # Python/JS code parsing
│   ├── dependency_graph.py # Dependency graph builder
│   └── risk_detector.py  # Risk detection engine
├── auth/
│   ├── jwt_handler.py    # JWT token management
│   └── dependencies.py   # Auth dependencies
└── models/
    ├── user.py           # User models
    └── analysis.py       # Analysis models
```

### Frontend Structure
```
/app/frontend/src/
├── App.js                # Main app with routing
├── pages/
│   ├── Login.js          # Login page
│   ├── AuthCallback.js   # OAuth callback handler
│   ├── Dashboard.js      # Repository list
│   └── AnalysisPage.js   # Analysis results
├── services/
│   └── api.js            # API service layer
└── contexts/
    └── AuthContext.js    # Authentication state
```

## API Endpoints

### Authentication
- `GET /api/auth/github/login` - Initiate GitHub OAuth
- `GET /api/auth/github/callback` - OAuth callback handler

### Repositories
- `GET /api/repos/list` - List user's repositories
- `POST /api/repos/analyze/{repo_id}` - Analyze a repository
- `GET /api/repos/analyses` - Get user's analysis history

### Health
- `GET /api/health` - Health check endpoint

## Analysis Flow

1. **Authentication**: User logs in via GitHub OAuth
2. **Repository Selection**: User selects repository from list
3. **Cloning**: Repository is cloned to temporary directory
4. **Feasibility Check**: Hard and soft limits are validated
5. **Code Parsing**: Files are parsed using AST
6. **Dependency Graph**: Import relationships are mapped
7. **Risk Detection**: Structural patterns are analyzed
8. **Results**: Risks are ranked and presented with explanations
9. **Cleanup**: Temporary repository is deleted

## Security

- **OAuth Scopes**: Requests `repo` and `user:email` scopes
- **Token Storage**: Access tokens stored in MongoDB, JWT tokens in HTTP-only cookies
- **Read-Only Operations**: Application only reads repositories, never writes
- **Temporary Storage**: Cloned code is immediately deleted after analysis
- **No Persistence**: Source code is never permanently stored

## Future Enhancements

Per PRD, the following are explicitly **NOT** in MVP scope but could be added later:

- LLM-based risk explanations (currently deterministic only)
- Real-time monitoring
- Enterprise scale support
- Continuous background scanning
- Additional language support
- Custom risk rules
- Team collaboration features

## Known Issues

- Large repositories (>300 files) cannot be analyzed in MVP
- Monorepos are not supported
- Import resolution is heuristic-based and may miss complex patterns
- Analysis accuracy depends on code structure clarity

## Troubleshooting

### "GitHub OAuth not configured" Error
- Ensure `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are set in backend `.env`
- Restart backend service after configuration

### "Failed to clone repository" Error
- Check repository permissions
- Verify OAuth token has `repo` scope
- Private repositories require proper authentication

### "Repository does not meet feasibility requirements"
- Check if repository exceeds size limits (300 files, 40k LOC)
- Verify repository is not a monorepo
- Ensure primary language is >70% of codebase

## Contributing

This is an MVP project built for demonstration purposes. Contributions should focus on:
- Bug fixes
- Documentation improvements
- Test coverage
- Performance optimizations

## License

This project is built as an educational MVP for interview/portfolio purposes.

## Disclaimer

**This analysis tool is for educational and informational purposes only.** 

- Results do not guarantee prediction of real system failures
- Analysis is based on static code structure only
- Not a replacement for professional code review
- No liability for decisions made based on analysis results

---

**Built with Emergent** - AI-powered full-stack development platform
