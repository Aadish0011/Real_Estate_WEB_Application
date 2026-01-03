import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import PropertyForm from './pages/admin/PropertyForm'
import ProtectedRoute from './components/admin/ProtectedRoute'
import './App.css'

// Component to handle hash scrolling
const ScrollToHash = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      // Map #about to #about-intro
      const target = location.hash === '#about' ? '#about-intro' : location.hash
      const element = document.querySelector(target)
      if (element) {
        setTimeout(() => {
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }, 300)
      }
    } else if (location.pathname === '/' && !location.hash) {
      // Scroll to top when on home page without hash
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname, location.hash])

  return null
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToHash />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
              <WhatsAppButton />
            </>
          } />
          <Route path="/properties" element={
            <>
              <Navbar />
              <Properties />
              <Footer />
              <WhatsAppButton />
            </>
          } />
          <Route path="/property/:id" element={
            <>
              <Navbar />
              <PropertyDetail />
              <Footer />
              <WhatsAppButton />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
              <Footer />
              <WhatsAppButton />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
              <Footer />
              <WhatsAppButton />
            </>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/properties/new" element={
            <ProtectedRoute>
              <PropertyForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/properties/:id" element={
            <ProtectedRoute>
              <PropertyForm />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App

