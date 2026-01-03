/**
 * Authentication utilities
 */
export const authUtils = {
  setToken: (token) => {
    localStorage.setItem('admin_token', token)
  },
  
  getToken: () => {
    return localStorage.getItem('admin_token')
  },
  
  removeToken: () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token')
  },
  
  setUser: (user) => {
    localStorage.setItem('admin_user', JSON.stringify(user))
  },
  
  getUser: () => {
    const user = localStorage.getItem('admin_user')
    return user ? JSON.parse(user) : null
  },
}

