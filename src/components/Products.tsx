import { useState, useEffect } from 'react';
import { Cable, Box, Zap, Settings, Shield, Layers, Wrench, Network, Phone, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { HorizontalScrollCarousel } from './ui/horizontal-scroll-carousel';

const productCategories = [
  {
    id: 'frp-products',
    title: 'FRP (Fiber Reinforced Plastic) Products',
    icon: Cable,
    description: 'Comprehensive range of fiber reinforced plastic solutions for cable reinforcement',
    products: [
        {
          name: 'UV FRP',
          description: 'Designed for excellent mechanical and flexible properties.',
          specs: [
              'High Flexibility',
              'High tensile strength and lightweight',
              'Non-conductive and corrosion-resistant',
              'High-Tensile strength'
          ],
          icon: Zap,
          image: '/Assets/UV FRP.webp'
      },
      {
        name: 'Thermal FRP',
        description: 'High quality smooth surface FRP with excellent mechanical and environmental properties',
        specs: ['Extreme environment applications', 'Smooth surface', 'Joint-free Long length FRP', 'High Tensile strength'],
        icon: Zap,
  image: '/Assets/Thermal FRP.jpeg'
      },
      {
        name: 'Uncoated Bare FRP',
        description: 'High-strength bare FRP rods for basic reinforcement applications',
        specs: ['Pure glass fiber construction', 'High tensile strength', 'Lightweight design', 'Cost-effective solution', 'Diameter range: 0.5mm to 25mm', 'Temperature resistance: -40°C to +85°C'],
        icon: Cable,
  image: '/Assets/Uncoated bare FRP.jpg'
      },
      {
        name: 'Flat FRP',
        description: 'High-strength bare FRP rods for basic reinforcement applications',
        specs: ['Pure glass fiber construction', 'High tensile strength', 'Lightweight design', 'Cost-effective solution', 'Diameter range: 0.5mm to 25mm', 'Temperature resistance: -40°C to +85°C'],
        icon: Cable,
  image: '/Assets/Flat FRP.jpg'
      },
      {
        name: 'EAA Coated FRP',
        description: 'Enhanced adhesion coating for superior bonding with cable materials',
        specs: ['EAA coating technology', 'Superior adhesion properties', 'Enhanced bonding strength', 'Improved cable performance', 'Coating thickness: 50-200 microns', 'Chemical resistance'],
        icon: Shield,
  image: '/Assets/EAA Coated FRP.avif'
      },
      {
        name: 'HDPE/LDPE/LSZH Coated FRP',
        description: 'Multi-layer coated FRP for enhanced protection and performance',
        specs: ['Multiple coating options', 'Chemical resistance', 'Fire retardant properties', 'Enhanced durability', 'UV stabilized', 'Moisture barrier protection'],
        icon: Layers,
  image: '/Assets/HDPE FRP.png'
      },
      {
        name: 'Water Blocking FRP',
        description: 'Specialized FRP with water-blocking properties for moisture protection',
        specs: ['Water-blocking technology', 'Moisture protection', 'Swelling compounds', 'Long-term reliability', 'Gel formation capability', 'Submarine cable applications'],
        icon: Shield,
  image: '/Assets/Water blocking FRP.webp'
      }
      
    ]
  },
  {
    id: 'frp-rodder',
    title: 'FRP Rodder & Installation Tools',
    icon: Wrench,
    description: 'Professional-grade FRP rodders and tools for cable installation and maintenance',
    products: [
      {
        name: 'Standard FRP Rodder',
        description: 'High-quality FRP rodders for cable pulling and installation work',
        specs: ['Various lengths available', 'High flexibility', 'Excellent pushing force', 'Durable construction', 'Lengths: 50m to 500m', 'Diameter: 4mm to 16mm'],
        icon: Wrench,
  image: '/Assets/FRP rodder.jpg'
      },
      {
        name: 'Heavy Duty FRP Rodder',
        description: 'Industrial-grade rodders for demanding installation environments',
        specs: ['Enhanced strength', 'Extended length options', 'Superior durability', 'Professional grade', 'Load capacity: up to 2000N', 'Underground installation'],
        icon: Settings,
  image: '/Assets/Heavy duty FRP rodder.webp'
      }
    ]
  },
  {
    id: 'arp-products',
    title: 'ARP (Aramid Reinforced Plastic)',
    icon: Shield,
    description: 'Advanced aramid reinforced plastic solutions for superior strength and performance',
    products: [
      {
        name: 'Uncoated ARP',
        description: 'Pure aramid reinforced plastic rods with exceptional strength properties',
        specs: ['Aramid fiber construction', 'Ultra-high strength', 'Lightweight', 'Chemical resistance', 'Tensile strength: >3000 MPa', 'Military grade applications'],
        icon: Shield,
  image: '/Assets/Uncoated ARP.webp'
      },
      {
        name: 'Coated ARP',
        description: 'Coated ARP with enhanced surface properties and protection',
        specs: ['Protective coating', 'Enhanced durability', 'Improved handling', 'Extended service life', 'Abrasion resistance', 'Aerospace applications'],
        icon: Layers,
  image: '/Assets/Coated ARP.jpeg'
      }
    ]
  },
  {
    id: 'cable-fillers',
    title: 'Cable Fillers & Materials',
    icon: Box,
    description: 'High-quality filling materials for cable construction and void management',
    products: [
      {
        name: 'HDPE Fillers',
        description: 'High-density polyethylene fillers for cable void filling and structural support',
        specs: ['High-density polyethylene', 'Excellent chemical resistance', 'Structural support', 'Void filling', 'Density: 0.94-0.97 g/cm³', 'Temperature range: -40°C to +80°C'],
        icon: Box,
  image: '/Assets/HDPE Filler.jpg'
      },
      {
        name: 'LDPE Fillers',
        description: 'Low-density polyethylene fillers for flexible cable applications',
        specs: ['Low-density polyethylene', 'Flexibility', 'Easy processing', 'Cost-effective', 'Density: 0.91-0.93 g/cm³', 'Excellent flexibility'],
        icon: Layers,
  image: '/Assets/LDPE FIller.webp'
      }
    ]
  },
  {
    id: 'optical-fiber-cables',
    title: 'Optical Fiber Cables',
    icon: Zap,
    description: 'Complete range of fiber optic cables for telecommunications and data transmission',
    products: [
      {
        name: 'Armoured Optical Cables',
        description: 'Heavy-duty armoured fiber optic cables for harsh environments and direct burial',
        specs: ['Steel armor protection', 'Rodent resistance', 'Crush protection', 'Direct burial capability', 'Fiber count: 2-288', 'Operating temperature: -40°C to +70°C'],
        icon: Shield,
  image: '/Assets/armoured Optical fibre cable.jpg'
      },
      {
        name: 'ADSS Cables (All-Dielectric Self-Supporting)',
        description: 'Self-supporting aerial cables for power line installations without metallic components',
        specs: ['Self-supporting design', 'All-dielectric construction', 'Aerial installation', 'High span capability', 'Span length: up to 200m', 'Wind/ice loading resistance'],
        icon: Zap,
  image: '/Assets/ADSS cable.jpg'
      },
      {
        name: 'Duct Cables',
        description: 'Specialized cables designed for underground duct and conduit installations',
        specs: ['Duct installation optimized', 'Compact design', 'Easy pulling', 'High fiber count options', 'Fiber count: 2-144', 'Low friction jacket'],
        icon: Cable,
  image: '/Assets/Duct cable.webp'
      },
      {
        name: 'FTTH Cables (Fiber-to-the-Home)',
        description: 'Drop cables for residential and commercial last-mile connectivity',
        specs: ['Drop cable design', 'Bend-insensitive fibers', 'Easy termination', 'Indoor/outdoor rated', 'Fiber count: 1-12', 'Bend radius: 10mm'],
        icon: Network,
  image: '/Assets/FTTH cable.jpg'
      }
    ]
  },
  {
    id: 'passive-components',
    title: 'Passive Optical Components',
    icon: Network,
    description: 'Essential passive components for fiber optic network infrastructure',
    products: [
      {
        name: 'Optical Splitters (PLC)',
        description: 'Planar Lightwave Circuit splitters for signal distribution in PON networks',
        specs: ['PLC technology', 'Multiple split ratios (1:2 to 1:64)', 'Low insertion loss', 'High reliability', 'Insertion loss: <4.3dB', 'Operating wavelength: 1260-1650nm'],
        icon: Network,
  image: '/Assets/Optical splitter.jpg'
      },
      {
        name: 'Optical Couplers',
        description: 'Fused fiber couplers for signal combining and splitting applications',
        specs: ['Fused biconical taper', 'Low excess loss', 'High directivity', 'Environmental stability', 'Coupling ratio: 10:90 to 50:50', 'Directivity: >55dB'],
        icon: Zap,
  image: '/Assets/optical couplers.jpg'
      },
      {
        name: 'Wavelength Division Multiplexers (WDM)',
        description: 'WDM devices for combining multiple wavelengths on single fiber',
        specs: ['CWDM/DWDM options', 'Low insertion loss', 'High isolation', 'Compact design', 'Channel spacing: 0.8nm-20nm', 'Isolation: >30dB'],
        icon: Settings,
  image: '/Assets/WDM.avif'
      }
    ]
  },
  {
    id: 'connectivity-accessories',
    title: 'Connectivity & Accessories',
    icon: Settings,
    description: 'Complete range of fiber optic connectivity solutions and installation accessories',
    products: [
      {
        name: 'Fiber Management Systems (FMS)',
        description: 'Rack-mounted fiber management and distribution systems',
        specs: ['19-inch rack mounting', 'High density design', 'Cable management', 'Easy access', 'Port density: up to 144 ports', 'Modular design'],
        icon: Settings,
  image: '/Assets/FIber Management systems.jpg'
      },
      {
        name: 'Fiber Distribution Management Systems (FDMS)',
        description: 'Wall-mounted fiber distribution and management solutions',
        specs: ['Wall mounting', 'Compact design', 'Splice management', 'Port flexibility', 'Port count: 8-48 ports', 'IP65 rated enclosure'],
        icon: Box,
  image: '/Assets/FIbre Distribution systems.webp'
      },
      {
        name: 'Patch Cords',
        description: 'Pre-terminated patch cables for equipment connections',
        specs: ['Factory terminated both ends', 'Low insertion loss', 'Various lengths', 'Multiple connector types', 'Insertion loss: <0.3dB', 'Return loss: >50dB'],
        icon: Cable,
  image: '/Assets/Patch cords.jpg'
      }
    ]
  }
];

// ProductModal intentionally removed — not used by current components

const ProductSection: React.FC<{ category: any; isHighlighted?: boolean }> = ({ category, isHighlighted }) => {
  return (
    <div 
      id={category.id}
    >
      <HorizontalScrollCarousel 
        products={category.products}
        categoryIcon={category.icon}
        categoryTitle={category.title}
        categoryDescription={category.description}
      />
    </div>
  );
};

const Products = () => {
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);
  const location = useLocation();

  // Only highlight on navigation, not on scroll spy
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const targetCategory = productCategories.find(cat => cat.id === targetId);
      if (targetCategory) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setHighlightedCategory(targetId);
            setTimeout(() => {
              setHighlightedCategory(null);
            }, 3000); // 3 seconds only
          }
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete Product Portfolio
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              From FRP reinforcement solutions to complete fiber optic systems - engineered for excellence and reliability
            </p>
          </div>
        </div>
      </section>

      {/* Products Sections with Horizontal Carousels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {productCategories.map((category) => (
              <ProductSection
                key={category.id}
                category={category}
                isHighlighted={highlightedCategory === category.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Phone className="h-16 w-16 text-blue-300 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Need Custom Solutions?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Our engineering team can develop customized products to meet your specific requirements
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-semibold">
            <Phone className="h-5 w-5 mr-3" />
            Contact Engineering Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Products;