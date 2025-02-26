import { City } from './types';

// Define the cities array
const citiesData: City[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi',
    latitude: 28.6139,
    longitude: 77.2090
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    latitude: 19.0760,
    longitude: 72.8777
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    latitude: 22.5726,
    longitude: 88.3639
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    latitude: 12.9716,
    longitude: 77.5946
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    latitude: 17.3850,
    longitude: 78.4867
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    latitude: 18.5204,
    longitude: 73.8567
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    latitude: 26.8467,
    longitude: 80.9462
  },
  {
    id: 'patna',
    name: 'Patna',
    state: 'Bihar',
    latitude: 25.5941,
    longitude: 85.1376
  },
  {
    id: 'indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    latitude: 22.7196,
    longitude: 75.8577
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    state: 'Uttarakhand',
    latitude: 30.3165,
    longitude: 78.0322
  },
  {
    id: 'raipur',
    name: 'Raipur',
    state: 'Chhattisgarh',
    latitude: 21.2514,
    longitude: 81.6296
  },
  {
    id: 'ranchi',
    name: 'Ranchi',
    state: 'Jharkhand',
    latitude: 23.3441,
    longitude: 85.3096
  },
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar',
    state: 'Odisha',
    latitude: 20.2961,
    longitude: 85.8245
  }
];

// Export the cities sorted alphabetically by name
export const indianCities: City[] = [...citiesData].sort((a, b) => 
  a.name.localeCompare(b.name)
); 