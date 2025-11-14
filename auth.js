// User Authentication Management using Backend API

// Note: This file maintains backward compatibility with existing function names
// but now uses the backend API instead of localStorage

// Register a new user
async function registerUser(username, email, password) {
    try {
        const response = await authAPI.register(username, email, password);
        return response;
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Registration failed. Please try again.'
        };
    }
}

// Login user - verify credentials
async function loginUser(username, password) {
    try {
        const response = await authAPI.login(username, password);
        
        // Check if user doesn't exist (backend returns userNotFound flag)
        if (!response.success && response.userNotFound) {
            return {
                success: false,
                message: 'User does not exist!',
                userNotFound: true
            };
        }
        
        return response;
    } catch (error) {
        // Check if it's a connection error
        if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
            return {
                success: false,
                message: 'Cannot connect to server. Please make sure the backend is running.',
                connectionError: true
            };
        }
        
        return {
            success: false,
            message: error.message || 'Login failed. Please try again.'
        };
    }
}

// Get current logged-in user (from localStorage)
// Note: This function is already defined in api.js, so we just reference it
// If you need to override it, use a different approach

// Async version to verify token with backend
async function getCurrentUserAsync() {
    try {
        const user = await authAPI.getCurrentUser();
        return user;
    } catch (error) {
        return null;
    }
}

// Logout user
function logoutUser() {
    authAPI.logout();
}

// Check if user is logged in
function isLoggedIn() {
    return authAPI.isLoggedIn();
}

// Legacy functions for backward compatibility (deprecated)
function userExists(username) {
    console.warn('userExists() is deprecated. This function is not supported with backend API.');
    return false;
}

function emailExists(email) {
    console.warn('emailExists() is deprecated. This function is not supported with backend API.');
    return false;
}