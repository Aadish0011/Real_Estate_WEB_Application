import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { propertiesAPI } from '../../utils/api'
import './PropertyForm.css'

const PropertyForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageFiles, setImageFiles] = useState([])
  const [existingImages, setExistingImages] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    type: 'Apartment',
    status: 'For Sale',
    description: '',
    features: '',
    year_built: '',
    lot_size: '',
    coordinates_lat: '',
    coordinates_lng: '',
    listing_date: '',
    mls_number: '',
    property_tax: '',
    hoa_fee: '',
    parking: '',
    heating: '',
    cooling: '',
  })

  useEffect(() => {
    if (isEdit) {
      loadProperty()
    }
  }, [id])

  const loadProperty = async () => {
    try {
      setLoading(true)
      const property = await propertiesAPI.getPropertyAdmin(id)
      
      setFormData({
        title: property.title || '',
        address: property.address || '',
        price: property.price || '',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        sqft: property.sqft || '',
        type: property.type || 'Apartment',
        status: property.status || 'For Sale',
        description: property.description || '',
        features: property.features ? property.features.join(', ') : '',
        year_built: property.year_built || '',
        lot_size: property.lot_size || '',
        coordinates_lat: property.coordinates_lat || '',
        coordinates_lng: property.coordinates_lng || '',
        listing_date: property.listing_date || '',
        mls_number: property.mls_number || '',
        property_tax: property.property_tax || '',
        hoa_fee: property.hoa_fee || '',
        parking: property.parking || '',
        heating: property.heating || '',
        cooling: property.cooling || '',
      })
      
      setExistingImages(property.images || [])
    } catch (err) {
      setError('Failed to load property')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(prev => [...prev, ...files])
  }

  const removeImageFile = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = async (imageIndex) => {
    try {
      await propertiesAPI.deleteImage(id, imageIndex)
      setExistingImages(prev => prev.filter((_, i) => i !== imageIndex))
    } catch (err) {
      alert('Failed to delete image')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        const value = formData[key]
        if (value !== '' && value !== null && value !== undefined) {
          if (key === 'features') {
            // Convert features string to JSON array
            const featuresArray = value.split(',').map(f => f.trim()).filter(f => f)
            formDataToSend.append('features', JSON.stringify(featuresArray))
          } else if (['price', 'bedrooms', 'bathrooms', 'sqft', 'year_built', 'property_tax', 'hoa_fee', 'parking', 'coordinates_lat', 'coordinates_lng'].includes(key)) {
            // Convert numeric fields
            const numValue = parseFloat(value)
            if (!isNaN(numValue)) {
              formDataToSend.append(key, numValue)
            }
          } else {
            formDataToSend.append(key, value)
          }
        }
      })

      // Add images for new properties
      if (!isEdit && imageFiles.length > 0) {
        imageFiles.forEach(file => {
          formDataToSend.append('images', file)
        })
      }

      if (isEdit) {
        // Update existing property
        const updateData = {}
        Object.keys(formData).forEach(key => {
          const value = formData[key]
          if (value !== '' && value !== null && value !== undefined) {
            if (key === 'features') {
              updateData[key] = value.split(',').map(f => f.trim()).filter(f => f)
            } else if (['price', 'bedrooms', 'bathrooms', 'sqft', 'year_built', 'property_tax', 'hoa_fee', 'parking', 'coordinates_lat', 'coordinates_lng'].includes(key)) {
              const numValue = parseFloat(value)
              if (!isNaN(numValue)) {
                updateData[key] = numValue
              }
            } else {
              updateData[key] = value
            }
          }
        })
        
        await propertiesAPI.updateProperty(id, updateData)
        
        // Upload new images if any
        if (imageFiles.length > 0) {
          await propertiesAPI.uploadImages(id, imageFiles)
        }
      } else {
        // Create new property
        await propertiesAPI.createProperty(formDataToSend)
      }

      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save property')
    } finally {
      setLoading(false)
    }
  }

  if (loading && isEdit) {
    return (
      <div className="property-form-container">
        <div className="admin-loading">Loading property...</div>
      </div>
    )
  }

  return (
    <div className="property-form-container">
      <div className="property-form-header">
        <h1>{isEdit ? 'Edit Property' : 'Add New Property'}</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="btn-admin-secondary">
          ← Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        {error && <div className="admin-error-message">{error}</div>}

        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Modern Luxury Apartment"
              />
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Full address"
              />
            </div>

            <div className="form-group">
              <label>Property Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Office">Office</option>
                <option value="Showroom">Showroom</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Loft">Loft</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Sold">Sold</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (leave empty for "Price Upon Request")</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 2500000"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Property description..."
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Property Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="e.g., 3"
              />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="e.g., 2"
              />
            </div>

            <div className="form-group">
              <label>Square Feet</label>
              <input
                type="number"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                placeholder="e.g., 2500"
              />
            </div>

            <div className="form-group">
              <label>Year Built</label>
              <input
                type="number"
                name="year_built"
                value={formData.year_built}
                onChange={handleChange}
                placeholder="e.g., 2020"
              />
            </div>

            <div className="form-group">
              <label>Lot Size</label>
              <input
                type="text"
                name="lot_size"
                value={formData.lot_size}
                onChange={handleChange}
                placeholder="e.g., 0.5 acres"
              />
            </div>

            <div className="form-group">
              <label>Parking Spaces</label>
              <input
                type="number"
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                placeholder="e.g., 2"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Additional Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Features (comma-separated)</label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="e.g., Swimming Pool, Garage, Garden"
              />
            </div>

            <div className="form-group">
              <label>Heating</label>
              <input
                type="text"
                name="heating"
                value={formData.heating}
                onChange={handleChange}
                placeholder="e.g., Central Air"
              />
            </div>

            <div className="form-group">
              <label>Cooling</label>
              <input
                type="text"
                name="cooling"
                value={formData.cooling}
                onChange={handleChange}
                placeholder="e.g., Central Air"
              />
            </div>

            <div className="form-group">
              <label>Listing Date</label>
              <input
                type="date"
                name="listing_date"
                value={formData.listing_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>MLS Number</label>
              <input
                type="text"
                name="mls_number"
                value={formData.mls_number}
                onChange={handleChange}
                placeholder="e.g., MLS-2024-001"
              />
            </div>

            <div className="form-group">
              <label>Property Tax (per year)</label>
              <input
                type="number"
                name="property_tax"
                value={formData.property_tax}
                onChange={handleChange}
                placeholder="e.g., 18500"
              />
            </div>

            <div className="form-group">
              <label>Maintenance Fee (per month) <span style={{fontSize: '0.85rem', color: '#64748b', fontWeight: 'normal'}}>- Monthly fee for common area maintenance, security, and amenities</span></label>
              <input
                type="number"
                name="hoa_fee"
                value={formData.hoa_fee}
                onChange={handleChange}
                placeholder="e.g., 450"
              />
            </div>

            <div className="form-group">
              <label>Latitude</label>
              <input
                type="number"
                step="any"
                name="coordinates_lat"
                value={formData.coordinates_lat}
                onChange={handleChange}
                placeholder="e.g., 28.6139"
              />
            </div>

            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                step="any"
                name="coordinates_lng"
                value={formData.coordinates_lng}
                onChange={handleChange}
                placeholder="e.g., 77.2090"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Images</h2>
          
          {existingImages.length > 0 && (
            <div className="existing-images">
              <h3>Existing Images</h3>
              <div className="image-grid">
                {existingImages.map((imageUrl, index) => (
                  <div key={index} className="image-preview">
                    <img 
                      src={`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${imageUrl}`} 
                      alt={`Property ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200'
                      }}
                    />
                    {isEdit && (
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="btn-remove-image"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <label>{isEdit ? 'Add More Images' : 'Upload Images'}</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <p className="form-hint">You can select multiple images. Max 10MB per image.</p>
          </div>

          {imageFiles.length > 0 && (
            <div className="new-images">
              <h3>New Images to Upload</h3>
              <div className="image-grid">
                {imageFiles.map((file, index) => (
                  <div key={index} className="image-preview">
                    <img src={URL.createObjectURL(file)} alt={`New ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => removeImageFile(index)}
                      className="btn-remove-image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="btn-admin-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-admin-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEdit ? 'Update Property' : 'Create Property'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PropertyForm

