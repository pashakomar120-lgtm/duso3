"""
Backend API Tests for duso_ecom Admin Panel
Tests: Admin auth, Leads CRUD, Calls, LiveChats, AI Conversations, Dashboard stats
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials
TEST_ADMIN_USERNAME = f"test_admin_{uuid.uuid4().hex[:8]}"
TEST_ADMIN_PASSWORD = "testpass123"
TEST_ADMIN_EMAIL = f"test_{uuid.uuid4().hex[:8]}@test.com"


class TestHealthCheck:
    """Basic API health check"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"SUCCESS: API root returns: {data}")


class TestAdminAuth:
    """Admin authentication tests"""
    
    @pytest.fixture(scope="class")
    def registered_admin(self):
        """Register a new admin for testing"""
        response = requests.post(f"{BASE_URL}/api/admin/register", json={
            "username": TEST_ADMIN_USERNAME,
            "password": TEST_ADMIN_PASSWORD,
            "email": TEST_ADMIN_EMAIL
        })
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 400:
            # Admin already exists, try login
            login_response = requests.post(f"{BASE_URL}/api/admin/login", json={
                "username": TEST_ADMIN_USERNAME,
                "password": TEST_ADMIN_PASSWORD
            })
            if login_response.status_code == 200:
                return login_response.json()
        pytest.skip("Could not register or login admin")
    
    def test_admin_register_new(self):
        """Test admin registration with new unique username"""
        unique_username = f"test_admin_{uuid.uuid4().hex[:8]}"
        response = requests.post(f"{BASE_URL}/api/admin/register", json={
            "username": unique_username,
            "password": "testpass123",
            "email": f"{unique_username}@test.com"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["username"] == unique_username
        assert "admin_id" in data
        print(f"SUCCESS: Registered admin: {unique_username}")
    
    def test_admin_register_duplicate(self):
        """Test that duplicate username registration fails"""
        # First register
        unique_username = f"test_dup_{uuid.uuid4().hex[:8]}"
        requests.post(f"{BASE_URL}/api/admin/register", json={
            "username": unique_username,
            "password": "testpass123"
        })
        # Try duplicate
        response = requests.post(f"{BASE_URL}/api/admin/register", json={
            "username": unique_username,
            "password": "testpass123"
        })
        assert response.status_code == 400
        print("SUCCESS: Duplicate registration correctly rejected")
    
    def test_admin_login_success(self, registered_admin):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": TEST_ADMIN_USERNAME,
            "password": TEST_ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        print(f"SUCCESS: Admin login successful, token received")
    
    def test_admin_login_invalid_credentials(self):
        """Test admin login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "nonexistent_user",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("SUCCESS: Invalid credentials correctly rejected")
    
    def test_admin_me_endpoint(self, registered_admin):
        """Test /admin/me endpoint with valid token"""
        token = registered_admin["access_token"]
        response = requests.get(f"{BASE_URL}/api/admin/me", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert "username" in data
        print(f"SUCCESS: /admin/me returns: {data}")
    
    def test_admin_me_without_token(self):
        """Test /admin/me endpoint without token"""
        response = requests.get(f"{BASE_URL}/api/admin/me")
        assert response.status_code in [401, 403]
        print("SUCCESS: Unauthorized access correctly rejected")


class TestLeadsAPI:
    """Leads CRUD tests"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get auth token for protected endpoints"""
        # Try to login with default admin credentials
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin123"
        })
        if response.status_code == 200:
            return response.json()["access_token"]
        
        # If not exists, register
        response = requests.post(f"{BASE_URL}/api/admin/register", json={
            "username": "admin",
            "password": "admin123"
        })
        if response.status_code == 200:
            return response.json()["access_token"]
        
        pytest.skip("Could not get auth token")
    
    def test_create_lead(self):
        """Test creating a new lead via public endpoint"""
        lead_data = {
            "name": f"TEST_Lead_{uuid.uuid4().hex[:6]}",
            "email": f"test_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+380501234567",
            "telegram": "@testuser",
            "company": "Test Company",
            "service": "Створення магазину Shopify",
            "budget": "$2,500 - $5,000",
            "message": "Test lead message for testing purposes",
            "source": "contact_form"
        }
        response = requests.post(f"{BASE_URL}/api/leads", json=lead_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == lead_data["name"]
        assert data["email"] == lead_data["email"]
        assert data["status"] == "new"
        assert "id" in data
        assert "created_at" in data
        print(f"SUCCESS: Lead created with ID: {data['id']}")
        return data["id"]
    
    def test_get_all_leads(self, auth_token):
        """Test getting all leads (admin endpoint)"""
        response = requests.get(f"{BASE_URL}/api/admin/leads", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert "leads" in data
        assert "total" in data
        assert isinstance(data["leads"], list)
        print(f"SUCCESS: Retrieved {data['total']} leads")
    
    def test_get_leads_with_status_filter(self, auth_token):
        """Test filtering leads by status"""
        response = requests.get(f"{BASE_URL}/api/admin/leads?status=new", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        data = response.json()
        # All returned leads should have status 'new'
        for lead in data["leads"]:
            assert lead["status"] == "new"
        print(f"SUCCESS: Filtered leads by status=new, got {len(data['leads'])} leads")
    
    def test_update_lead_status(self, auth_token):
        """Test updating lead status"""
        # First create a lead
        lead_data = {
            "name": f"TEST_StatusUpdate_{uuid.uuid4().hex[:6]}",
            "email": f"test_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+380501234567",
            "service": "Маркетинг",
            "budget": "$1,000 - $2,500",
            "message": "Test message"
        }
        create_response = requests.post(f"{BASE_URL}/api/leads", json=lead_data)
        assert create_response.status_code == 200
        lead_id = create_response.json()["id"]
        
        # Update status to in_progress
        update_response = requests.put(
            f"{BASE_URL}/api/admin/leads/{lead_id}/status",
            headers={"Authorization": f"Bearer {auth_token}"},
            json={"status": "in_progress"}
        )
        assert update_response.status_code == 200
        print(f"SUCCESS: Lead {lead_id} status updated to in_progress")
        
        # Update status to closed
        update_response = requests.put(
            f"{BASE_URL}/api/admin/leads/{lead_id}/status",
            headers={"Authorization": f"Bearer {auth_token}"},
            json={"status": "closed"}
        )
        assert update_response.status_code == 200
        print(f"SUCCESS: Lead {lead_id} status updated to closed")
    
    def test_update_lead_invalid_status(self, auth_token):
        """Test updating lead with invalid status"""
        # Create a lead first
        lead_data = {
            "name": "TEST_InvalidStatus",
            "email": "invalid@test.com",
            "phone": "+380501234567",
            "service": "Test",
            "budget": "$1,000",
            "message": "Test"
        }
        create_response = requests.post(f"{BASE_URL}/api/leads", json=lead_data)
        lead_id = create_response.json()["id"]
        
        # Try invalid status
        response = requests.put(
            f"{BASE_URL}/api/admin/leads/{lead_id}/status",
            headers={"Authorization": f"Bearer {auth_token}"},
            json={"status": "invalid_status"}
        )
        assert response.status_code == 400
        print("SUCCESS: Invalid status correctly rejected")


class TestCallsAPI:
    """Call scheduling tests"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin123"
        })
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not get auth token")
    
    def test_create_call(self):
        """Test creating a call schedule"""
        call_data = {
            "name": f"TEST_Call_{uuid.uuid4().hex[:6]}",
            "phone": "+380501234567",
            "telegram": "@testcall",
            "date": "2025-02-15",
            "time": "14:00"
        }
        response = requests.post(f"{BASE_URL}/api/calls", json=call_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == call_data["name"]
        assert data["status"] == "scheduled"
        assert "id" in data
        print(f"SUCCESS: Call scheduled with ID: {data['id']}")
    
    def test_get_all_calls(self, auth_token):
        """Test getting all calls"""
        response = requests.get(f"{BASE_URL}/api/admin/calls", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert "calls" in data
        assert "total" in data
        print(f"SUCCESS: Retrieved {data['total']} calls")


class TestLiveChatAPI:
    """Live chat tests"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin123"
        })
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not get auth token")
    
    def test_create_livechat(self):
        """Test creating a live chat message"""
        chat_data = {
            "name": f"TEST_Chat_{uuid.uuid4().hex[:6]}",
            "phone": "+380501234567",
            "email": f"chat_{uuid.uuid4().hex[:6]}@test.com",
            "telegram": "@testchat",
            "message": "Test live chat message"
        }
        response = requests.post(f"{BASE_URL}/api/livechat", json=chat_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == chat_data["name"]
        assert data["status"] == "new"
        assert "id" in data
        print(f"SUCCESS: Live chat created with ID: {data['id']}")
    
    def test_get_all_livechats(self, auth_token):
        """Test getting all live chats"""
        response = requests.get(f"{BASE_URL}/api/admin/livechats", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert "chats" in data
        assert "total" in data
        print(f"SUCCESS: Retrieved {data['total']} live chats")


class TestDashboardAPI:
    """Dashboard statistics tests"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin123"
        })
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not get auth token")
    
    def test_get_dashboard_stats(self, auth_token):
        """Test getting dashboard statistics"""
        response = requests.get(f"{BASE_URL}/api/admin/dashboard", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        data = response.json()
        
        # Verify all required fields
        assert "total_leads" in data
        assert "new_leads" in data
        assert "in_progress_leads" in data
        assert "closed_leads" in data
        assert "total_calls" in data
        assert "total_chats" in data
        assert "total_ai_conversations" in data
        assert "leads_by_service" in data
        assert "leads_by_budget" in data
        assert "leads_by_day" in data
        
        # Verify data types
        assert isinstance(data["total_leads"], int)
        assert isinstance(data["leads_by_service"], dict)
        assert isinstance(data["leads_by_budget"], dict)
        assert isinstance(data["leads_by_day"], list)
        
        print(f"SUCCESS: Dashboard stats - Total leads: {data['total_leads']}, New: {data['new_leads']}, In Progress: {data['in_progress_leads']}, Closed: {data['closed_leads']}")
        print(f"         Calls: {data['total_calls']}, Chats: {data['total_chats']}, AI Conversations: {data['total_ai_conversations']}")
    
    def test_dashboard_without_auth(self):
        """Test dashboard endpoint without authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/dashboard")
        assert response.status_code in [401, 403]
        print("SUCCESS: Dashboard correctly requires authentication")


class TestAIConversationsAPI:
    """AI Conversations tests"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin123"
        })
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not get auth token")
    
    def test_get_ai_conversations(self, auth_token):
        """Test getting AI conversations list"""
        response = requests.get(f"{BASE_URL}/api/admin/ai-conversations", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert "conversations" in data
        assert "total" in data
        print(f"SUCCESS: Retrieved {data['total']} AI conversations")


class TestCSVExport:
    """CSV Export tests"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "admin123"
        })
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not get auth token")
    
    def test_export_leads_csv(self, auth_token):
        """Test exporting leads to CSV"""
        response = requests.get(f"{BASE_URL}/api/admin/export/leads", headers={
            "Authorization": f"Bearer {auth_token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert "csv" in data
        print(f"SUCCESS: CSV export returned data")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
