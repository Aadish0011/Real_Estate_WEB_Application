import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { formatPrice, formatPhone } from '../utils/formatters'
import './PropertyDetail.css'
import { propertiesAPI, API_BASE_URL } from '../utils/api'




const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    loadProperty()
  }, [id])

  const loadProperty = async () => {
    try {
      setLoading(true)
      const data = await propertiesAPI.getProperty(parseInt(id))
      setProperty(data)
    } catch (error) {
      console.error('Error loading property:', error)
      // Fallback: try static data if API fails
      try {
        const { getPropertyById } = await import('../data/properties')
        const staticProperty = getPropertyById(id)
        setProperty(staticProperty)
      } catch {
        setProperty(null)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="property-detail">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
            Loading property...
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="property-detail">
        <div className="container">
          <div className="not-found">
            <h2>Property Not Found</h2>
            <p>The property you're looking for doesn't exist.</p>
            <Link to="/properties" className="btn btn-primary">Back to Properties</Link>
          </div>
        </div>
      </div>
    )
  }

  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to your API
    alert('Thank you for your inquiry! We will contact you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="property-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="property-detail-header">
          <div>
            <span className="property-status-badge">{property.status}</span>
            <h1>{property.title}</h1>
            <p className="property-address">{property.address}</p>
          </div>
          <div className="property-price-large">
            Price Upon Request
          </div>
        </div>

        <div className="property-detail-content">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image">
              <img 
                src={property.images && property.images.length > 0
                  ? `${API_BASE_URL}${property.images[currentImageIndex]}`
                  : 'https://via.placeholder.com/800x600?text=No+Image'} 
                alt={property.title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=No+Image'
                }}
              />
            </div>
            {property.images && property.images.length > 1 && (
              <div className="thumbnail-images">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${API_BASE_URL}${image}`}
                    alt={`${property.title} ${index + 1}`}
                    className={index === currentImageIndex ? 'active' : ''}
                    onClick={() => setCurrentImageIndex(index)}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x100?text=No+Image'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="property-detail-layout">
            {/* Main Content */}
            <div className="property-main-content">
              <div className="property-overview">
                <h2>Overview</h2>
                <div className="property-stats">
                  {property.bedrooms && (
                    <div className="stat">
                      <span className="stat-label">Bedrooms</span>
                      <span className="stat-value">{property.bedrooms}</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="stat">
                      <span className="stat-label">Bathrooms</span>
                      <span className="stat-value">{property.bathrooms}</span>
                    </div>
                  )}
                  {property.sqft && (
                    <div className="stat">
                      <span className="stat-label">Square Feet</span>
                      <span className="stat-value">{property.sqft.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="stat">
                    <span className="stat-label">Type</span>
                    <span className="stat-value">{property.type}</span>
                  </div>
                  {property.year_built && (
                    <div className="stat">
                      <span className="stat-label">Year Built</span>
                      <span className="stat-value">{property.year_built}</span>
                    </div>
                  )}
                  {property.lot_size && (
                    <div className="stat">
                      <span className="stat-label">Lot Size</span>
                      <span className="stat-value">{property.lot_size}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="property-description">
                <h2>Description</h2>
                <p>{property.description}</p>
              </div>

              {property.features && property.features.length > 0 && (
                <div className="property-features">
                  <h2>Features</h2>
                  <div className="features-grid">
                    {property.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map Placeholder - Ready for Google Maps or Mapbox integration */}
              {(property.coordinates_lat && property.coordinates_lng) && (
                <div className="property-map">
                  <h2>Location</h2>
                  <div className="map-placeholder">
                    <p>📍 Map integration ready</p>
                    <p className="map-note">Replace this with your map component (Google Maps, Mapbox, etc.)</p>
                    <p className="map-coords">Coordinates: {property.coordinates_lat}, {property.coordinates_lng}</p>
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="property-additional">
                <h2>Additional Details</h2>
                <div className="additional-grid">
                  {property.property_tax && (
                    <div className="additional-item">
                      <span className="additional-label">Property Tax</span>
                      <span className="additional-value">{formatPrice(property.property_tax)}/year</span>
                    </div>
                  )}
                  {property.hoa_fee !== undefined && (
                    <div className="additional-item">
                      <span className="additional-label">
                        Maintenance Fee
                        <span className="info-tooltip" title="Monthly maintenance fee for common area upkeep, security, and amenities"> ℹ️</span>
                      </span>
                      <span className="additional-value">
                        {property.hoa_fee > 0 ? formatPrice(property.hoa_fee) + '/month' : 'None'}
                      </span>
                    </div>
                  )}
                  {property.parking && (
                    <div className="additional-item">
                      <span className="additional-label">Parking</span>
                      <span className="additional-value">{property.parking} spaces</span>
                    </div>
                  )}
                  {property.heating && (
                    <div className="additional-item">
                      <span className="additional-label">Heating</span>
                      <span className="additional-value">{property.heating}</span>
                    </div>
                  )}
                  {property.cooling && (
                    <div className="additional-item">
                      <span className="additional-label">Cooling</span>
                      <span className="additional-value">{property.cooling}</span>
                    </div>
                  )}
                  {property.mls_number && (
                    <div className="additional-item">
                      <span className="additional-label">MLS Number</span>
                      <span className="additional-value">{property.mls_number}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="property-sidebar">
              {/* Agent Card */}
              <div className="agent-card">
                <h3>Listing Agent</h3>
                <div className="agent-info">
                  <div className="agent-details">
                    <h4>Mr. Vikas Kapoor</h4>
                    <p className="agent-title">Partner</p>
                    <p className="agent-address">📍 7A/42 W.E.A Karol Bagh, New Delhi-110005</p>
                  </div>
                </div>
                <div className="agent-contact">
                  <a href="tel:+919811707082" className="agent-phone">
                    📞 +91 9811707082
                  </a>
                  <a href="https://wa.me/919811707082" target="_blank" rel="noopener noreferrer" className="agent-whatsapp">
                    💬 WhatsApp
                  </a>
                  <a href="mailto:Estatesvk@gmail.com" className="agent-email">
                    ✉️ Estatesvk@gmail.com
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-card">
                <h3>Schedule a Viewing</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Property Info Card */}
              <div className="property-info-card">
                <h3>Property Information</h3>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value">{property.status}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Type</span>
                  <span className="info-value">{property.type}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Price</span>
                  <span className="info-value">Price Upon Request</span>
                </div>
                {property.listing_date && (
                  <div className="info-item">
                    <span className="info-label">Listed</span>
                    <span className="info-value">{property.listing_date}</span>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
