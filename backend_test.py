#!/usr/bin/env python3
"""
Backend API Tests for PEI MVP Application
Tests the basic API endpoints and OAuth flow
"""

import requests
import sys
from datetime import datetime

class PEIAPITester:
    def __init__(self, base_url="https://pei-mvp.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {response_data}")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, None

    def test_health_endpoint(self):
        """Test the health check endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )
        return success

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "Root API Info",
            "GET",
            "api/",
            200
        )
        return success

    def test_github_oauth_endpoint(self):
        """Test GitHub OAuth endpoint (should return 500/520 due to missing config)"""
        # Try the request
        url = f"{self.base_url}/api/auth/github/login"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing GitHub OAuth Login (Expected to fail)...")
        print(f"   URL: {url}")
        
        try:
            response = requests.get(url, headers=headers, timeout=10)
            
            # Accept both 500 and 520 (load balancer might return 520)
            success = response.status_code in [500, 520]
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {response_data}")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected 500 or 520, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                return False
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False
        
        # Check if the error message is correct
        if success and response:
            try:
                error_data = response.json()
                if "GitHub OAuth not configured" in error_data.get("detail", ""):
                    print("✅ Correct error message: GitHub OAuth not configured")
                    return True
                else:
                    print(f"❌ Unexpected error message: {error_data}")
                    return False
            except:
                print("❌ Could not parse error response")
                return False
        
        return success

def main():
    print("🚀 Starting PEI MVP Backend API Tests")
    print("=" * 50)
    
    # Setup
    tester = PEIAPITester()
    
    # Run basic API tests
    print("\n📡 Testing Basic API Endpoints...")
    health_ok = tester.test_health_endpoint()
    root_ok = tester.test_root_endpoint()
    
    # Test OAuth endpoint (should fail with proper error)
    print("\n🔐 Testing OAuth Endpoint (Expected Failure)...")
    oauth_ok = tester.test_github_oauth_endpoint()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if health_ok and root_ok and oauth_ok:
        print("✅ All backend tests passed as expected!")
        print("   - API endpoints are responding correctly")
        print("   - OAuth properly returns configuration error")
        return 0
    else:
        print("❌ Some backend tests failed")
        if not health_ok:
            print("   - Health endpoint not working")
        if not root_ok:
            print("   - Root API endpoint not working")
        if not oauth_ok:
            print("   - OAuth endpoint not returning expected error")
        return 1

if __name__ == "__main__":
    sys.exit(main())