// Shared JavaScript utilities for Workout Tracker

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Show notification/alert
function showNotification(message, type = 'info') {
    // Simple alert for now - could be enhanced with custom notifications
    alert(message);
}

// API error handler
function handleAPIError(error) {
    console.error('API Error:', error);
    showNotification('An error occurred. Please try again.', 'error');
}

// Validate form data
function validateRequired(value, fieldName) {
    if (!value || value.trim() === '') {
        showNotification(`${fieldName} is required`, 'error');
        return false;
    }
    return true;
}

// Format duration (minutes to hours:minutes if needed)
function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Calculate calories estimate (rough estimate)
function estimateCalories(duration, difficulty) {
    const baseRate = {
        'Beginner': 5,
        'Intermediate': 7,
        'Advanced': 9
    };
    return duration * (baseRate[difficulty] || 6);
}

// Check if server is running
async function checkServerConnection() {
    try {
        const response = await fetch('/');
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Initialize - check connection on page load
document.addEventListener('DOMContentLoaded', async () => {
    const isConnected = await checkServerConnection();
    if (!isConnected) {
        const notice = document.createElement('div');
        notice.className = 'error';
        notice.style.margin = '20px';
        notice.textContent = '⚠️ Cannot connect to server. Make sure the server is running on port 3000.';
        document.body.insertBefore(notice, document.body.firstChild);
    }
});
