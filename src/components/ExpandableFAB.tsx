import React, { useState, useEffect, useRef } from 'react';
import { Users, X, MessageCircle, Phone, Bot } from 'lucide-react';

interface FABButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  className?: string;
  delay?: number;
}

const FABButton: React.FC<FABButtonProps> = ({ 
  icon: Icon, 
  label, 
  onClick, 
  className = '', 
  delay = 0 
}) => {
  return (
    <button
      onClick={onClick}
      className={`fab-sub-button ${className}`}
      style={{ animationDelay: `${delay}ms` }}
      aria-label={label}
      title={label}
    >
      <Icon className="h-6 w-6" />
      <span className="fab-label">{label}</span>
    </button>
  );
};

const ExpandableFAB: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  // Initialize Voiceflow when component mounts
  useEffect(() => {
    // Voiceflow initialization removed due to invalid project ID
    // To re-enable: Replace with your valid Voiceflow project ID from your dashboard
    console.log('Voiceflow integration disabled - invalid project ID');
  }, []);

  // WhatsApp functionality (moved from existing WhatsAppButton)
  const handleWhatsApp = () => {
    const phoneNumber = '919810833531';
    const message = encodeURIComponent(
      'Hello! I found your website and I\'m interested in your fiber optic products. Could you please provide more information?'
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsExpanded(false);
  };

  // Chatbot functionality (integrates with existing Voiceflow)
  const handleChatbot = () => {
    // Chatbot functionality disabled - invalid Voiceflow project ID
    alert('Chat assistant is currently unavailable. Please contact us via WhatsApp or phone.');
    setIsExpanded(false);
  };

  // Call functionality
  const handleCall = () => {
    window.location.href = 'tel:+919810833531';
    setIsExpanded(false);
  };

  // Toggle expansion
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isExpanded]);

  return (
    <div ref={fabRef} className="expandable-fab-container">
      {/* Backdrop overlay when expanded */}
      {isExpanded && <div className="fab-backdrop" onClick={() => setIsExpanded(false)} />}
      
      {/* Sub-buttons */}
      {isExpanded && (
        <div className="fab-sub-buttons">
          <FABButton
            icon={Phone}
            label="Call Now"
            onClick={handleCall}
            className="fab-call"
            delay={0}
          />
          <FABButton
            icon={Bot}
            label="Chat Assistant"
            onClick={handleChatbot}
            className="fab-chatbot"
            delay={100}
          />
          <FABButton
            icon={MessageCircle}
            label="WhatsApp"
            onClick={handleWhatsApp}
            className="fab-whatsapp"
            delay={200}
          />
        </div>
      )}

      {/* Main FAB button */}
      <button
        onClick={toggleExpansion}
        className={`fab-main ${isExpanded ? 'expanded' : ''}`}
        aria-label={isExpanded ? 'Close menu' : 'Open contact menu'}
        aria-expanded={isExpanded}
        title="Contact Options - Chat, Call, WhatsApp"
      >
        <div className="fab-icon-container">
          <Users className={`fab-menu-icon ${isExpanded ? 'hidden' : 'visible'}`} />
          <X className={`fab-close-icon ${isExpanded ? 'visible' : 'hidden'}`} />
        </div>
      </button>
    </div>
  );
};

export default ExpandableFAB;