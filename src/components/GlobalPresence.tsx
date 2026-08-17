import React from 'react';
import { MapPin, Globe, TrendingUp, Users, Building, Handshake } from 'lucide-react';

const regions = [
  {
    name: 'Asia',
    countries: ['China', 'India', 'Japan', 'South Korea'],
    description: 'Strong presence in major Asian markets with manufacturing facilities and distribution networks.',
    image: 'https://images.unsplash.com/photo-1543160058-bb08f2f22c21?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stats: {
      marketShare: '35%',
      growth: '18%',
      partners: '50+'
    }
  },
  {
  name: 'Middle East',
  countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Oman'],
  description: 'Established partnerships and projects across the Middle East region.',
  image: 'https://images.unsplash.com/photo-1495833066942-79abe24b0c1f?q=80&w=2395&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  stats: {
    marketShare: '28%',
    growth: '22%',
    partners: '30+'
  },
},
  {
    name: 'Europe',
    countries: ['Germany', 'France', 'UK', 'Italy'],
    description: 'Growing European presence with focus on technological innovation and quality.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    stats: {
      marketShare: '15%',
      growth: '25%',
      partners: '40+'
    }
  },
  {
    name: 'Africa',
    countries: ['South Africa', 'Nigeria', 'Kenya', 'Egypt'],
    description: 'Expanding presence with focus on infrastructure development and local partnerships.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    stats: {
      marketShare: '12%',
      growth: '30%',
      partners: '25+'
    },
    initiatives: [
      'Rural Connectivity Program in Kenya',
      'Technical Training Centers in Nigeria',
      'Infrastructure Development Partnership in South Africa',
      'Local Manufacturing Initiative in Egypt'
    ],
    partnerships: [
      'African Telecommunications Union',
      'Regional Internet Service Providers',
      'Local Installation Companies',
      'Government Infrastructure Projects'
    ]
  },
  {
    name: 'United States',
    countries: ['East Coast', 'West Coast', 'Central', 'South'],
    description: 'Strategic market expansion with focus on advanced fiber optic solutions.',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    stats: {
      marketShare: '10%',
      growth: '28%',
      partners: '35+'
    },
    keyClients: [
      'Major Telecom Providers',
      'Data Center Operators',
      'Enterprise Networks',
      'Government Agencies'
    ],
    expansionPlans: [
      'R&D Center in Silicon Valley',
      'Distribution Hub in Texas',
      'Technical Support Center in New York',
      'Innovation Lab in Boston'
    ]
  }
];

const RegionCard = ({ region }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48">
        <img
          src={region.image}
          alt="Modern Asian cityscape with skyscrapers and urban development representing OFR Telecom's strong presence in major Asian markets"
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
        }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center mb-2">
            <MapPin className="h-6 w-6 text-white mr-2" />
            <h3 className="text-2xl font-semibold text-white">{region.name}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4">{region.description}</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{region.stats.marketShare}</p>
            <p className="text-sm text-gray-500">Market Share</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{region.stats.growth}</p>
            <p className="text-sm text-gray-500">YoY Growth</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{region.stats.partners}</p>
            <p className="text-sm text-gray-500">Partners</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {region.countries.map((country) => (
            <span
              key={country}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {country}
            </span>
          ))}
        </div>

        {region.initiatives && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Key Initiatives</h4>
            <ul className="space-y-2">
              {region.initiatives.map((initiative, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                  {initiative}
                </li>
              ))}
            </ul>
          </div>
        )}

        {region.keyClients && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Key Clients</h4>
            <ul className="space-y-2">
              {region.keyClients.map((client, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 text-blue-600 mr-2" />
                  {client}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const GlobalPresence = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Global Presence
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Serving customers worldwide with local expertise and global capabilities across five continents
            </p>
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Global Network
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Asia to America, Europe to Africa - we're connecting the world with reliable fiber optic solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region) => (
              <RegionCard key={region.name} region={region} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <Globe className="h-5 w-5" />
              <span>Operating in 20+ countries worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our worldwide presence enables us to deliver consistent quality and support across all markets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">120K</div>
              <div className="text-gray-600">KM Monthly Capacity</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Global Customers</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Handshake className="h-16 w-16 text-blue-300 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Partner With Us Globally</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our global network of partners and distributors to bring cutting-edge fiber optic solutions to your market
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-semibold">
            <Users className="h-5 w-5 mr-3" />
            Become a Partner
          </button>
        </div>
      </section>
    </div>
  );
};

export default GlobalPresence;