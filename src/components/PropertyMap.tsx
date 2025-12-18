import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Box, Typography } from '@mui/material'

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

type Property = {
  id: number | string
  title: string
  location: string
  price: number
  lat?: number
  lng?: number
}

type PropertyMapProps = {
  properties: Property[]
  center?: [number, number]
  zoom?: number
}

// Mock coordinates for locations (in a real app, these would come from geocoding)
const locationCoordinates: Record<string, [number, number]> = {
  'Malibu, California': [34.0259, -118.7798],
  'Los Angeles, California': [34.0522, -118.2437],
  'Lake Tahoe, California': [39.0968, -120.0324],
  'San Diego, California': [32.7157, -117.1611],
  'San Francisco, California': [37.7749, -122.4194],
}

export default function PropertyMap({ properties, center = [34.0522, -118.2437], zoom = 10 }: PropertyMapProps) {
  // Get coordinates for a property based on location
  const getCoordinates = (location: string): [number, number] => {
    return locationCoordinates[location] || center
  }

  // Calculate center point from all properties
  useEffect(() => {
    if (properties.length > 0) {
      // You could update the map center here if needed
      // const coords = properties.map(p => getCoordinates(p.location))
      // const avgLat = coords.reduce((sum, [lat]) => sum + lat, 0) / coords.length
      // const avgLng = coords.reduce((sum, [, lng]) => sum + lng, 0) / coords.length
    }
  }, [properties])

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => {
          const [lat, lng] = getCoordinates(property.location)
          return (
            <Marker key={property.id} position={[lat, lng]}>
              <Popup>
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {property.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#717171', mb: 0.5 }}>
                    {property.location}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#AD542D' }}>
                    ${property.price}/night
                  </Typography>
                </Box>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </Box>
  )
}

