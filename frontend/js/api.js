// js/api.js
// Ensure this matches the backend PORT in backend/.env (we set it to 5000)
const API_BASE_URL = 'http://localhost:5000/api';

class API {
  // Get token from localStorage
  static getToken() {
    return localStorage.getItem('token');
  }

  // Get headers with token
  static getHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Generic fetch wrapper
  static async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: this.getHeaders()
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/frontend/pages/auth/login.html';
        }
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ==================== AUTH APIs ====================
  static async login(username, password) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  }

  static async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  // ==================== USER APIs ====================
  static async getUsers() {
    return this.request('/users');
  }

  static async getUserById(id) {
    return this.request(`/users/${id}`);
  }

  static async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  static async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE'
    });
  }

  // ==================== TICKET APIs ====================
  static async getTickets(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return this.request(`/tickets${queryString ? '?' + queryString : ''}`);
  }

  static async getTicketById(id) {
    return this.request(`/tickets/${id}`);
  }

  static async createTicket(ticketData) {
    return this.request('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData)
    });
  }

  static async updateTicket(id, ticketData) {
    return this.request(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticketData)
    });
  }

  static async deleteTicket(id) {
    return this.request(`/tickets/${id}`, {
      method: 'DELETE'
    });
  }

  static async getMyTickets() {
    return this.request('/tickets/my-tickets');
  }

  // ==================== STATUS APIs ====================
  static async getStatuses() {
    return this.request('/status');
  }

  static async getStatusById(id) {
    return this.request(`/status/${id}`);
  }

  static async createStatus(statusData) {
    return this.request('/status', {
      method: 'POST',
      body: JSON.stringify(statusData)
    });
  }

  static async updateStatus(id, statusData) {
    return this.request(`/status/${id}`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    });
  }

  static async deleteStatus(id) {
    return this.request(`/status/${id}`, {
      method: 'DELETE'
    });
  }

  // ==================== STAFF APIs ====================
  static async getStaff() {
    return this.request('/staff');
  }

  static async getStaffById(id) {
    return this.request(`/staff/${id}`);
  }

  static async createStaff(staffData) {
    return this.request('/staff', {
      method: 'POST',
      body: JSON.stringify(staffData)
    });
  }

  static async updateStaff(id, staffData) {
    return this.request(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(staffData)
    });
  }

  static async deleteStaff(id) {
    return this.request(`/staff/${id}`, {
      method: 'DELETE'
    });
  }

  static async assignTicket(ticketId, staffId, notes = '') {
    return this.request('/staff/assign', {
      method: 'POST',
      body: JSON.stringify({ 
        ticket_id: ticketId, 
        staff_id: staffId,
        notes: notes
      })
    });
  }

  static async getAllAssignments() {
    return this.request('/staff/assignments/all');
  }

  static async updateAssignment(assignmentId, status, notes = '') {
    return this.request(`/staff/assignments/${assignmentId}`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes })
    });
  }

  // ==================== COMMENT APIs ====================
  static async addComment(ticketId, comment) {
    return this.request('/comments', {
      method: 'POST',
      body: JSON.stringify({ 
        ticket_id: ticketId, 
        comment 
      })
    });
  }

  static async getComments(ticketId) {
    return this.request(`/comments/ticket/${ticketId}`);
  }

  static async updateComment(commentId, comment) {
    return this.request(`/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ comment })
    });
  }

  static async deleteComment(commentId) {
    return this.request(`/comments/${commentId}`, {
      method: 'DELETE'
    });
  }

  // ==================== LOG APIs ====================
  static async getLogs(ticketId) {
    return this.request(`/comments/logs/ticket/${ticketId}`);
  }
}