import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const navbarOpacity = useTransform(scrollY, [0, 100], [1, 0.95])
  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  const handleNavClick = (e, target) => {
    setIsOpen(false)
    e.preventDefault()
    
    // Map #about to #about-intro
    const actualTarget = target === '#about' ? '#about-intro' : target
    
    // If we're on a different page, navigate to home first
    if (location.pathname !== '/') {
      navigate(`/${actualTarget}`)
      // Wait for navigation, then scroll
      setTimeout(() => {
        scrollToSection(actualTarget)
      }, 300)
    } else {
      // If we're already on home page, scroll to section
      scrollToSection(actualTarget)
    }
  }

  const scrollToSection = (target) => {
    const element = document.querySelector(target)
    if (element) {
      const offset = 80 // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Handle hash navigation on page load
  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      setTimeout(() => {
        const target = location.hash === '#about' ? '#about-intro' : location.hash
        scrollToSection(target)
      }, 200)
    }
  }, [location.pathname, location.hash])

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      style={{ 
        opacity: navbarOpacity,
        backgroundColor: navbarBackground
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="nav-container">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/vk-logo.jpeg" alt="V.K. Real Estate" className="logo-image" />
            <span className="logo-line"></span>
            <span className="logo-subtext">Real Estate</span>
          </Link>
        </motion.div>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <motion.a 
            href="/#home" 
            className={`nav-link ${location.pathname === '/' && !location.hash ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '#home')}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Home
          </motion.a>
          <motion.a 
            href="#properties" 
            className={`nav-link ${location.pathname === '/properties' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '#properties')}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Properties
          </motion.a>
          <motion.a 
            href="/#about-intro" 
            className={`nav-link ${(location.pathname === '/about' || location.hash === '#about-intro') ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '#about')}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            About
          </motion.a>
          <motion.a 
            href="#contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '#contact')}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Contact
          </motion.a>
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              to="/properties" 
              className="nav-link nav-link-arrow"
              onClick={() => setIsOpen(false)}
            >
              All Properties →
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className={`nav-toggle ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar
