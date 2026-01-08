# GitHub OAuth Setup Guide for PEI

## Quick Setup Instructions

### For Users Setting Up Their Own Instance

If you're deploying PEI yourself, follow these steps to configure GitHub OAuth:

## Step 1: Register OAuth Application on GitHub

1. **Navigate to GitHub Developer Settings**
   - Go to: https://github.com/settings/developers
   - Click on "OAuth Apps" in the left sidebar
   - Click "New OAuth App" button

2. **Fill in Application Details**
   ```
   Application name: PEI - Predictive Engineering Intelligence
   Homepage URL: https://pei-mvp.preview.emergentagent.com
   Application description: (Optional) Repository analysis tool for detecting engineering risks
   Authorization callback URL: https://pei-mvp.preview.emergentagent.com/api/auth/github/callback
   ```

3. **Register the Application**
   - Click "Register application"
   - You'll be redirected to your app's settings page

4. **Get Your Credentials**
   - **Client ID**: Displayed on the page (you can always view this)
   - **Client Secret**: Click "Generate a new client secret"
   - ⚠️ **IMPORTANT**: Copy the Client Secret immediately - it won't be shown again!

## Step 2: Configure Backend Environment

1. **Update Backend .env File**
   
   Edit `/app/backend/.env` and add your credentials:
   ```bash
   GITHUB_CLIENT_ID=your_actual_client_id_here
   GITHUB_CLIENT_SECRET=your_actual_client_secret_here
   ```

2. **Restart Backend Service**
   ```bash
   sudo supervisorctl restart backend
   ```

3. **Verify Configuration**
   ```bash
   # Check if service started successfully
   sudo supervisorctl status backend
   
   # Check logs for any errors
   tail -f /var/log/supervisor/backend.err.log
   ```

## Step 3: Test the OAuth Flow

1. Open your browser and go to: https://pei-mvp.preview.emergentagent.com
2. Click "Sign in with GitHub"
3. You should be redirected to GitHub authorization page
4. Click "Authorize" to grant access
5. You should be redirected back to the dashboard

## OAuth Scopes Explained

PEI requests the following GitHub OAuth scopes:

### `repo` Scope
- **What it grants**: Full access to public and private repositories
- **Why we need it**: To clone and analyze both public and private repositories
- **What PEI uses it for**: Read-only operations only (cloning, reading files)
- **What PEI does NOT do**: Write to repositories, create issues, modify code

### `user:email` Scope
- **What it grants**: Access to user's email addresses
- **Why we need it**: To identify users and provide better UX
- **What PEI uses it for**: Display user info, associate analyses with users

## Security Best Practices

### For Application Owners

1. **Never Commit Secrets**
   ```bash
   # Ensure .env is in .gitignore
   echo "backend/.env" >> .gitignore
   ```

2. **Use Environment Variables in Production**
   - Don't hardcode credentials
   - Use secure secret management (AWS Secrets Manager, Azure Key Vault, etc.)

3. **Rotate Secrets Regularly**
   - Generate new client secrets periodically
   - Update both GitHub and your application

4. **Monitor OAuth Token Usage**
   - Review GitHub's OAuth token activity
   - Revoke suspicious tokens immediately

### For Users

1. **Review Permissions Carefully**
   - Understand what scopes the app requests
   - Only authorize apps you trust

2. **Revoke Access If Needed**
   - Go to: https://github.com/settings/applications
   - Find "PEI - Predictive Engineering Intelligence"
   - Click "Revoke" to remove access

3. **Check Authorized Apps Regularly**
   - Review your authorized OAuth apps periodically
   - Remove apps you no longer use

## Troubleshooting

### Error: "GitHub OAuth not configured"

**Cause**: Backend environment variables are missing or incorrect

**Solution**:
```bash
# 1. Check if variables are set
grep GITHUB /app/backend/.env

# 2. Verify format (no quotes needed)
GITHUB_CLIENT_ID=abc123xyz789
GITHUB_CLIENT_SECRET=def456uvw012

# 3. Restart backend
sudo supervisorctl restart backend
```

### Error: "Failed to obtain access token"

**Cause**: Invalid Client ID or Client Secret

**Solution**:
1. Verify credentials in GitHub OAuth App settings
2. Regenerate Client Secret if needed
3. Update backend .env with new values
4. Restart backend service

### Error: "Callback URL mismatch"

**Cause**: GitHub OAuth App callback URL doesn't match application

**Solution**:
1. Check GitHub OAuth App settings
2. Ensure callback URL is: `https://pei-mvp.preview.emergentagent.com/api/auth/github/callback`
3. No trailing slash
4. Must match exactly (including https://)

### Error: "Authentication failed" after authorization

**Cause**: JWT secret or token handling issue

**Solution**:
```bash
# 1. Check JWT secret is set
grep JWT_SECRET /app/backend/.env

# 2. Ensure it's a strong random string
# Generate new one if needed:
python3 -c "import secrets; print(secrets.token_urlsafe(32))"

# 3. Update .env with generated secret
# 4. Restart backend
```

## For Different Environments

### Development / Localhost

If running locally:
```
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:8001/api/auth/github/callback
```

Update backend config:
```bash
GITHUB_REDIRECT_URI=http://localhost:8001/api/auth/github/callback
```

### Production / Custom Domain

If deploying to custom domain:
```
Homepage URL: https://yourdomain.com
Authorization callback URL: https://yourdomain.com/api/auth/github/callback
```

Update backend config:
```bash
GITHUB_REDIRECT_URI=https://yourdomain.com/api/auth/github/callback
```

## OAuth Flow Diagram

```
1. User clicks "Sign in with GitHub"
   ↓
2. Frontend redirects to: /api/auth/github/login
   ↓
3. Backend redirects to: https://github.com/login/oauth/authorize
   ↓
4. User authorizes on GitHub
   ↓
5. GitHub redirects to: /api/auth/github/callback?code=XXX
   ↓
6. Backend exchanges code for access_token
   ↓
7. Backend fetches user info from GitHub API
   ↓
8. Backend stores user + token in MongoDB
   ↓
9. Backend generates JWT token
   ↓
10. Backend redirects to: /auth/callback?token=JWT
    ↓
11. Frontend stores JWT in cookie
    ↓
12. Frontend redirects to: /dashboard
```

## Additional Resources

- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps)
- [OAuth 2.0 Scopes for GitHub](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps)
- [GitHub REST API](https://docs.github.com/en/rest)

## Support

If you encounter issues:
1. Check troubleshooting section above
2. Review backend logs: `tail -f /var/log/supervisor/backend.err.log`
3. Verify GitHub OAuth App configuration
4. Ensure all environment variables are correctly set

---

**Note**: This setup is specifically for the Emergent-hosted version. If deploying elsewhere, adjust URLs accordingly.
