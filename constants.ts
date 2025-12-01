
import { Amenity, AmenityType, Station, User } from './types';

export const CURRENT_USER: User = {
  name: "Rohan Singh",
  id: "123456",
  mobile: "+91 98765 43210",
  email: "rohan.singh@example.com",
  avatarUrl: "https://picsum.photos/200/200"
};

export const NEARBY_STATIONS: Station[] = [
  { id: '1', name: 'Ernakulam Junction South', translationKey: 'station_ERS', distance: '1.2 km', line: 'ERS', isFavorite: false },
  { id: '2', name: 'Chennai Central', translationKey: 'station_MAS', distance: '2.5 km', line: 'MAS', isFavorite: false },
  { id: '3', name: 'Thiruvananthapuram Central', translationKey: 'station_TVC', distance: '3.1 km', line: 'TVC', isFavorite: false },
  { id: '4', name: 'Coimbatore Junction', translationKey: 'station_CBE', distance: '4.0 km', line: 'CBE', isFavorite: false },
  { id: '5', name: 'Shoranur Junction', translationKey: 'station_SRR', distance: '4.5 km', line: 'SRR', isFavorite: false },
];

export const FAVORITE_STATIONS: Station[] = [
  { id: '10', name: 'Kollam Junction', translationKey: 'station_KJ', distance: '0.8 km', line: 'KJ', isFavorite: true },
  { id: '11', name: 'Tambaram', translationKey: 'station_TBM', distance: '12 km', line: 'TBM', isFavorite: true },
  { id: '12', name: 'Palakkad Junction', translationKey: 'station_PAC', distance: '15 km', line: 'PAC', isFavorite: true },
];

export const RECENT_STATIONS: Station[] = [
  { id: '20', name: 'Chennai Egmore', translationKey: 'station_MS', distance: '3 km', line: 'MS', isFavorite: false },
  { id: '21', name: 'Chengalpattu', translationKey: 'station_CGL', distance: '35 km', line: 'CGL', isFavorite: false },
];

