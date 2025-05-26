// src/api/adminApi.js
import API_BASE_URL from './base';

export const getDashboardStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
        if (!response.ok) {
            throw new Error('Failed to fetch dashboard stats');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

export const getAdminProfile = async (adminId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/${adminId}/profile`);
        if (!response.ok) {
            throw new Error('Failed to fetch admin profile');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        throw error;
    }
};

export const updateAdminProfile = async (adminId, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/${adminId}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update admin profile');
        }
        return data;
    } catch (error) {
        console.error('Error updating admin profile:', error);
        throw error;
    }
};