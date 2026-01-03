import { Link } from 'react-router-dom'
import { propertiesAPI } from '../utils/api'
import { formatPrice } from '../utils/formatters'
import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { fadeInUp, fadeInUpDelay, staggerContainer, hoverLift } from '../utils/animations'
import './Home.css'

const Home = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      const data = await propertiesAPI.getProperties({ limit: 6 })
      setProperties(data.properties || [])
    } catch (error) {
      console.error('Error loading properties:', error)
      // Fallback: try to use static data if API fails
      try {
        const { properties: staticProperties } = await import('../data/properties')
        setProperties(staticProperties.slice(0, 6))
      } catch {
        setProperties([])
      }
    } finally {
      setLoading(false)
    }
  }

  const featuredProperties = properties.slice(0, 6)
  const [formData, setFormData] = useState({
    title: 'Mr',
    name: '',
    email: '',
    phone: '',
    howFound: 'Website',
    interest: 'Sale',
    message: ''
  })

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Calculate property counts by type
  const propertyCounts = {
    Apartment: properties.filter(p => p.type === 'Apartment').length,
    House: properties.filter(p => p.type === 'House').length,
    Office: properties.filter(p => p.type === 'Office').length,
    Showroom: properties.filter(p => p.type === 'Showroom').length,
    Commercial: properties.filter(p => p.type === 'Office' || p.type === 'Showroom').length,
    Residential: properties.filter(p => p.type === 'Apartment' || p.type === 'House').length,
  }

  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({
      title: 'Mr',
      name: '',
      email: '',
      phone: '',
      howFound: 'Website',
      interest: 'Sale',
      message: ''
    })
  }

  return (
    <div className="home">
      {/* Hero Section with Parallax */}
      <section id="home" className="hero" ref={heroRef}>
        <motion.div 
          className="hero-bg-image"
          style={{ y, opacity }}
        />
        <div className="hero-overlay"></div>
        
        {/* Architectural grid overlay */}
        <div className="hero-grid"></div>
        
        {/* Architectural lines */}
        <div className="hero-lines">
          <div className="arch-line arch-line-horizontal" style={{ top: '20%' }}></div>
          <div className="arch-line arch-line-horizontal" style={{ top: '50%' }}></div>
          <div className="arch-line arch-line-horizontal" style={{ top: '80%' }}></div>
          <div className="arch-line arch-line-vertical" style={{ left: '10%' }}></div>
          <div className="arch-line arch-line-vertical" style={{ left: '50%' }}></div>
          <div className="arch-line arch-line-vertical" style={{ right: '10%' }}></div>
        </div>

        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Real Estate built on trust,
              <br />
              <span className="accent-text">defined by value.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hero-subtitle"
            >
              Looking To Buy or Rent a Property?<br />
              Find Your Dream Property With Us!
            </motion.p>
            <motion.div 
              className="hero-search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="hero-search-filters">
                <select>
                  <option>All Locations</option>
                  <option>Central Delhi</option>
                  <option>New Delhi</option>
                  <option>South Delhi</option>
                  <option>North Delhi</option>
                  <option>East Delhi</option>
                  <option>West Delhi</option>
                  <option>South West Delhi</option>
                  <option>North West Delhi</option>
                  <option>North East Delhi</option>
                  <option>South East Delhi</option>
                  <option>Karol Bagh</option>
                  <option>Connaught Place</option>
                  <option>Greater Kailash</option>
                  <option>Vasant Kunj</option>
                  <option>Dwarka</option>
                  <option>Rohini</option>
                  <option>Pitampura</option>
                  <option>Rajouri Garden</option>
                  <option>Janakpuri</option>
                  <option>Lajpat Nagar</option>
                  <option>Defence Colony</option>
                  <option>Gurgaon</option>
                  <option>Noida</option>
                </select>
                <select>
                  <option>All Status</option>
                  <option>For Rent</option>
                  <option>For Sale</option>
                </select>
                <select>
                  <option>All Types</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Office</option>
                  <option>Showroom</option>
                </select>
                <motion.button 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Search
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Intro Section */}
      <SectionWrapper id="about-intro" className="about-intro-section">
        <div className="container">
          <motion.div 
            className="about-intro-content"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={fadeInUp}>About Us</motion.h2>
            <motion.p variants={fadeInUp}>
              We are a Real Estate advisory and transaction support practice built on one simple belief: property decisions are not just financial, they are deeply personal. Whether it is a first investment, a long-held family asset, or a strategic business move, we understand the responsibility that comes with advising on Real Estate.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Our work is rooted in clarity, diligence, and care. We go beyond facilitating transactions to ensure that every property we advise on is reviewed with attention to legal compliance, practical realities, and long-term implications. By identifying risks early and explaining them transparently, we help our clients move forward with confidence and peace of mind.
            </motion.p>
            <motion.p variants={fadeInUp}>
              We support clients across the entire Real Estate journey from acquisition and sale to leasing, structuring, and documentation with particular experience in commercial and high-value assets. Throughout the process, we prioritise clear communication, timely execution, and honest guidance, so our clients always know where they stand.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Trust is earned through consistency and integrity. We treat every mandate with discretion, respect, and a genuine sense of responsibility, recognising that behind every transaction is a person, a vision, or a future plan. Our goal is not just to close deals, but to build lasting relationships by making Real Estate decisions safer, smoother, and more reassuring.
            </motion.p>
          </motion.div>
        </div>
      </SectionWrapper>

          {/* Featured Properties */}
          <SectionWrapper id="properties" className="featured-section">
            <div className="container">
              <motion.div 
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2>Featured Properties</h2>
                <p className="section-subtitle">Exclusive Listings Handpicked by Our Expert Real Estate Agents</p>
              </motion.div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                  Loading properties...
                </div>
              ) : featuredProperties.length > 0 ? (
                <div className="properties-slider-container">
                  <button 
                    className="slider-arrow slider-arrow-left"
                    onClick={() => {
                      const newIndex = currentSlide > 0 ? currentSlide - 1 : Math.max(0, featuredProperties.length - 3)
                      setCurrentSlide(newIndex)
                    }}
                    aria-label="Previous properties"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="properties-slider" ref={sliderRef}>
                    <div 
                      className="properties-slider-track"
                      style={{
                        transform: `translateX(-${currentSlide * (100 / 3)}%)`
                      }}
                    >
                      {featuredProperties.map((property, index) => (
                        <PropertyCard key={property.id} property={property} index={index} />
                      ))}
                    </div>
                  </div>
                  <button 
                    className="slider-arrow slider-arrow-right"
                    onClick={() => {
                      const maxSlide = Math.max(0, featuredProperties.length - 3)
                      const newIndex = currentSlide < maxSlide ? currentSlide + 1 : 0
                      setCurrentSlide(newIndex)
                    }}
                    aria-label="Next properties"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                  No properties available at the moment.
                </div>
              )}
          <motion.div 
            className="section-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/properties" className="btn btn-outline">View All Properties</Link>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Property Categories */}
      <SectionWrapper id="categories" className="categories-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Browse Listings By Categories</h2>
            <p className="section-subtitle" style={{ marginBottom: '0.5rem' }}>Curated by expert Real Estate agents!</p>
          </motion.div>
          <motion.div 
            className="categories-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {Object.entries(propertyCounts).map(([type, count], index) => (
              <CategoryCard key={type} type={type} count={count} index={index} />
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Services Section */}
      <SectionWrapper id="services" className="services-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Services</h2>
            <p className="section-subtitle">Tailored Solutions by Expert Real Estate Agents</p>
          </motion.div>
          <motion.div 
            className="services-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <ServiceCard 
              icon="🏘️"
              title="Buy Or Sell Property"
              description="Expert assistance in buying or selling your property with the best deals and market insights."
              link="/properties"
            />
            <ServiceCard 
              icon="🔑"
              title="Rent Or Lease Property"
              description="Find the perfect rental property or lease your property to the right tenants."
              link="/properties"
            />
            <ServiceCard 
              icon="🏢"
              title="Commercial Properties"
              description="Premium commercial spaces for offices, retail, and business establishments."
              link="/properties"
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Statistics Section */}
      <SectionWrapper id="stats" className="stats-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Delivering Results For Over 30 Years</h2>
            <p className="section-subtitle">Trusted Real Estate Agents at Your Service!</p>
          </motion.div>
          <motion.div 
            className="stats-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <StatCard number="500+" label="Properties Sold" />
            <StatCard number="300+" label="Properties Leased" />
            <StatCard number="15+" label="Real Estate Awards" />
            <StatCard number="50+" label="Collaborations" />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper id="testimonials" className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Clients Testimonials</h2>
            <p className="section-subtitle">How Our Real Estate Agents Deliver Excellence!</p>
          </motion.div>
          <motion.div 
            className="testimonials-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <TestimonialCard 
              text="Recently we had the pleasure of working with V.K. Real Estate. From the initial meeting to discuss the sale of our property, through the staging and marketing advice and final sale, we felt informed, supported and constantly in the loop."
              author="Sushmita Bedi"
              role="Designer"
            />
            <TestimonialCard 
              text="We had a good experience buying our first home with V.K. Real Estate. We dealt primarily with the team who was great. Always friendly, helpful, transparent and professional."
              author="Dr. Amrit Juneja"
              role="Doctor"
            />
            <TestimonialCard 
              text="I chose V.K. Real Estate because they had done such a great job previously and I wasn't disappointed. The property went on the market just about the time that the market was slowing down, sales were taking longer."
              author="Rajesh Manglani"
              role="Businessman"
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Contact Section */}
      <SectionWrapper id="contact" className="contact-section-home">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Get In Touch With Us</h2>
            <p className="section-subtitle">Get Real Help From The Best Real Estate Agent!</p>
          </motion.div>
          <motion.div 
            className="contact-layout-home"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactInfo />
            <ContactForm formData={formData} handleFormChange={handleFormChange} handleSubmit={handleSubmit} />
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  )
}

