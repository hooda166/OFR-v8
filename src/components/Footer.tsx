import React from 'react';
import { Facebook, Linkedin as LinkedIn, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">OFR Telecom</h3>
            <p className="text-gray-400">
              Leading provider of fiber optic solutions for telecommunications infrastructure worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products#frp-products" className="text-gray-400 hover:text-white">FRP Rods</Link></li>
              <li><Link to="/products#arp-products" className="text-gray-400 hover:text-white">ARP Rods</Link></li>
              <li><Link to="/products#optical-fiber-cables" className="text-gray-400 hover:text-white">Optical Fiber Cables</Link></li>
              <li><Link to="/products#connectivity-accessories" className="text-gray-400 hover:text-white">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/our-journey" className="text-gray-400 hover:text-white">Our Journey</Link></li>
              <li><Link to="/global-presence" className="text-gray-400 hover:text-white">Global Presence</Link></li>
              <li><Link to="/quality" className="text-gray-400 hover:text-white">Quality</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/people/OFR-Telecom/61551787380554/#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/company/ofr-telecom-private-limited/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <LinkedIn className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/ofrtelecom/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} OFR Telecom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;