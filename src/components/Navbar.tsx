import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, Phone, ChevronDown, Cable, Box, Zap, Settings, Wrench, Layers, Shield, Network } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useScrollBehavior } from '../hooks/useScrollBehavior';

interface MenuItem {
  title: string;
  href: string;
  dropdown?: {
    sections?: {
      title: string;
      items: {
        name: string;
        href: string;
        description?: string;
        icon?: React.ElementType;
        id?: string;
      }[];
    }[];
  };
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize smooth scrolling behavior
  useScrollBehavior();

  const menuItems: MenuItem[] = [
    { title: 'Home', href: '/' },
    {
      title: 'About',
      href: '/about',
      dropdown: {
        sections: [
          {
            title: 'Company',
            items: [
              { name: 'Company Profile', href: '/about' },
              { name: 'Our Journey', href: '/our-journey' },
              { name: 'Centre of Excellence', href: '/centre-of-excellence' },
              { name: 'Quality Standards', href: '/quality' },
              { name: 'CSR Initiatives', href: '/csr' }
            ]
          }
        ]
      }
    },
    {
      title: 'Products',
      href: '/products',
      dropdown: {
        sections: [
          {
            title: 'Reinforcement Solutions',
            items: [
              {
                name: 'FRP Products',
                href: '/products#frp-products',
                description: 'Comprehensive FRP reinforcement solutions',
                icon: Cable,
                id: 'frp-products'
              },
              {
                name: 'FRP Rodder & Tools',
                href: '/products#frp-rodder',
                description: 'Professional installation tools',
                icon: Wrench,
                id: 'frp-rodder'
              },
              {
                name: 'ARP Products',
                href: '/products#arp-products',
                description: 'Aramid reinforced plastic solutions',
                icon: Shield,
                id: 'arp-products'
              }
            ]
          },
          {
            title: 'Cable Materials',
            items: [
              {
                name: 'Cable Fillers',
                href: '/products#cable-fillers',
                description: 'HDPE/LDPE filling materials',
                icon: Box,
                id: 'cable-fillers'
              }
            ]
          },
          {
            title: 'Fiber Optic Systems',
            items: [
              {
                name: 'Optical Fiber Cables',
                href: '/products#optical-fiber-cables',
                description: 'Complete range of fiber optic cables',
                icon: Zap,
                id: 'optical-fiber-cables'
              },
              {
                name: 'Passive Components',
                href: '/products#passive-components',
                description: 'Splitters, couplers, connectors, pigtails',
                icon: Network,
                id: 'passive-components'
              },
              {
                name: 'Connectivity & Accessories',
                href: '/products#connectivity-accessories',
                description: 'FMS, patch cords, termination solutions',
                icon: Settings,
                id: 'connectivity-accessories'
              }
            ]
          }
        ]
      }
    },
    {
      title: 'Global Presence',
      href: '/global-presence',
    },
    { title: 'Contact', href: '/contact' }
  ];

  const allSectionIds = menuItems
    .flatMap(item => item.dropdown?.sections?.flatMap(section => 
      section.items.map(subItem => subItem.id)
    ))
    .filter((id): id is string => !!id);

  const activeSection = useScrollSpy(allSectionIds, 100);

  useEffect(() => {
    if (activeSection) {
      setHighlightedItem(activeSection);
    }
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const [path, hash] = href.split('#');
    
    if (location.pathname === path && hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setHighlightedItem(hash);
        
        setTimeout(() => {
          if (highlightedItem === hash) {
            setHighlightedItem(null);
          }
        }, 3000);
      }
    } else {
      navigate(href);
      setIsOpen(false);
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:+919810833531';
  };

  const handleDropdownEnter = (title: string) => {
    setActiveDropdown(title);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center"
              onClick={(e) => handleNavClick(e, '/')}
            >
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">OFR Telecom</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all duration-300 relative"
                  aria-expanded={activeDropdown === item.title}
                  aria-haspopup={item.dropdown ? "true" : "false"}
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.title)}
                  onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
                  onFocus={() => item.dropdown && setActiveDropdown(item.title)}
                  onBlur={() => item.dropdown && setActiveDropdown(null)}
                >
                  {item.title}
                  {item.dropdown && (
                    <ChevronDown className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-300" />
                  )}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                {item.dropdown && activeDropdown === item.title && (
                  <div
                    className="absolute top-full left-0 w-[450px] bg-white rounded-md shadow-lg py-4 z-20"
                    role="menu"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown.sections?.map((section, idx) => (
                      <div key={idx} className="px-4 mb-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">{section.title}</h3>
                        <div className="space-y-2">
                          {section.items.map((subItem, subIdx) => (
                            <Link
                              key={subIdx}
                              to={subItem.href}
                              onClick={(e) => handleNavClick(e, subItem.href)}
                              className="flex items-start p-3 rounded-md group transition-all duration-300 hover:bg-blue-50 focus:bg-blue-100 focus:shadow-lg focus:scale-105"
                              role="menuitem"
                              tabIndex={0}
                            >
                              {subItem.icon && (
                                <subItem.icon className="h-5 w-5 mt-1 mr-3 text-blue-600 transition-colors duration-300 group-hover:text-blue-700 group-focus:text-blue-700" />
                              )}
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900 transition-colors duration-300 group-hover:text-blue-700 group-focus:text-blue-700">{subItem.name}</div>
                                {subItem.description && (
                                  <p className="text-xs text-gray-500 mt-1">{subItem.description}</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleCall}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 flex items-center"
              aria-label="Get Quote"
            >
              <Phone className="h-4 w-4 mr-2" />
              Get Quote
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <div key={item.title}>
                  <Link
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transform hover:translate-x-2 transition-all duration-300 rounded-md"
                  >
                    {item.title}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-6 space-y-1">
                      {item.dropdown.sections?.map((section) => (
                        <div key={section.title}>
                          <div className="text-xs font-semibold text-gray-500 px-3 py-1">{section.title}</div>
                          {section.items.map((subItem, idx) => (
                            <Link
                              key={idx}
                              to={subItem.href}
                              onClick={(e) => handleNavClick(e, subItem.href)}
                              className={`block px-3 py-2 text-sm rounded-md transition-all duration-300 ${
                                highlightedItem === subItem.id
                                  ? 'bg-blue-100 text-blue-700 shadow-lg scale-105'
                                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                              }`}
                              aria-selected={highlightedItem === subItem.id}
                              tabIndex={0}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={handleCall}
                className="w-full mt-2 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                aria-label="Get Quote"
              >
                <Phone className="h-4 w-4 mr-2" />
                Get Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;