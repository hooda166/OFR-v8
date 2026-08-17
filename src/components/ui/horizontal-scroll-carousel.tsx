"use client";

import * as React from "react";
import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProductCard {
  name: string;
  description: string;
  specs: string[];
  icon?: React.ElementType;
  image?: string;
  // Optional multi-photo gallery. When set with 2+ entries, ProductCard renders a
  // click-through/scrollable image viewer instead of the single static image.
  images?: string[];
}

interface HorizontalScrollCarouselProps {
  products: ProductCard[];
  categoryIcon?: React.ElementType;
  categoryTitle: string;
  categoryDescription: string;
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({ 
  products, 
  categoryIcon: CategoryIcon,
  categoryTitle,
  categoryDescription 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Calculate if scrolling is needed based on product count and viewport
  const shouldScroll = useMemo(() => {
    // For desktop: show 3 cards at once, scroll if more than 3
    // For tablet: show 2 cards at once, scroll if more than 2  
    // For mobile: show 1 card at once, scroll if more than 1
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1024) return products.length > 3; // Desktop
      if (width >= 768) return products.length > 2;  // Tablet
      return products.length > 1; // Mobile
    }
    return products.length > 3; // Default fallback
  }, [products.length]);

  // Handle manual scroll with buttons
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    setIsScrolling(true);
    const container = scrollContainerRef.current;
    