export const ALL_INDIA_STATIONS: Station[] = [
  // NORTH
  { id: '101', name: 'New Delhi', line: 'NDLS', distance: '-', isFavorite: false },
  { id: '102', name: 'Delhi Junction', line: 'DLI', distance: '-', isFavorite: false },
  { id: '103', name: 'Hazrat Nizamuddin', line: 'NZM', distance: '-', isFavorite: false },
  { id: '104', name: 'Amritsar Junction', line: 'ASR', distance: '-', isFavorite: false },
  { id: '105', name: 'Ludhiana Junction', line: 'LDH', distance: '-', isFavorite: false },
  { id: '106', name: 'Lucknow Charbagh NR', line: 'LKO', distance: '-', isFavorite: false },
  { id: '107', name: 'Varanasi Junction', line: 'BSB', distance: '-', isFavorite: false },
  { id: '108', name: 'Kanpur Central', line: 'CNB', distance: '-', isFavorite: false },
  { id: '109', name: 'Prayagraj Junction', line: 'PRYJ', distance: '-', isFavorite: false },
  { id: '110', name: 'Jaipur Junction', line: 'JP', distance: '-', isFavorite: false },
  { id: '111', name: 'Chandigarh Junction', line: 'CDG', distance: '-', isFavorite: false },
  { id: '112', name: 'Jammu Tawi', line: 'JAT', distance: '-', isFavorite: false },
  
  // WEST
  { id: '201', name: 'Mumbai Central', line: 'MMCT', distance: '-', isFavorite: false },
  { id: '202', name: 'Chhatrapati Shivaji Maharaj Terminus', line: 'CSMT', distance: '-', isFavorite: false },
  { id: '203', name: 'Bandra Terminus', line: 'BDTS', distance: '-', isFavorite: false },
  { id: '204', name: 'Pune Junction', line: 'PUNE', distance: '-', isFavorite: false },
  { id: '205', name: 'Ahmedabad Junction', line: 'ADI', distance: '-', isFavorite: false },
  { id: '206', name: 'Surat', line: 'ST', distance: '-', isFavorite: false },
  { id: '207', name: 'Vadodara Junction', line: 'BRC', distance: '-', isFavorite: false },
  { id: '208', name: 'Rajkot Junction', line: 'RJT', distance: '-', isFavorite: false },
  { id: '209', name: 'Goa Madgaon', line: 'MAO', distance: '-', isFavorite: false },

  // EAST
  { id: '301', name: 'Howrah Junction', line: 'HWH', distance: '-', isFavorite: false },
  { id: '302', name: 'Sealdah', line: 'SDAH', distance: '-', isFavorite: false },
  { id: '303', name: 'Kolkata Chitpur', line: 'KOAA', distance: '-', isFavorite: false },
  { id: '304', name: 'Patna Junction', line: 'PNBE', distance: '-', isFavorite: false },
  { id: '305', name: 'Bhubaneswar', line: 'BBS', distance: '-', isFavorite: false },
  { id: '306', name: 'Puri', line: 'PURI', distance: '-', isFavorite: false },
  { id: '307', name: 'Guwahati', line: 'GHY', distance: '-', isFavorite: false },
  { id: '308', name: 'Ranchi Junction', line: 'RNC', distance: '-', isFavorite: false },
  { id: '309', name: 'Kharagpur Junction', line: 'KGP', distance: '-', isFavorite: false },

  // SOUTH
  { id: '401', name: 'KSR Bengaluru City Junction', line: 'SBC', distance: '-', isFavorite: false },
  { id: '402', name: 'Yesvantpur Junction', line: 'YPR', distance: '-', isFavorite: false },
  { id: '403', name: 'Mysuru Junction', line: 'MYS', distance: '-', isFavorite: false },
  { id: '404', name: 'Secunderabad Junction', line: 'SC', distance: '-', isFavorite: false },
  { id: '405', name: 'Hyderabad Deccan Nampally', line: 'HYB', distance: '-', isFavorite: false },
  { id: '406', name: 'Visakhapatnam Junction', line: 'VSKP', distance: '-', isFavorite: false },
  { id: '407', name: 'Vijayawada Junction', line: 'BZA', distance: '-', isFavorite: false },
  { id: '408', name: 'Tirupati', line: 'TPTY', distance: '-', isFavorite: false },
  { id: '409', name: 'Mangaluru Central', line: 'MAQ', distance: '-', isFavorite: false },
  { id: '410', name: 'Kozhikode Main', line: 'CLT', distance: '-', isFavorite: false },
  { id: '411', name: 'Thrissur', line: 'TCR', distance: '-', isFavorite: false },
  { id: '412', name: 'Alappuzha', line: 'ALLP', distance: '-', isFavorite: false },
  { id: '413', name: 'Kannur', line: 'CAN', distance: '-', isFavorite: false },
  { id: '414', name: 'Madurai Junction', line: 'MDU', distance: '-', isFavorite: false },
  { id: '415', name: 'Tiruchchirappalli Junction', line: 'TPJ', distance: '-', isFavorite: false },

  // CENTRAL
  { id: '501', name: 'Nagpur Junction', line: 'NGP', distance: '-', isFavorite: false },
  { id: '502', name: 'Bhopal Junction', line: 'BPL', distance: '-', isFavorite: false },
  { id: '503', name: 'Gwalior Junction', line: 'GWL', distance: '-', isFavorite: false },
  { id: '504', name: 'Jabalpur Junction', line: 'JBP', distance: '-', isFavorite: false },
  { id: '505', name: 'Raipur Junction', line: 'R', distance: '-', isFavorite: false },
];

export const AMENITIES: Amenity[] = [
  {
    id: '1',
    name: 'Platform 2 Cafe',
    translationKey: 'amenity_cafe',
    type: AmenityType.FOOD,
    distance: '50m',
    status: 'Open Now',
    rating: 4.5,
    reviews: 128,
    coordinates: { x: 150, y: 200 },
    description: "Great coffee and quick snacks right on the platform. Famous for fresh samosas and filter coffee."
  },
  {
    id: '2',
    name: 'Station Hub Convenience Store',
    translationKey: 'amenity_shop',
    type: AmenityType.SHOP,
    distance: '150m',
    status: 'Open Now',
    rating: 4.8,
    reviews: 1200,
    coordinates: { x: 300, y: 250 },
    description: "One-stop shop for travel essentials, newspapers, bottled water, and packaged snacks. Located near the main exit."
  },
  {
    id: '3',
    name: 'Waiting Room A',
    translationKey: 'amenity_waiting',
    type: AmenityType.WAITING,
    distance: '100m',
    status: 'Open Now',
    rating: 3.9,
    reviews: 45,
    coordinates: { x: 100, y: 100 },
    description: "Comfortable air-conditioned seating area with charging ports, clean restrooms, and departure information screens."
  }
];
