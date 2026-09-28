import { useState, useEffect } from 'react';
// NOTE: 'Wrench' is currently unused because its only uses (the 'FRP Rodder &
// Installation Tools' category icon and 'Standard FRP Rodder' product icon) now live
// inside a commented-out block below. Left in this import (not deleted) so the retired
// section can be restored by uncommenting alone, per request.
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
      // ==================================================================
      // ACTIVE PRODUCTS — per request, sourced from "WEBSITE .docx"
      // ("COMPLETE PRODUCT PORTFOLIO" / "FIBRE/ARAMID REINFORCEMENT
      // SOLUTIONS"). Only these 4 products render under FRP now. The old
      // standalone ARP category was removed and its products folded in
      // here as 'ARP Rods' — see the retired-category comment block below
      // for the original ARP section, kept (not deleted) for reference.
      // ==================================================================
      {
        name: 'UV FRP Rods',
        description: 'Designed for excellent chemical & flexible properties',
        specs: [
          'High flexibility',
          'High tensile strength & modulus',
          'Available in diameters 0.5mm to 5.0mm',
          'Fast delivery'
        ],
        icon: Zap,
        // Real OFR Telecom UV FRP rod photos (Sep 2026 drop from Javed Abidi). `images` drives the click-through gallery; `image` is the same first photo kept as a fallback.
        image: '/assets/UV FRP Rods 1.jpg',
        images: [
          '/assets/UV FRP Rods 1.jpg',
          '/assets/UV FRP Rods 2.jpg',
          '/assets/UV FRP Rods 3.jpg',
          '/assets/UV FRP Rods 4.jpg',
        ]
      },
      {
        name: 'Thermal FRP Rods',
        description: 'High quality smooth surface FRP with excellent mechanical & environmental properties',
        specs: [
          'Smooth surface',
          'Splice-free long lengths',
          'High tensile strength & modulus',
          'Extreme environment condition suitable'
        ],
        icon: Zap,
        // Real OFR Telecom Thermal FRP rod photos (Sep 2026 drop from Javed Abidi). `images` drives the click-through gallery; `image` is the same first photo kept as a fallback.
        image: '/assets/Thermal FRP Rods 1.jpg',
        images: [
          '/assets/Thermal FRP Rods 1.jpg',
          '/assets/Thermal FRP Rods 2.jpg',
          '/assets/Thermal FRP Rods 3.jpg',
          '/assets/Thermal FRP Rods 4.jpg',
        ]
      },
      {
        // Merged in from the retired standalone ARP category (see commented-out
        // 'arp-products' block below) per request: "merge the products under ARP into FRP".
        name: 'ARP Rods',
        description: 'Aramid reinforced plastic rods with exceptional strength properties',
        specs: [
          'Ultra-high strength',
          'Lightweight',
          'High flexibility',
          'Available in diameters 0.4mm to 1.2mm'
        ],
        icon: Shield,
        // Real OFR Telecom ARP rod photos (Sep 2026 drop from Javed Abidi), replacing the placeholder EAA-coated-FRP shot. `images` drives the click-through gallery; `image` is the same first photo kept as a fallback.
        image: '/assets/ARP Rods 1.jpg',
        images: [
          '/assets/ARP Rods 1.jpg',
          '/assets/ARP Rods 2.jpg',
          '/assets/ARP Rods 3.jpg',
        ]
      },
      {
        name: 'Coated FRP/ARP',
        description: 'FRP with enhanced performance',
        specs: [
          'EAA coating for better adhesion with HDPE',
          'HDPE/LDPE coating with high diameter & better flexibility',
          'LSZH & PP coating for customised applications'
        ],
        icon: Layers,
        // Real OFR Telecom UV-jacketed/coated FRP photos (Sep 2026 drop from Javed Abidi,
        // 'UPJACKET FRP'), replacing the placeholder EAA-coated-FRP shot. `images` drives
        // the click-through gallery; `image` is the same first photo kept as a fallback.
        image: '/assets/Coated FRP-ARP 1.jpg',
        images: [
          '/assets/Coated FRP-ARP 1.jpg',
          '/assets/Coated FRP-ARP 2.jpg',
          '/assets/Coated FRP-ARP 3.jpg',
          '/assets/Coated FRP-ARP 4.jpg',
        ]
      }

      // ==================================================================
      // RETIRED FRP PRODUCTS — commented out, NOT deleted, per request.
      // This was the previous 8-product FRP lineup. Uncomment any entry
      // below (and re-add a trailing comma to the preceding active
      // product) to bring it back into the FRP section.
      // ==================================================================
      /*
      ,{
        name: 'UV FRP',
        description: 'Designed for excellent mechanical and flexible properties.',
        specs: [
            'High Flexibility',
            'High tensile strength and lightweight',
            'Non-conductive and corrosion-resistant',
            'High-Tensile strength'
        ],
        icon: Zap,
        image: '/assets/UV FRP.webp'
      },
      {
        name: 'Thermal FRP',
        description: 'High quality smooth surface FRP with excellent mechanical and environmental properties',
        specs: ['Extreme environment applications', 'Smooth surface', 'Joint-free Long length FRP', 'High Tensile strength'],
        icon: Zap,
        image: '/assets/Thermal FRP.jpeg'
      },
      {
        name: 'Flat FRP',
        description: 'High-strength bare FRP rods for basic reinforcement applications',
        specs: ['Pure glass fiber construction', 'High tensile strength', 'Lightweight design', 'Cost-effective solution', 'Diameter range: 0.5mm to 25mm', 'Temperature resistance: -40°C to +85°C'],
        icon: Cable,
        image: '/assets/Flat FRP.jpg'
      },
      {
        name: 'EAA Coated FRP',
        description: 'Enhanced adhesion coating for superior bonding with cable materials',
        specs: ['EAA coating technology', 'Superior adhesion properties', 'Enhanced bonding strength', 'Improved cable performance', 'Coating thickness: 50-200 microns', 'Chemical resistance'],
        icon: Shield,
        image: '/assets/EAA Coated FRP.avif'
      },
      {
        name: 'HDPE/LDPE/LSZH Coated FRP',
        description: 'Multi-layer coated FRP for enhanced protection and performance',
        specs: ['Multiple coating options', 'Chemical resistance', 'Fire retardant properties', 'Enhanced durability', 'UV stabilized', 'Moisture barrier protection'],
        icon: Layers,
        image: '/assets/HDPE FRP.png'
      },
      {
        name: 'Water Blocking FRP',
        description: 'Specialized FRP with water-blocking properties for moisture protection',
        specs: ['Water-blocking technology', 'Moisture protection', 'Swelling compounds', 'Long-term reliability', 'Gel formation capability', 'Submarine cable applications'],
        icon: Shield,
        image: '/assets/Water blocking FRP.webp'
      },
      {
        // Placeholder photo (reused from the retired Uncoated Bare FRP listing) —
        // swap in a real product photo of the steel-wire composite rod when available.
        name: 'FRP with Steel Wire',
        description: 'Composite FRP rod with a steel wire core for applications needing extra tensile and crush strength',
        specs: ['FRP + steel wire composite core', 'Higher tensile strength than standard FRP', 'Enhanced crush resistance', 'Suited to armoured/aerial cable designs'],
        icon: Cable,
        image: '/assets/Uncoated-bare-FRP.jpg'
      },
      {
        // Placeholder photo (reused from the retired Uncoated Bare FRP listing) —
        // swap in a real product photo of the copper-wire composite rod when available.
        name: 'FRP with Copper Wire',
        description: 'Composite FRP rod with an integrated copper wire, used where cables also need to carry power or signalling',
        specs: ['FRP + copper wire composite core', 'Combined strength member and conductor', 'Suited to hybrid opto-electrical cables', 'Cost-effective solution'],
        icon: Cable,
        image: '/assets/Uncoated-bare-FRP.jpg'
      }
      */
    ]
  },

  // ====================================================================
  // RETIRED CATEGORY — "ARP (Aramid Reinforced Plastic)" section.
  // Commented out, NOT deleted, per request: "Remove the ARP section
  // entirely and merge the products under ARP into FRP." Its products now
  // live inside the 'frp-products' category above as 'ARP Rods' and
  // 'Coated FRP/ARP'. To fully restore ARP as its own top-level section,
  // uncomment this block AND restore its matching entries in Navbar.tsx
  // and Footer.tsx (also commented out, not deleted, for the same reason).
  // ====================================================================
  /*
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
        // Updated per request: reuse the real EAA Coated FRP drum/reel photo for both ARP entries.
        image: '/assets/EAA Coated FRP.avif'
      },
      {
        name: 'Coated ARP',
        description: 'Coated ARP with enhanced surface properties and protection',
        specs: ['Protective coating', 'Enhanced durability', 'Improved handling', 'Extended service life', 'Abrasion resistance', 'Aerospace applications'],
        icon: Layers,
        image: '/assets/EAA Coated FRP.avif'
      }
    ]
  },
  */

  // ====================================================================
  // RETIRED CATEGORY — "FRP Rodder & Installation Tools" section.
  // Commented out, NOT deleted, per request. Uncomment this block AND its
  // matching Navbar.tsx entry to restore. Note: also re-add 'Wrench' back
  // to the lucide-react import at the top of this file if restored.
  // ====================================================================
  /*
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
        image: '/assets/FRP rodder.jpg'
      },
      {
        name: 'Heavy Duty FRP Rodder',
        description: 'Industrial-grade rodders for demanding installation environments',
        specs: ['Enhanced strength', 'Extended length options', 'Superior durability', 'Professional grade', 'Load capacity: up to 2000N', 'Underground installation'],
        icon: Settings,
        image: '/assets/Heavy duty FRP rodder.webp'
      }
    ]
  },
  */
  // ====================================================================
  // RETIRED CATEGORY — "Cable Fillers & Materials" section.
  // Commented out, NOT deleted, per request. Its matching Navbar.tsx
  // dropdown group ("Cable Materials") is commented out too, for the
  // same reason. Uncomment both blocks to restore this section.
  // ====================================================================
  /*
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
        image: '/assets/HDPE Filler.jpg'
      },
      {
        name: 'LDPE Fillers',
        description: 'Low-density polyethylene fillers for flexible cable applications',
        specs: ['Low-density polyethylene', 'Flexibility', 'Easy processing', 'Cost-effective', 'Density: 0.91-0.93 g/cm³', 'Excellent flexibility'],
        icon: Layers,
        image: '/assets/LDPE FIller.webp'
      }
    ]
  },
  */
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
        // Updated per request (Aug 2026 image drop): 'Unitube Armoured Cable.heic' shows
        // the corrugated steel armor layer, which is this product's defining spec, so it
        // replaces the older stock photo. 'Unitube Cables' below keeps its own image.
  image: '/assets/Armoured Cable (New).jpg'
      },
      {
        name: 'ADSS Cables (All-Dielectric Self-Supporting)',
        description: 'Self-supporting aerial cables for power line installations without metallic components',
        specs: ['Self-supporting design', 'All-dielectric construction', 'Aerial installation', 'High span capability', 'Span length: up to 200m', 'Wind/ice loading resistance'],
        icon: Zap,
        // Updated per request (Aug 2026 image drop) with a real OFR-branded ADSS cable photo.
  image: '/assets/ADSS Cable (New).jpg'
      },
      {
        name: 'Duct Cables',
        description: 'Specialized cables designed for underground duct and conduit installations',
        specs: ['Duct installation optimized', 'Compact design', 'Easy pulling', 'High fiber count options', 'Fiber count: 2-144', 'Low friction jacket'],
        icon: Cable,
        // Updated per request (Aug 2026 image drop) with a real OFR-branded duct cable photo.
  image: '/assets/Duct Cable (New).jpg'
      },
      {
        name: 'FTTH Cables (Fiber-to-the-Home)',
        description: 'Drop cables for residential and commercial last-mile connectivity',
        specs: ['Drop cable design', 'Bend-insensitive fibers', 'Easy termination', 'Indoor/outdoor rated', 'Fiber count: 1-12', 'Bend radius: 10mm'],
        icon: Network,
  image: '/assets/FTTH cable.jpg'
      },
      {
        // New product added from the images/spec pack (real datasheet: PART No. FO-4/SM/(2K)-MFZ-W 3.1).
        name: 'FTTH Flat Cables',
        description: 'Compact flat drop cable with an FRP-rod strength member, built for easy indoor routing and termination',
        specs: ['FRP rod (0.5mm x2, EAA coated) strength member', 'Fibre type: SM G657 A1', 'Dimensions: 3.1mm x 2.0mm', 'Fibre count: 1F-2F', 'LSZH outer sheath', 'Min. bend radius: 40mm'],
        icon: Network,
  image: '/assets/FTTH Flat Cable.jpg'
      },
      {
        // New product added from the images/spec pack (real datasheet: PART No. A-2,4,6&12/SM/UT(2F&G)-MFP-B 5.8).
        name: 'Unitube Cables',
        description: 'Single loose-tube fibre optic cable with FRP rod strength members, for aerial and duct installation',
        specs: ['FRP rod (0.8mm x2) + glass yarn strength member', 'Fibre type: SM G652 D', 'Fibre count: 2F/4F/6F/12F', 'Outer diameter: 5.8mm', 'HDPE outer sheath', 'Standard length: 1-2km per drum'],
        icon: Cable,
  image: '/assets/Unitube Cable.png'
      }
    ]
  },
  {
    id: 'passive-components',
    title: 'Passive Components',
    icon: Network,
    // Description updated: FTTH Termination & Distribution (LIU enclosures) was retired as
    // its own section and folded in here per request — see 'FMS/LIU' product below and the
    // commented-out 'ftth-products' category further down for the original section.
    description: 'Essential passive optical components, connectivity accessories and LIU/FTTH distribution hardware for fiber optic network infrastructure',
    products: [
      // ==================================================================
      // ACTIVE PRODUCTS — per request, only these 4 render under Passive
      // Components, in this order: FMS/LIU, Patch Cords, PLC Splitters,
      // Optical Coupler. 'FMS/LIU' absorbs the retired standalone LIU
      // products (see the commented-out 'ftth-products' category below).
      // ==================================================================
      {
        // Renamed from 'Fiber Management Systems (FMS)'; now also represents the retired
        // standalone LIU (Line Interconnection Unit) products merged in from the old
        // 'FTTH Termination & Distribution' category per request.
        name: 'FMS/LIU',
        description: 'Rack-mounted fiber management, distribution and Line Interconnection Unit (LIU) systems',
        specs: ['Fixed/Sliding/Wall-mount variants available', '19-inch rack mounting', 'High density design', 'Cable management', 'Port density: up to 144 ports', 'Modular design'],
        icon: Settings,
        // Updated per request (Aug 2026 image drop): 5 real OFR Telecom FMS-24 Port photos
        // (wall-mount enclosure, SC/UPC 1U rack panel top+open, LC/UPC 1U rack panel).
        // `images` (plural) drives the click-through gallery in ProductCard; `image` is kept
        // as a same-photo fallback for any code path that only reads the singular field.
        image: '/assets/FMS-LIU 1.jpg',
        images: [
          '/assets/FMS-LIU 1.jpg',
          '/assets/FMS-LIU 2.jpg',
          '/assets/FMS-LIU 3.jpg',
          '/assets/FMS-LIU 4.jpg',
          '/assets/FMS-LIU 5.jpg'
        ]
      },
      {
        name: 'Patch Cords',
        description: 'Pre-terminated patch cables for equipment connections',
        specs: ['Low insertion loss', 'Various lengths', 'Multiple connector types'],
        icon: Cable,
        // Updated per request (Aug 2026 image drop) with a real, factory-tested patch cord photo.
        image: '/assets/Patch Cord (New).jpg'
      },
      {
        // Renamed from 'Optical Splitters (PLC)' per request.
        name: 'PLC Splitters',
        description: 'Planar Lightwave Circuit splitters for signal distribution in PON networks',
        specs: ['PLC technology', 'Multiple split ratios (1:2 to 1:64)', 'Low insertion loss', 'High reliability', 'Insertion loss: <4.3dB', 'Operating wavelength: 1260-1650nm'],
        icon: Network,
        // Updated per request (Aug 2026 image drop) with a real 1x16 PLC splitter photo.
        image: '/assets/PLC Splitter (New).jpg'
      },
      {
        // Renamed from 'Optical Couplers' (singular per request).
        name: 'Optical Coupler',
        description: 'Fused fiber couplers for signal combining and splitting applications',
        specs: ['Fused biconical taper', 'Low excess loss', 'High directivity', 'Environmental stability', 'Coupling ratio: 10:90 to 50:50', 'Directivity: >55dB'],
        icon: Zap,
        // Updated per request (Aug 2026 image drop) with a real fused coupler photo.
        image: '/assets/Optical Coupler (New).jpg'
      }

      // ==================================================================
      // RETIRED PASSIVE-COMPONENT PRODUCTS — commented out, NOT deleted,
      // per request ("remove any other products that are not listed").
      // Uncomment an entry below (and re-add a trailing comma to the
      // preceding active product) to bring it back.
      // ==================================================================
      /*
      ,{
        name: 'Wavelength Division Multiplexers (WDM)',
        description: 'WDM devices for combining multiple wavelengths on single fiber',
        specs: ['CWDM/DWDM options', 'Low insertion loss', 'High isolation', 'Compact design', 'Channel spacing: 0.8nm-20nm', 'Isolation: >30dB'],
        icon: Settings,
        image: '/assets/WDM.avif'
      },
      {
        name: 'Fiber Distribution Management Systems (FDMS)',
        description: 'Wall-mounted fiber distribution and management solutions',
        specs: ['Wall mounting', 'Compact design', 'Splice management', 'Port flexibility', 'Port count: 8-48 ports', 'IP65 rated enclosure'],
        icon: Box,
        image: '/assets/FIbre Distribution systems.webp'
      }
      */
    ]
  },

  // ====================================================================
  // RETIRED CATEGORY — "FTTH Termination & Distribution" section.
  // Commented out, NOT deleted, per request: "move the FTTH termination
  // and distribution section, merge the mentioned things in above [the
  // Passive Components] one." Its LIU concept now lives inside the
  // 'passive-components' category above as the 'FMS/LIU' product; the
  // standalone LIU Fixed/Sliding/Wall Mount and FTTH Termination Box
  // product entries below did not make the final 4-product list for
  // Passive Components, so they're retired here rather than re-added
  // individually. Its matching Navbar.tsx entry is commented out too.
  //
  // (Aug 2026 image drop) 5 real termination-box photos were supplied and, per request,
  // held rather than wired in live: 'public/assets/Termination Box (Held) 1.jpg' through
  // '5.jpg'. If this category is restored, swap the FTTH Termination Box product's `image`
  // below for `images: ['/assets/Termination Box (Held) 1.jpg', ... '5.jpg']` to get the
  // same click-through gallery the FMS/LIU product uses.
  // ====================================================================
  /*
  {
    // New category added from the images/spec pack (FTTH Products folder): termination
    // boxes and LIU (Line Interconnection Unit) enclosures for FTTH last-mile deployments.
    id: 'ftth-products',
    title: 'FTTH Termination & Distribution',
    icon: Box,
    description: 'Termination boxes and LIU enclosures for last-mile FTTH splicing, storage and distribution',
    products: [
      {
        name: 'FTTH Termination Box',
        description: 'Compact wall-mount termination box for indoor fibre drop cable termination and splice storage',
        specs: ['Wall/pole mountable', 'Splice tray + slack storage', 'Compact indoor enclosure', 'Cable gland entries'],
        icon: Box,
        image: '/assets/FTTH Termination Box.jpg'
      },
      {
        name: 'LIU – Fixed',
        description: 'Rack-mounted fixed Line Interconnection Unit for fibre patching and splice management',
        specs: ['19-inch rack mount', 'Fixed drawer design', 'SC/LC adapter panel options', 'Splice tray storage'],
        icon: Settings,
        image: '/assets/LIU Fixed.jpg'
      },
      {
        name: 'LIU – Sliding',
        description: 'Rack-mounted sliding-drawer Line Interconnection Unit for easier splice access and maintenance',
        specs: ['19-inch rack mount', 'Sliding drawer for front access', 'High port density', 'Splice tray storage'],
        icon: Settings,
        image: '/assets/LIU Sliding.jpg'
      },
      {
        name: 'LIU – Wall Mount',
        description: 'Wall-mounted Line Interconnection Unit for distribution points outside the equipment rack',
        specs: ['Wall-mount metal enclosure', 'Lockable hinged door', 'Splice tray + adapter panel', 'Indoor/outdoor rated options'],
        icon: Box,
        image: '/assets/LIU Wall Mount.jpg'
      }
    ]
  }
  */
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