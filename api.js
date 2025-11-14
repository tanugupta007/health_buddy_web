// API Configuration and Utility Functions

const API_BASE_URL = 'http://localhost:5000/api';

// Get authentication token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Set authentication token
function setToken(token) {
    localStorage.setItem('token', token);
}

// Remove authentication token
function removeToken() {
    localStorage.removeItem('token');
}

// Get current user from localStorage
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Set current user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Remove current user
function removeCurrentUser() {
    localStorage.removeItem('currentUser');
}

// API request helper
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getToken();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        },
        ...options
    };

    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// Authentication API
const authAPI = {
    // Register new user
    async register(username, email, password) {
        try {
            const response = await apiRequest('/auth/register', {
                method: 'POST',
                body: { username, email, password }
            });

            if (response.success) {
                setToken(response.token);
                setCurrentUser(response.user);
            }

            return response;
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Registration failed'
            };
        }
    },

    // Login user
    async login(username, password) {
        try {
            const response = await apiRequest('/auth/login', {
                method: 'POST',
                body: { username, password }
            });

            if (response.success) {
                setToken(response.token);
                setCurrentUser(response.user);
            }

            return response;
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Login failed'
            };
        }
    },

    // Get current user (async - verifies token with backend)
    async getCurrentUser() {
        try {
            const response = await apiRequest('/auth/me', {
                method: 'GET'
            });

            if (response.success && response.user) {
                setCurrentUser(response.user);
                return response.user;
            }

            // If verification fails, clear tokens
            removeToken();
            removeCurrentUser();
            return null;
        } catch (error) {
            // If error (like 401), clear tokens
            removeToken();
            removeCurrentUser();
            return null;
        }
    },

    // Logout
    logout() {
        removeToken();
        removeCurrentUser();
    },

    // Check if user is logged in
    isLoggedIn() {
        return getToken() !== null && getCurrentUser() !== null;
    }
};

// Chat API
const chatAPI = {
    // Generate chat response using Gemini AI
    async generateResponse(message, language = 'en') {
        try {
            const result = await apiRequest('/chat/generate', {
                method: 'POST',
                body: { message, language }
            });
            return result;
        } catch (error) {
            console.error('Generate chat response error:', error);
            return {
                success: false,
                message: error.message || 'Failed to generate response'
            };
        }
    },

    // Save chat message
    async saveChat(message, response, language = 'en') {
        try {
            const result = await apiRequest('/chat', {
                method: 'POST',
                body: { message, response, language }
            });
            return result;
        } catch (error) {
            console.error('Save chat error:', error);
            // Don't throw error, just log it
            return { success: false };
        }
    },

    // Get chat history
    async getChatHistory() {
        try {
            const response = await apiRequest('/chat', {
                method: 'GET'
            });
            return response.chats || [];
        } catch (error) {
            console.error('Get chat history error:', error);
            return [];
        }
    }
};

// Symptoms API
const symptomsAPI = {
    // Analyze symptoms using Gemini AI
    async analyzeSymptoms(symptoms, language = 'en') {
        try {
            const result = await apiRequest('/symptoms/analyze', {
                method: 'POST',
                body: { symptoms, language }
            });
            return result;
        } catch (error) {
            console.error('Analyze symptoms error:', error);
            return {
                success: false,
                message: error.message || 'Failed to analyze symptoms'
            };
        }
    },

    // Save symptom check
    async saveSymptomCheck(symptoms, analysis, language = 'en') {
        try {
            const result = await apiRequest('/symptoms', {
                method: 'POST',
                body: { symptoms, analysis, language }
            });
            return result;
        } catch (error) {
            console.error('Save symptom check error:', error);
            // Don't throw error, just log it
            return { success: false };
        }
    },

    // Get symptom check history
    async getSymptomHistory() {
        try {
            const response = await apiRequest('/symptoms', {
                method: 'GET'
            });
            return response.symptomChecks || [];
        } catch (error) {
            console.error('Get symptom history error:', error);
            return [];
        }
    }
};
