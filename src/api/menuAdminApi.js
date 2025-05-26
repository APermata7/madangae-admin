// src/api/menuAdminApi.js
import API_BASE_URL from './base';

export const getAllMenusAdmin = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/menus`);
        if (!response.ok) {
            throw new Error('Failed to fetch menus for admin');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menus for admin:', error);
        throw error;
    }
};

export const addMenu = async (menuData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/menus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to add menu');
        }
        return data;
    } catch (error) {
        console.error('Error adding menu:', error);
        throw error;
    }
};

export const updateMenu = async (menuId, menuData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/menus/${menuId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update menu');
        }
        return data;
    } catch (error) {
        console.error('Error updating menu:', error);
        throw error;
    }
};

export const deleteMenu = async (menuId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/menus/${menuId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete menu');
        }
        return data;
    } catch (error) {
        console.error('Error deleting menu:', error);
        throw error;
    }
};