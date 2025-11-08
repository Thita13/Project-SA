// js/utils.js

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };

  const toast = document.createElement('div');
  toast.className = `${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 mb-3 animate-slide-in min-w-[300px]`;
  toast.innerHTML = `
    <i class="fas ${icons[type]} text-xl"></i>
    <span class="flex-1">${message}</span>
    <button onclick="this.parentElement.remove()" class="hover:bg-white/20 rounded p-1">
      <i class="fas fa-times"></i>
    </button>
  `;

  toastContainer.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.add('animate-slide-out');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Add animations to document
if (!document.getElementById('toast-animations')) {
  const style = document.createElement('style');
  style.id = 'toast-animations';
  style.textContent = `
    @keyframes slide-in {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
    .animate-slide-out {
      animation: slide-out 0.3s ease-in;
    }
  `;
  document.head.appendChild(style);
}

// ==================== LOADING SPINNER ====================
function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="flex flex-col justify-center items-center py-12">
      <div class="relative w-16 h-16">
        <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div class="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p class="mt-4 text-gray-600">กำลังโหลด...</p>
    </div>
  `;
}

function hideLoading(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
}

// ==================== DATE FORMATTING ====================
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatDateShort(dateString) {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getRelativeTime(dateString) {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} วันที่แล้ว`;
  if (hours > 0) return `${hours} ชั่วโมงที่แล้ว`;
  if (minutes > 0) return `${minutes} นาทีที่แล้ว`;
  return 'เมื่อสักครู่';
}

// ==================== BADGE GENERATORS ====================
function getPriorityBadge(priority) {
  const badges = {
    low: '<span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><i class="fas fa-arrow-down mr-1"></i>Low</span>',
    medium: '<span class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><i class="fas fa-minus mr-1"></i>Medium</span>',
    high: '<span class="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"><i class="fas fa-arrow-up mr-1"></i>High</span>',
    critical: '<span class="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><i class="fas fa-exclamation-triangle mr-1"></i>Critical</span>'
  };
  return badges[priority?.toLowerCase()] || badges.medium;
}

function getStatusBadge(status) {
  const badges = {
    'Open': '<span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><i class="fas fa-folder-open mr-1"></i>Open</span>',
    'In Progress': '<span class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><i class="fas fa-spinner mr-1"></i>In Progress</span>',
    'Resolved': '<span class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><i class="fas fa-check-circle mr-1"></i>Resolved</span>',
    'Closed': '<span class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><i class="fas fa-times-circle mr-1"></i>Closed</span>',
    'Pending': '<span class="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><i class="fas fa-clock mr-1"></i>Pending</span>'
  };
  return badges[status] || `<span class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">${status}</span>`;
}

function getRoleBadge(role) {
  const badges = {
    admin: '<span class="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><i class="fas fa-crown mr-1"></i>Admin</span>',
    support: '<span class="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><i class="fas fa-headset mr-1"></i>Support</span>',
    user: '<span class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><i class="fas fa-user mr-1"></i>User</span>'
  };
  return badges[role?.toLowerCase()] || badges.user;
}

// ==================== MODAL HELPERS ====================
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// ==================== CONFIRMATION DIALOG ====================
function confirmDialog(message, onConfirm) {
  if (confirm(message)) {
    onConfirm();
  }
}

// ==================== FORM VALIDATION ====================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// ==================== LOCAL STORAGE HELPERS ====================
function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    return false;
  }
}

function getFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return null;
  }
}

function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Error removing from localStorage:', e);
    return false;
  }
}

// ==================== AUTHENTICATION HELPERS ====================
function isLoggedIn() {
  return !!localStorage.getItem('token');
}

function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/frontend/pages/auth/login.html';
}

// ==================== STRING HELPERS ====================
function truncateText(text, maxLength = 50) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==================== NUMBER FORMATTING ====================
function formatNumber(num) {
  return new Intl.NumberFormat('th-TH').format(num);
}

// ==================== DEBOUNCE ====================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==================== EXPORT FOR USE ====================
// All functions are available globally