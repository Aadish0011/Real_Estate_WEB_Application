# 🏠 Real Estate Website

> **👋 New to this? Start here:** [README_SIMPLE.md](README_SIMPLE.md) - Super simple guide for non-technical users!

A beautiful, minimalistic, and production-ready real estate website built with React and Vite. Features sharp, modern design with clean aesthetics and easy integration capabilities.

## ✨ Features

### Design
- **Minimalistic & Modern**: Clean design with sharp colors (#0066FF primary, #FF6B35 secondary)
- **Fully Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- **Smooth Animations**: Subtle transitions and hover effects
- **Professional UI/UX**: Modern typography and spacing

### Functionality
- **Property Listings**: Browse all properties with advanced filtering
- **Property Details**: Comprehensive property pages with image galleries
- **Search & Filter**: Filter by type, status, price, bedrooms, and location
- **Agent Information**: Each property includes agent contact details
- **Contact Forms**: Ready-to-integrate contact and inquiry forms
- **Map Integration Ready**: Placeholder for Google Maps/Mapbox integration

### Production-Ready Features
- **Structured Data**: Easy to integrate with APIs, databases, or CMS
- **Agent Profiles**: Complete agent information with photos and contact details
- **Property Metadata**: MLS numbers, taxes, HOA fees, coordinates, and more
- **Image Handling**: Optimized image structure ready for CDN integration
- **Utility Functions**: Formatters for prices, dates, phone numbers
- **Modular Code**: Clean, maintainable component structure

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
RealEstate/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── Navbar.css
│   │   ├── Footer.jsx           # Footer component
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx             # Homepage
│   │   ├── Home.css
│   │   ├── Properties.jsx      # Property listings
│   │   ├── Properties.css
│   │   ├── PropertyDetail.jsx  # Property detail page
│   │   ├── PropertyDetail.css
│   │   ├── About.jsx           # About page
│   │   ├── About.css
│   │   ├── Contact.jsx         # Contact page
│   │   └── Contact.css
│   ├── data/
│   │   └── properties.js       # Property data (replace with API)
│   ├── utils/
│   │   └── formatters.js       # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── App.css
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles & CSS variables
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔌 Production Integration Guide

### 1. Replace Static Data with API

**Current:** `src/data/properties.js` contains static data

**Production:** Replace with API calls:

```javascript
// Example: src/services/api.js
export const fetchProperties = async () => {
  const response = await fetch('https://your-api.com/properties')
  return response.json()
}

export const fetchPropertyById = async (id) => {
  const response = await fetch(`https://your-api.com/properties/${id}`)
  return response.json()
}
```

Then update `Properties.jsx` and `PropertyDetail.jsx` to use these functions.

### 2. Integrate Map Service

**Current:** Map placeholder in `PropertyDetail.jsx`

**Production:** Add Google Maps or Mapbox:

```javascript
// Example with Google Maps
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// In PropertyDetail component:
<LoadScript googleMapsApiKey="YOUR_API_KEY">
  <GoogleMap
    center={{ lat: property.coordinates.lat, lng: property.coordinates.lng }}
    zoom={15}
  >
    <Marker position={property.coordinates} />
  </GoogleMap>
</LoadScript>
```

### 3. Connect Contact Forms

**Current:** Forms show alerts

**Production:** Send to your backend:

```javascript
// Example: src/services/contact.js
export const submitInquiry = async (formData) => {
  const response = await fetch('https://your-api.com/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  return response.json()
}
```

### 4. Image Integration

**Current:** Uses Unsplash placeholder images

**Production:** Replace with your image URLs or CDN:

```javascript
// In properties data:
images: [
  'https://your-cdn.com/properties/123/image1.jpg',
  'https://your-cdn.com/properties/123/image2.jpg',
  // ...
]
```

### 5. Environment Variables

Create `.env` file for API keys and endpoints:

```env
VITE_API_URL=https://your-api.com
VITE_MAPS_API_KEY=your-google-maps-key
VITE_CDN_URL=https://your-cdn.com
```

Access in code: `import.meta.env.VITE_API_URL`

## 🎨 Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary: #0066FF;        /* Primary blue */
  --primary-dark: #0052CC;   /* Darker blue */
  --secondary: #FF6B35;      /* Orange accent */
  --accent: #00D4AA;        /* Teal accent */
  --dark: #0A0E27;           /* Dark text */
  /* ... */
}
```

### Typography

The site uses Inter font (loaded from Google Fonts). To change:

1. Update `index.html` with your font
2. Update `font-family` in `src/index.css`

### Property Data Structure

Each property should have:

```javascript
{
  id: Number,
  title: String,
  address: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  sqft: Number,
  type: String,
  status: String,
  description: String,
  images: Array<String>,
  features: Array<String>,
  yearBuilt: Number,
  lotSize: String,
  coordinates: { lat: Number, lng: Number },
  agent: {
    id: Number,
    name: String,
    email: String,
    phone: String,
    image: String,
    license: String
  },
  listingDate: String,
  mlsNumber: String,
  propertyTax: Number,
  hoaFee: Number,
  parking: Number,
  heating: String,
  cooling: String
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📦 Dependencies

- **React 18** - UI library
- **React Router DOM** - Routing
- **Vite** - Build tool

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available for use.

## 🤝 Support

For questions or support, please contact your development team.

---

**Built with ❤️ for modern real estate businesses**