    // Calculate scroll amount based on viewport width for better mobile experience
    const containerWidth = container.clientWidth;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    let scrollAmount;
    if (isMobile) {
      // On mobile, scroll exactly one card width plus gap
      scrollAmount = containerWidth * 0.85; // Scroll almost full width to show next card
    } else if (isTablet) {
      // On tablet, scroll one card width
      scrollAmount = (400 + 24); // Card width + gap
    } else {
      // On desktop, scroll two cards
      scrollAmount = (400 + 24) * 2;
    }
    
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      setIsScrolling(false);
      updateScrollButtons();
    }, 300);
  };

  // Update scroll button states
  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  // Handle touch scrolling on mobile
  const handleTouchScroll = () => {
    // Debounce the update to avoid excessive calls during touch scrolling
    setTimeout(updateScrollButtons, 100);
  };

  // Initialize scroll buttons on mount and window resize
  React.useEffect(() => {
    const handleResize = () => {
      setTimeout(updateScrollButtons, 100);
    };
    
    window.addEventListener('resize', handleResize);
    updateScrollButtons();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // Static grid layout for sections with few products
  if (!shouldScroll) {
    return (
      <section className="w-full mb-12">
        {/* Category Header - Compact design */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 mx-4">
          <div className="flex items-center justify-center mb-3">
            {CategoryIcon && <CategoryIcon className="h-8 w-8 text-blue-600 mr-3" />}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{categoryTitle}</h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">{categoryDescription}</p>
        </div>

        {/* Static Grid Layout - Removed excessive padding */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {products.map((product, index) => (
              <ProductCard
                key={`${product.name}-${index}`}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Horizontal scroll layout for sections with many products
  return (
    <section className="w-full mb-12">
      {/* Category Header - Compact design */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 mx-4">
        <div className="flex items-center justify-center mb-3">
          {CategoryIcon && <CategoryIcon className="h-8 w-8 text-blue-600 mr-3" />}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{categoryTitle}</h2>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto text-center">{categoryDescription}</p>
      </div>

      {/* Horizontal Scroll Container - Fixed height, no viewport dependency */}
      <div className="relative max-w-7xl mx-auto px-2 sm:px-4">
        {/* Scroll Controls */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 sm:p-3 transition-all duration-200 hover:scale-110 touch-manipulation"
            style={{ left: -36 }}
            disabled={isScrolling}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-700" />
          </button>
        )}
        
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 sm:p-3 transition-all duration-200 hover:scale-110 touch-manipulation"
            style={{ right: -36 }}
            disabled={isScrolling}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-700" />
          </button>
        )}

        {/* Scrollable Container - Manual scroll only */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 pr-6 lg:pr-8 scroll-smooth"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
            scrollSnapType: 'x mandatory', // Enable scroll snap for better mobile experience
          }}
          onScroll={handleTouchScroll}
          onTouchEnd={handleTouchScroll}
        >
          {products.map((product, index) => (
            <ProductCard
              key={`${product.name}-${index}`}
              product={product}
            />
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

// Products whose real product photos are shot on a plain background rather than filling
// the frame — these render with 'object-contain' (whole item visible) instead of
// 'object-cover' (frame filled, edges cropped). Shared by the single-image header and the
// multi-image gallery below.
const CONTAIN_FIT_PRODUCTS = [
  'EAA Coated FRP',
  'Standard FRP Rodder',
  'Heavy Duty FRP Rodder',
  'Uncoated ARP',
  'Coated ARP',
  'ADSS Cables (All-Dielectric Self-Supporting)',
  'Duct Cables',
  'Armoured Optical Cables',
  // Renamed from 'Optical Splitters (PLC)' / 'Fiber Management Systems (FMS)'
  // when Passive Components was trimmed to 4 products — kept here so the same
  // images still render with 'object-contain' instead of being cropped.
  'PLC Splitters',
  'FMS/LIU',
  'Patch Cords',
  'Optical Coupler'
];

// Click-through / scrollable image viewer for products with more than one photo
// (e.g. FMS/LIU). Renders a mini strip with prev/next + dot controls inside the card,
// and clicking the image opens a full-screen lightbox to page through the full set.
const ProductImageGallery: React.FC<{ images: string[]; name: string; icon?: React.ElementType }> = ({ images, name, icon: Icon }) => {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const containFit = CONTAIN_FIT_PRODUCTS.includes(name);

  const go = (e: React.MouseEvent | React.KeyboardEvent, dir: 1 | -1) => {
    e.stopPropagation();
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <>
      <div
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={() => setLightboxOpen(true)}
        role="button"
        aria-label={`View ${name} photos`}
      >
        <img
          src={images[index]}
          className={`w-full h-full ${containFit ? 'object-contain' : 'object-cover'} object-center group-hover:scale-105 transition-transform duration-500`}
          alt={`${name} — photo ${index + 1} of ${images.length}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/Assets/FTTH cable.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        {Icon && (
          <div className="absolute top-3 right-3">
            <Icon className="h-6 w-6 text-white drop-shadow-lg" />
          </div>
        )}
        <button
          onClick={(e) => go(e, -1)}
          className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => go(e, 1)}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded">
          {index + 1}/{images.length}
        </div>
      </div>

      {lightboxOpen && createPortal(
        // Rendered via a portal into document.body — the card ancestor uses Tailwind's
        // `transform` utility (for the hover-lift effect), and a `transform` on an
        // ancestor makes it the containing block for descendant `position: fixed`
        // elements per the CSS spec. Without the portal the lightbox was trapped inside
        // the card instead of covering the viewport.
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={images[index]}
            alt={`${name} — photo ${index + 1} of ${images.length}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => go(e, -1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => go(e, 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-2 w-2 rounded-full transition-colors cursor-pointer ${i === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const ProductCard: React.FC<{ product: ProductCard }> = ({ product }) => {
  const hasGallery = !!product.images && product.images.length > 1;
  return (
    <div
      className="group relative h-[480px] w-[300px] sm:w-[360px] lg:w-[380px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0"
      style={{ scrollSnapAlign: 'start' }} // Ensure cards snap into view properly
    >
      {/* Header with optional image(s) — multi-photo products get the click-through gallery */}
      {hasGallery ? (
        <ProductImageGallery images={product.images as string[]} name={product.name} icon={product.icon} />
      ) : product.image && (
        // Use a slightly taller header so 'contain' images have room
        <div className="relative h-56 overflow-hidden">
          <img
            src={product.image}
            className={`w-full h-full ${CONTAIN_FIT_PRODUCTS.includes(product.name) ? 'object-contain' : 'object-cover'} object-center group-hover:scale-105 transition-transform duration-500`}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              // fallback to a bundled asset if the specified path fails
              e.currentTarget.src = '/Assets/FTTH cable.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {product.icon && (
            <div className="absolute top-3 right-3">
              <product.icon className="h-6 w-6 text-white drop-shadow-lg" />
            </div>
          )}
        </div>
      )}

      {/* Content - Reduced padding */}
      <div className="p-4 sm:p-5 h-full flex flex-col">
        <div className="flex items-start mb-3">
          {!product.image && !hasGallery && product.icon && (
            <product.icon className="h-7 w-7 text-blue-600 mr-3 mt-1 flex-shrink-0" />
          )}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-tight">{product.name}</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Specifications - Compact layout */}
        <div className="flex-grow">
          <h4 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">Key Specifications</h4>
          <div className="space-y-1.5">
            {product.specs.slice(0, 4).map((spec, index) => (
              <div key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2.5 mt-2 flex-shrink-0"></span>
                <span className="text-gray-700 text-xs leading-relaxed">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer - Reduced padding */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs sm:text-sm font-medium touch-manipulation">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export { HorizontalScrollCarousel };