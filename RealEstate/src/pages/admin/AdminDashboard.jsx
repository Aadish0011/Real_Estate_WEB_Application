import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { propertiesAPI, authAPI } from '../../utils/api'
import { authUtils } from '../../utils/auth'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adminInfo, setAdminInfo] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [propertiesData, adminData] = await Promise.all([
        propertiesAPI.getAllProperties(),
        authAPI.getCurrentAdmin()
      ])
      setProperties(propertiesData.properties || [])
      setAdminInfo(adminData)
    } catch (err) {
      console.error('Load data error:', err)
      if (err.response?.status === 401) {
        handleLogout()
      } else {
        setError(err.response?.data?.detail || 'Failed to load data. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    authUtils.removeToken()
    navigate('/admin/login')
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return
    }

    try {
      await propertiesAPI.deleteProperty(id)
      setProperties(properties.filter(p => p.id !== id))
    } catch (err) {
      alert('Failed to delete property')
    }
  }

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'For Sale': 'status-sale',
      'For Rent': 'status-rent',
      'Sold': 'status-sold',
      'Hidden': 'status-hidden'
    }
    return statusMap[status] || 'status-default'
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-loading">Loading...</div>
      </div>
    )
  }

  if (error && properties.length === 0 && !loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-error-container">
          <h2>Error Loading Dashboard</h2>
          <p>{error}</p>
          <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
            <button onClick={() => window.location.reload()} className="btn-admin-primary">
              Reload Page
            </button>
            <button onClick={handleLogout} className="btn-admin-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your property listings</p>
          </div>
          <div className="admin-header-actions">
            {adminInfo && (
              <span className="admin-welcome">Welcome, {adminInfo.username}</span>
            )}
            <Link to="/admin/properties/new" className="btn-admin-primary">
              + Add New Property
            </Link>
            <button onClick={handleLogout} className="btn-admin-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {error && <div className="admin-error-message">{error}</div>}

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-value">{properties.length}</div>
            <div className="stat-label">Total Properties</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {properties.filter(p => p.status === 'For Sale').length}
            </div>
            <div className="stat-label">For Sale</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {properties.filter(p => p.status === 'For Rent').length}
            </div>
            <div className="stat-label">For Rent</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {properties.filter(p => p.status === 'Hidden').length}
            </div>
            <div className="stat-label">Hidden</div>
          </div>
        </div>

        <div className="admin-properties-table">
          <div className="table-header">
            <h2>Properties</h2>
            <Link to="/admin/properties/new" className="btn-admin-primary-small">
              + New Property
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="admin-empty-state">
              <p>No properties found. Create your first property!</p>
              <Link to="/admin/properties/new" className="btn-admin-primary">
                Add Property
              </Link>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Images</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>{property.id}</td>
                    <td>
                      <Link to={`/admin/properties/${property.id}`} className="property-link">
                        {property.title}
                      </Link>
                    </td>
                    <td>{property.type}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(property.status)}`}>
                        {property.status}
                      </span>
                    </td>
                    <td>
                      {property.price 
                        ? `₹${property.price.toLocaleString()}` 
                        : 'Price Upon Request'}
                    </td>
                    <td>{property.images?.length || 0} images</td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/admin/properties/${property.id}`}
                          className="btn-action btn-edit"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="btn-action btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

