import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { propertiesAPI } from '../utils/api'
import { formatPrice } from '../utils/formatters'
import './Properties.css'

const Properties = () => {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'all',
    search: '',
    category: categoryParam || 'all'
  })

  // Load properties from API
  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      setLoading(true)
      const data = await propertiesAPI.getProperties()
      setProperties(data.properties || [])
      setFilteredProperties(data.properties || [])
    } catch (error) {
      console.error('Error loading properties:', error)
      // Fallback to empty array if API fails
      setProperties([])
      setFilteredProperties([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
    applyFilters({ ...filters, [name]: value })
  }

  useEffect(() => {
    if (categoryParam && properties.length > 0) {
      const filterState = { 
        type: 'all',
        status: 'all',
        minPrice: '',
        maxPrice: '',
        bedrooms: 'all',
        search: '',
        category: categoryParam 
      }
      applyFilters(filterState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam, properties])

  const applyFilters = (filterState) => {
    let filtered = [...properties]

    if (filterState.search) {
      filtered = filtered.filter(prop =>
        prop.title.toLowerCase().includes(filterState.search.toLowerCase()) ||
        prop.address.toLowerCase().includes(filterState.search.toLowerCase())
      )
    }

    // Handle category filter (Commercial or Residential)
    if (filterState.category === 'commercial') {
      filtered = filtered.filter(prop => prop.type === 'Office' || prop.type === 'Showroom')
    } else if (filterState.category === 'residential') {
      filtered = filtered.filter(prop => prop.type === 'Apartment' || prop.type === 'House')
    }

    if (filterState.type !== 'all') {
      filtered = filtered.filter(prop => prop.type === filterState.type)
    }

    if (filterState.status !== 'all') {
      filtered = filtered.filter(prop => prop.status === filterState.status)
    }

    if (filterState.minPrice) {
      filtered = filtered.filter(prop => prop.price >= parseInt(filterState.minPrice))
    }

    if (filterState.maxPrice) {
      filtered = filtered.filter(prop => prop.price <= parseInt(filterState.maxPrice))
    }

    if (filterState.bedrooms !== 'all') {
      filtered = filtered.filter(prop => prop.bedrooms >= parseInt(filterState.bedrooms))
    }

    setFilteredProperties(filtered)
  }

  const clearFilters = () => {
    const resetFilters = {
      type: 'all',
      status: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'all',
      search: '',
      category: 'all'
    }
    setFilters(resetFilters)
    setFilteredProperties(properties)
  }

  return (
    <div className="properties-page">
      <div className="properties-header">
        <div className="container">
          <h1>All Properties</h1>
          <p>Discover your perfect home from our extensive collection</p>
        </div>
      </div>

      <div className="properties-content">
        <div className="container">
          <div className="properties-layout">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filters-header">
                <h2>Filters</h2>
                <button onClick={clearFilters} className="clear-filters">Clear</button>
              </div>

              <div className="filter-group">
                <label>Search</label>
                <input
                  type="text"
                  name="search"
                  placeholder="Search properties..."
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label>Property Type</label>
                <select name="type" value={filters.type} onChange={handleFilterChange}>
                  <option value="all">All Types</option>
                  <option value="House">House</option>
                  <option value="Showroom">Showroom</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Office">Office</option>
                  <option value="Loft">Loft</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Status</label>
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="all">All Status</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Bedrooms</label>
                <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
                  <option value="all">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label>Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </aside>

            {/* Properties Grid */}
            <main className="properties-main">
              <div className="properties-results">
                <p className="results-count">
                  {loading ? 'Loading...' : `${filteredProperties.length} ${filteredProperties.length === 1 ? 'property' : 'properties'} found`}
                </p>
              </div>

              {loading ? (
                <div className="loading-state">
                  <p>Loading properties...</p>
                </div>
              ) : filteredProperties.length > 0 ? (
                <div className="properties-grid">
                  {filteredProperties.map(property => (
                    <Link to={`/property/${property.id}`} key={property.id} className="property-card">
                      <div className="property-image">
                        <img 
                          src={property.images && property.images.length > 0 
                            ? `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${property.images[0]}` 
                            : 'https://via.placeholder.com/400x300?text=No+Image'} 
                          alt={property.title}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'
                          }}
                        />
                        <span className="property-status">{property.status}</span>
                        <div className="property-type">{property.type}</div>
                      </div>
                      <div className="property-info">
                        <h3>{property.title}</h3>
                        <p className="property-address">{property.address}</p>
                        <div className="property-details">
                          {property.bedrooms && <span>{property.bedrooms} Beds</span>}
                          {property.bathrooms && <span>{property.bathrooms} Baths</span>}
                          {property.sqft && <span>{property.sqft.toLocaleString()} sqft</span>}
                        </div>
                        <div className="property-footer">
                          <span className="property-price">Price Upon Request</span>
                          <a 
                            href={`https://wa.me/919811707082?text=Hello, I am interested in learning more about ${encodeURIComponent(property.title)} located at ${encodeURIComponent(property.address)}. Could you please provide more details?`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="whatsapp-icon-btn"
                            onClick={(e) => e.stopPropagation()}
                            title="Contact Owner"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>No properties found matching your criteria.</p>
                  <button onClick={clearFilters} className="btn btn-primary">Clear Filters</button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Properties
