import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Zap, Shield, Users } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const highlights = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Operating in 20+ countries worldwide"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "ISO 9001:2015 certified manufacturing"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "State-of-the-art R&D facilities"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated professional support"
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-grow flex items-center overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Connecting the World Through
                <span className="block text-blue-300 mt-2">Advanced Fiber Technology</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Global leader in fiber optic solutions, providing cutting-edge telecommunications infrastructure across continents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleNavigation('/products')}
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => handleNavigation('/contact')}
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Us
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-full h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="w-64 h-64 text-blue-200 opacity-20 animate-float" />
                </div>
                {/* Connection lines */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-blue-400/0 via-blue-400/50 to-blue-400/0 glow-line"
                    style={{
                      width: '40%',
                      top: `${20 + i * 15}%`,
                      left: `${10 + i * 5}%`,
                      transform: `rotate(${-20 + i * 10}deg)`,
                      animation: `pulse 3s infinite ${i * 0.5}s, flow 6s infinite ${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <highlight.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;