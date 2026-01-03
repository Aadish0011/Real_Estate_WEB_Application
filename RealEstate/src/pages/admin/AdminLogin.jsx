import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../../utils/api'
import { authUtils } from '../../utils/auth'
import './AdminLogin.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login(username, password)
      authUtils.setToken(response.access_token)
      
      // Get admin info
      const adminInfo = await authAPI.getCurrentAdmin()
      authUtils.setUser(adminInfo)
      
      navigate('/admin/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      const errorMessage = err.response?.data?.detail || err.message || 'Login failed. Please check your credentials.'
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <h1>V.K. Real Estate</h1>
          <h2>Admin Panel</h2>
          <p>Sign in to manage properties</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="admin-error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-admin-primary"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>© 2024 V.K. Real Estate. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin

