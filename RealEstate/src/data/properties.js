// Production-ready property data structure
// Easy to integrate with APIs, databases, or CMS
// Simply replace this with your API endpoint or database queries

export const properties = [
  {
    id: 1,
    title: "Modern Luxury Office",
    address: "123 Ocean Drive, Miami Beach, FL 33139",
    price: 2500000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3500,
    type: "Office",
    status: "For Sale",
    description: "Stunning modern office space with premium amenities and state-of-the-art facilities. Perfect for businesses seeking luxury workspace with open-concept design and premium finishes throughout.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=90",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=90",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1400&q=90",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1400&q=90",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1400&q=90",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=90",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=90"
    ],
    features: ["Swimming Pool", "Ocean View", "Garage", "Garden", "Modern Kitchen", "Smart Home"],
    yearBuilt: 2020,
    lotSize: "0.5 acres",
    // Map integration ready
    coordinates: {
      lat: 25.7907,
      lng: -80.1300
    },
    // Agent information
    agent: {
      id: 1,
      name: "Mr. Vikas Kapoor",
      title: "Partner",
      email: "Estatesvk@gmail.com",
      phone: "+91 9811707082",
      whatsapp: "+91 9811707082",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      address: "7A/42 W.E.A Karol Bagh, New Delhi-110005"
    },
    // Additional metadata for production
    listingDate: "2024-01-15",
    mlsNumber: "MLS-2024-001",
    propertyTax: 18500,
    hoaFee: 450,
    parking: 2,
    heating: "Central Air",
    cooling: "Central Air"
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    address: "456 Skyline Ave, New York, NY 10001",
    price: 3200000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2800,
    type: "Penthouse",
    status: "For Sale",
    description: "Elegant penthouse in the heart of downtown with panoramic city views and premium finishes throughout. Features floor-to-ceiling windows and private elevator access.",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=90",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=90",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1400&q=90",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=90",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1400&q=90",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&q=90",
      "https://images.unsplash.com/photo-1600585152915-d0bec0a6c5c3?w=1400&q=90"
    ],
    features: ["City View", "Rooftop Terrace", "Concierge", "Gym Access", "Parking", "Private Elevator"],
    yearBuilt: 2018,
    lotSize: "N/A",
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    },
    agent: {
      id: 1,
      name: "Mr. Vikas Kapoor",
      title: "Partner",
      email: "Estatesvk@gmail.com",
      phone: "+91 9811707082",
      whatsapp: "+91 9811707082",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      address: "7A/42 W.E.A Karol Bagh, New Delhi-110005"
    },
    listingDate: "2024-01-20",
    mlsNumber: "MLS-2024-002",
    propertyTax: 28500,
    hoaFee: 1200,
    parking: 1,
    heating: "Central Air",
    cooling: "Central Air"
  },
  {
    id: 3,
    title: "Cozy Family Home",
    address: "789 Maple Street, Portland, OR 97201",
    price: 485000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    type: "House",
    status: "For Sale",
    description: "Beautiful family home in a quiet neighborhood with spacious rooms and a large backyard perfect for kids. Recently renovated with modern amenities while maintaining classic charm.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152915-d0bec0a6c5c3?w=1200&q=80"
    ],
    features: ["Large Yard", "Fireplace", "Garage", "Updated Kitchen", "Hardwood Floors", "Energy Efficient"],
    yearBuilt: 2015,
    lotSize: "0.3 acres",
    coordinates: {
      lat: 45.5152,
      lng: -122.6784
    },
    agent: {
      id: 1,
      name: "Mr. Vikas Kapoor",
      title: "Partner",
      email: "Estatesvk@gmail.com",
      phone: "+91 9811707082",
      whatsapp: "+91 9811707082",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      address: "7A/42 W.E.A Karol Bagh, New Delhi-110005"
    },
    listingDate: "2024-02-01",
    mlsNumber: "MLS-2024-003",
    propertyTax: 6200,
    hoaFee: 0,
    parking: 2,
    heating: "Forced Air",
    cooling: "Central Air"
  },
  {
    id: 4,
    title: "Beachfront Showroom",
    address: "321 Coastal Blvd, San Diego, CA 92101",
    price: 895000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    type: "Showroom",
    status: "For Sale",
    description: "Stunning beachfront showroom with prime location and excellent visibility. Modern design with premium finishes and professional amenities perfect for retail businesses.",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80"
    ],
    features: ["Beach Access", "Ocean View", "Balcony", "Pool", "Fitness Center", "Concierge"],
    yearBuilt: 2019,
    lotSize: "N/A",
    coordinates: {
      lat: 32.7157,
      lng: -117.1611
    },
    agent: {
      id: 1,
      name: "Mr. Vikas Kapoor",
      title: "Partner",
      email: "Estatesvk@gmail.com",
      phone: "+91 9811707082",
      whatsapp: "+91 9811707082",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      address: "7A/42 W.E.A Karol Bagh, New Delhi-110005"
    },
    listingDate: "2024-02-10",
    mlsNumber: "MLS-2024-004",
    propertyTax: 11200,
    hoaFee: 650,
    parking: 1,
    heating: "Central Air",
    cooling: "Central Air"
  },
  {
    id: 5,
    title: "Mountain Retreat",
    address: "654 Pine Mountain Road, Aspen, CO 81611",
    price: 1850000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    type: "House",
    status: "For Sale",
    description: "Luxurious mountain retreat with ski-in/ski-out access, hot tub, and stunning mountain vistas. Perfect for year-round mountain living with modern luxury amenities.",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
    ],
    features: ["Mountain View", "Hot Tub", "Fireplace", "Ski Access", "Large Deck", "Wine Cellar"],
    yearBuilt: 2017,
    lotSize: "1.2 acres",
    coordinates: {
      lat: 39.1911,
      lng: -106.8175
    },
    agent: {
      id: 1,
      name: "Mr. Vikas Kapoor",
      title: "Partner",
      email: "Estatesvk@gmail.com",
      phone: "+91 9811707082",
      whatsapp: "+91 9811707082",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
      address: "7A/42 W.E.A Karol Bagh, New Delhi-110005"
    },
    listingDate: "2024-01-25",
    mlsNumber: "MLS-2024-005",
    propertyTax: 14200,
    hoaFee: 0,
    parking: 3,
    heating: "Radiant Floor",
    cooling: "None"
  },
  {
    id: 6,
    title: "Urban Loft",
    address: "987 Industrial Way, Seattle, WA 98101",
    price: 625000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1800,
    type: "Loft",
    status: "For Rent",
    monthlyRent: 3200,
    description: "Converted industrial loft with high ceilings, exposed brick, and modern amenities in the heart of the city. Perfect for urban professionals seeking style and convenience.",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152915-d0bec0a6c5c3?w=1200&q=80"
    ],
    features: ["High Ceilings", "Exposed Brick", "Modern Kitchen", "City View", "Parking", "Walkable"],
    yearBuilt: 1920,
    lotSize: "N/A",
    coordinates: {
      lat: 47.6062,
      lng: -122.3321
    },
    agent: {
      id: 1,
      name: "Mr. Vikas Kapoor",
      title: "Partner",
      email: "Estatesvk@gmail.com",
      phone: "+91 9811707082",
      whatsapp: "+91 9811707082",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      address: "7A/42 W.E.A Karol Bagh, New Delhi-110005"
    },
    listingDate: "2024-02-15",
    mlsNumber: "MLS-2024-006",
    propertyTax: 7800,
    hoaFee: 280,
    parking: 1,
    heating: "Radiant",
    cooling: "Window Units"
  },
  {
    id: 7,
    title: "Suburban Estate",
    address: "147 Oak Lane, Austin, TX 78701",
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3800,
    type: "House",
    status: "For Sale",
    description: "Spacious suburban estate with pool, tennis court, and beautifully landscaped gardens. Perfect for entertaining with open floor plan and premium outdoor spaces.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
    ],
    features: ["Swimming Pool", "Tennis Court", "Large Garden", "Garage", "Updated", "Outdoor Kitchen"],
    yearBuilt: 2012,
    lotSize: "0.8 acres",
    coordinates: {
      lat: 30.2672,
      lng: -97.7431
    },
    agent: {
      id: 1,
      name: "Mr. Vikas Kapoor",
      title: "Partner",
      email: "Estatesvk@gmail.com",
      phone: "+91 9811707082",
      whatsapp: "+91 9811707082",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      address: "7A/42 W.E.A Karol Bagh, New Delhi-110005"
    },
    listingDate: "2024-02-05",
    mlsNumber: "MLS-2024-007",
    propertyTax: 15200,
    hoaFee: 0,
    parking: 3,
    heating: "Central Air",
    cooling: "Central Air"
  },
  {
    id: 8,
    title: "Luxury Apartment",
    address: "258 Park Avenue, Boston, MA 02101",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    type: "Apartment",
    status: "For Sale",
    description: "Sophisticated apartment in prestigious building with doorman, gym, and rooftop terrace. Modern design with premium finishes and exceptional amenities.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80"
    ],
    features: ["Doorman", "Gym", "Rooftop Terrace", "Concierge", "Parking", "Pet Friendly"],
    yearBuilt: 2021,
    lotSize: "N/A",
    coordinates: {
      lat: 42.3601,
      lng: -71.0589
    },
    agent: {
      id: 1,
      name: "Mr. Vikas Kapoor",
      title: "Partner",
      email: "Estatesvk@gmail.com",
      phone: "+91 9811707082",
      whatsapp: "+91 9811707082",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
      address: "7A/42 W.E.A Karol Bagh, New Delhi-110005"
    },
    listingDate: "2024-02-20",
    mlsNumber: "MLS-2024-008",
    propertyTax: 9200,
    hoaFee: 850,
    parking: 1,
    heating: "Central Air",
    cooling: "Central Air"
  }
]

// Helper function to get property by ID
export const getPropertyById = (id) => {
  return properties.find(property => property.id === parseInt(id))
}

// Helper function to get properties by type
export const getPropertiesByType = (type) => {
  return properties.filter(property => property.type === type)
}

// Helper function to get properties by status
export const getPropertiesByStatus = (status) => {
  return properties.filter(property => property.status === status)
}

// Helper function to search properties
export const searchProperties = (query) => {
  const lowerQuery = query.toLowerCase()
  return properties.filter(property =>
    property.title.toLowerCase().includes(lowerQuery) ||
    property.address.toLowerCase().includes(lowerQuery) ||
    property.description.toLowerCase().includes(lowerQuery)
  )
}
