/**
 * API client for backend communication
 */
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/api/admin/login', {
      username: username,
      password: password
    })
    return response.data
  },
  
  getCurrentAdmin: async () => {
    const response = await api.get('/api/admin/me')
    return response.data
  },
}

// Properties API
export const propertiesAPI = {
  // Public endpoints
  getProperties: async (params = {}) => {
    const response = await api.get('/api/properties', { params })
    return response.data
  },
  
  getProperty: async (id) => {
    const response = await api.get(`/api/properties/${id}`)
    return response.data
  },
  
  // Admin endpoints
  getAllProperties: async (params = {}) => {
    const response = await api.get('/api/admin/properties', { params })
    return response.data
  },
  
  getPropertyAdmin: async (id) => {
    const response = await api.get(`/api/admin/properties/${id}`)
    return response.data
  },
  
  createProperty: async (formData) => {
    const response = await api.post('/api/admin/properties', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  
  updateProperty: async (id, data) => {
    const response = await api.put(`/api/admin/properties/${id}`, data)
    return response.data
  },
  
  deleteProperty: async (id) => {
    const response = await api.delete(`/api/admin/properties/${id}`)
    return response.data
  },
  
  uploadImages: async (id, images) => {
    const formData = new FormData()
    images.forEach((image) => {
      formData.append('images', image)
    })
    
    const response = await api.post(`/api/admin/properties/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  
  deleteImage: async (id, imageIndex) => {
    const response = await api.delete(`/api/admin/properties/${id}/images/${imageIndex}`)
    return response.data
  },
}

export default api

