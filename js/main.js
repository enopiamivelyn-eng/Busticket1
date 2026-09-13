// Bus Ticketing System - Main JavaScript File

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set current date in any date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            if (!input.value) {
                input.value = today;
            }
        });
    }
    
    // Load username if logged in
    loadUsername();
    
    // Initialize session data if needed
    initializeSessionData();
}

// Username Management
function loadUsername() {
    const usernameElements = document.querySelectorAll('.username');
    const storedUsername = sessionStorage.getItem('username') || 'Username';
    
    usernameElements.forEach(element => {
        element.textContent = storedUsername;
    });
    
    // Update greeting if exists
    const greetingElements = document.querySelectorAll('.greeting, .page-title');
    greetingElements.forEach(element => {
        if (element.textContent.includes('Username')) {
            element.textContent = element.textContent.replace('Username', storedUsername);
        }
    });
}

function setUsername(username) {
    sessionStorage.setItem('username', username);
    loadUsername();
}

// Session Data Management
function initializeSessionData() {
    // Check if we need to initialize default booking data
    const bookingData = sessionStorage.getItem('bookingData');
    if (!bookingData) {
        const defaultData = {
            busName: 'JoyBus',
            from: 'Cebu',
            to: 'Oslob',
            date: '2026-09-05',
            time: '8:00 AM',
            seat: '15',
            price: '200'
        };
        sessionStorage.setItem('bookingData', JSON.stringify(defaultData));
    }
}

// Booking Functions
function getBookingData() {
    const data = sessionStorage.getItem('bookingData');
    return data ? JSON.parse(data) : null;
}

function setBookingData(data) {
    sessionStorage.setItem('bookingData', JSON.stringify(data));
}

function clearBookingData() {
    sessionStorage.removeItem('bookingData');
}

// Navigation Functions
function navigateTo(page) {
    window.location.href = page;
}

function goBack() {
    window.history.back();
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

// Format Date Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatDateTime(dateString, timeString) {
    const formattedDate = formatDate(dateString);
    return `${formattedDate} | ${timeString}`;
}

// Price Formatting
function formatPrice(price) {
    return `₱${price}`;
}

// Form Validation Helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Search Functionality
function performSearch(query, data) {
    const searchQuery = query.toLowerCase();
    return data.filter(item => {
        return Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchQuery)
        );
    });
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Style the toast
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '5px';
    toast.style.color = 'white';
    toast.style.zIndex = '10000';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.animation = 'slideIn 0.3s ease';
    
    // Set background color based on type
    switch(type) {
        case 'success':
            toast.style.backgroundColor = '#22c55e';
            break;
        case 'error':
            toast.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            toast.style.backgroundColor = '#f59e0b';
            break;
        default:
            toast.style.backgroundColor = '#2563eb';
    }
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Local Storage Helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// Generate Booking ID
function generateBookingId() {
    const prefix = 'BOK-';
    const random = Math.floor(Math.random() * 900) + 100;
    return prefix + random;
}

// Calculate Total Amount
function calculateTotal(basePrice, passengers = 1, additionalFees = 0) {
    return (basePrice * passengers) + additionalFees;
}

// Seat Availability Check (Mock)
function checkSeatAvailability(busId, seatNumber) {
    // In production, this would make an API call
    // For now, return random availability
    return Math.random() > 0.3; // 70% chance of being available
}

// Payment Processing (Mock)
function processPayment(paymentMethod, amount) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            if (paymentMethod && amount > 0) {
                resolve({
                    success: true,
                    transactionId: 'TXN-' + Date.now(),
                    message: 'Payment successful'
                });
            } else {
                reject({
                    success: false,
                    message: 'Payment failed'
                });
            }
        }, 1500);
    });
}

// Download Ticket Function
function downloadTicket() {
    showToast('Ticket download started...', 'info');
    // In production, this would generate a PDF
    setTimeout(() => {
        showToast('Ticket downloaded successfully!', 'success');
    }, 1000);
}

// Print Ticket Function
function printTicket() {
    window.print();
}

// Export functions for use in HTML onclick handlers
window.logout = logout;
window.navigateTo = navigateTo;
window.goBack = goBack;
window.showModal = showModal;
window.closeModal = closeModal;
window.downloadTicket = downloadTicket;
window.printTicket = printTicket;
window.showToast = showToast;

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('Bus Ticketing System initialized successfully!');
