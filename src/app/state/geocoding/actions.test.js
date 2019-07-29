import test from 'tape'
import { adapter } from './actions'

const locations = {
  status: 'OK',
  results: [
    {
      formatted_address: 'Mama’s Little Bakery, Chicago, Illinois',
      geometry: {
        location: {
          lat: 37.09024,
          lng: -95.712891
        },
        location_type: 'GEOMETRIC_CENTER'
      },
      place_id: '123'
    },
    {
      formatted_address: 'The Crab Shack, Downtown, South Wales',
      geometry: {
        location: {
          lat: 36.5386741,
          lng: -95.4236155
        },
        location_type: 'ROOFTOP'
      },
      place_id: '456'
    }
  ]
}

test('adapter() correctly transforms locations data', (t) => {
  const result = adapter(locations)

  const expected = [
    {
      id: '123',
      address: 'Mama’s Little Bakery, Chicago, Illinois',
      lat: 37.09024,
      lng: -95.712891
    },
    {
      id: '456',
      address: 'The Crab Shack, Downtown, South Wales',
      lat: 36.5386741,
      lng: -95.4236155
    }
  ]

  t.deepEqual(result, expected, 'correctly transforms locations data')
  t.end()
})
