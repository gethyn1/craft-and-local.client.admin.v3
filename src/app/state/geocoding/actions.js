import { CALL_API } from '../../middleware/api-service'
import * as types from './types'

const GOOGLE_MAPS_API_PUBLIC_KEY = 'AIzaSyAI0dZaZHkO6pUC1maNGg6HALwRX4nG0w4'

const adapter = (json) => json.results.map(result => ({
  id: result.place_id,
  address: result.formatted_address,
  lng: result.geometry.location.lng,
  lat: result.geometry.location.lat
}))

// TO DO: should this request be proxied by API?
const fetchAdressLookupOptions = (address) => ({
  [CALL_API]: {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_PUBLIC_KEY}`,
    types: types.ADDRESS_LOOKUP,
    unauthenticatedRequest: true,
    adapter
  }
})

export {
  adapter,
  fetchAdressLookupOptions
}