// Reusable Components
const SectionWrapper = ({ id, className, children }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  )
}

const PropertyCard = ({ property, index }) => {
  const imageUrl = property.images && property.images.length > 0
    ? `${import.meta.env.VITE_API_Base_URL || 'http://localhost:8000'}${property.images[0]}`
    : 'https://via.placeholder.com/400x300?text=No+Image'

  return (
    <motion.div
      variants={fadeInUpDelay(index * 0.1)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/property/${property.id}`} className="property-card">
        <div className="property-image">
          <img 
            src={imageUrl} 
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
    </motion.div>
  )
}

const CategoryCard = ({ type, count, index }) => {
  const icons = {
    Apartment: '🏢',
    House: '🏠',
    Office: '🏛️',
    Showroom: '🏪',
    Commercial: '🏢',
    Residential: '🏘️'
  }

  return (
    <motion.div
      variants={fadeInUpDelay(index * 0.1)}
      transition={{ duration: 0.3 }}
    >
      <Link 
        to={`/properties?${
          type === 'Commercial' 
            ? 'category=commercial' 
            : type === 'Residential' 
            ? 'category=residential' 
            : `type=${type}`
        }`} 
        className="category-card"
      >
        <div className="category-icon-wrapper">
          <span className="category-icon">{icons[type] || '🏠'}</span>
        </div>
        <h3>{type}</h3>
        <p className="category-count">{count} {count === 1 ? 'Property' : 'Properties'}</p>
      </Link>
    </motion.div>
  )
}

const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="service-card"
    >
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className="service-link">Learn more →</Link>
    </motion.div>
  )
}

const StatCard = ({ number, label }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="stat-card"
    >
      <motion.div 
        className="stat-number"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {number}
      </motion.div>
      <div className="stat-label">{label}</div>
    </motion.div>
  )
}

const TestimonialCard = ({ text, author, role }) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="testimonial-card"
    >
      <div className="testimonial-content">
        <p>"{text}"</p>
      </div>
      <div className="testimonial-author">
        <div className="author-name">{author}</div>
        <div className="author-role">{role}</div>
      </div>
    </motion.div>
  )
}

const ContactInfo = () => {
  return (
    <motion.div 
      className="contact-info-home"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3>Get in Touch</h3>
      <p>
        Have questions about a property? Want to schedule a viewing? 
        Our team is here to help you find your dream home.
      </p>
      <div className="contact-details-home">
        <ContactItem icon="👤" title="Partner" content="Mr. Vikas Kapoor" />
        <ContactItem icon="📍" title="Address" content="7A/42 W.E.A Karol Bagh<br />New Delhi-110005" />
        <ContactItem icon="📞" title="Mobile / WhatsApp" content="+91 9811707082" link="+919811707082" linkType="tel" />
        <ContactItem icon="✉️" title="Email" content="Estatesvk@gmail.com" link="Estatesvk@gmail.com" linkType="mailto" />
      </div>
    </motion.div>
  )
}

const ContactItem = ({ icon, title, content, link, linkType }) => {
  const contentElement = link ? (
    linkType === 'tel' ? (
      <a href={`tel:${link}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
      </a>
    ) : linkType === 'mailto' ? (
      <a href={`mailto:${link}`} style={{ color: 'inherit', textDecoration: 'none' }}>
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
      </a>
    ) : (
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    )
  ) : (
    <p dangerouslySetInnerHTML={{ __html: content }}></p>
  )

  return (
    <motion.div 
      className="contact-item-home"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="contact-icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        {contentElement}
      </div>
    </motion.div>
  )
}

const ContactForm = ({ formData, handleFormChange, handleSubmit }) => {
  return (
    <motion.div 
      className="contact-form-home"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3>Send us a Message</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <select name="title" value={formData.title} onChange={handleFormChange} required>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>
        </div>
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
          <label>How did you find us?</label>
          <select name="howFound" value={formData.howFound} onChange={handleFormChange} required>
            <option value="Word of Mouth">Word of Mouth</option>
            <option value="Website">Website</option>
            <option value="Social Media">Social Media</option>
            <option value="Online Advertisement">Online Advertisement</option>
          </select>
        </div>
        <div className="form-group">
          <label>Interested In</label>
          <select name="interest" value={formData.interest} onChange={handleFormChange} required>
            <option value="Sale">Sale</option>
            <option value="Purchase">Purchase</option>
            <option value="Rent">Rent</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleFormChange}
            required
          ></textarea>
        </div>
        <motion.button 
          type="submit" 
          className="btn btn-primary btn-block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit
        </motion.button>
      </form>
    </motion.div>
  )
}

export default Home
