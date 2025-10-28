import React from 'react';
import { Leaf, Heart, Scale, Activity as Diversity, Gift, Target, Factory } from 'lucide-react';

interface Initiative {
  title: string;
  description: string;
  progress?: string;
  impact?: string;
  details: string[];
  partners?: string[];
}

interface CSRInitiative {
  category: string;
  icon: React.ElementType;
  initiatives: Initiative[];
}

interface CSRSectionProps {
  initiative: CSRInitiative;
}

const csrInitiatives: CSRInitiative[] = [
  {
    category: 'Environmental Sustainability',
    icon: Leaf,
    initiatives: [
      {
        title: 'Carbon Footprint Reduction',
        description: 'Target: 20% reduction by 2030',
        details: [
          'Upcoming solar-powered manufacturing facilities',
          'Minimising transport emissions through efficient supply chain partnerships.',
          '100% recycling commitment and zero-waste packaging.',
          'Maximising energy efficiency by enhancing equipment.'
        ]
      },
    ]
  },
   {
  category: 'Green Manufacturing',
  icon: Factory, // or a suitable eco/industry icon
  initiatives: [
    {
      title: 'Sustainable Production Practices',
      description: 'Eco-conscious manufacturing for a greener future',
      details: [
        'Recycled materials usage',
        'Water conservation systems',
        'Continual waste reduction'
      ]
    }
    ]
  },
  {
    category: 'Ethical Business Practices',
    icon: Scale,
    initiatives: [
      {
        title: 'Transparency & Compliance',
        description: 'Maintaining highest ethical standards',
        details: [
          'Regular compliance audits',
          'Ethics training programs',
          'Whistleblower protection',
          'Fair business practices'
        ]
      }
    ]
  },
  {
    category: 'Employee Welfare',
    icon: Diversity,
    initiatives: [
      {
        title: 'Diversity & Inclusion',
        description: 'Creating an inclusive workplace',
        details: [
          'Equal opportunity policies',
          'Cultural awareness programs',
          'Inclusive hiring practices',
          'Leadership development'
        ]
      },
      {
        title: 'Employee Development',
        description: 'Continuous learning and growth',
        details: [
          'Professional certifications',
          'Skill enhancement workshops',
          'Mentorship programs',
          'Career advancement paths'
        ]
      }
    ]
  },
{
    category: 'Community Engagement',
    icon: Heart,
    initiatives: [
      {
        title: 'Digital Literacy Program',
        description: 'Education initiative in underserved areas',
        impact: '10,000+ beneficiaries',
        details: [
          'Literacy program partnerships with Rotary Club',
          'Free education for underprivileged children',
          'Local NGOs alignment'
        ]
      }
    ]
  }
];

const CSRSection: React.FC<CSRSectionProps> = ({ initiative }) => {
  const Icon = initiative.icon;
  
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg h-full">
      <div className="flex items-center mb-6">
        <Icon className="h-8 w-8 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-900 ml-3">{initiative.category}</h3>
      </div>
      
      <div className="space-y-6">
        {initiative.initiatives.map((item, index) => (
          <div key={index} className="border-l-4 border-blue-600 pl-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
            <p className="text-gray-600 mb-3">{item.description}</p>
            
            {item.progress && (
              <div className="mb-3">
                <span className="text-sm font-medium text-blue-600">{item.progress}</span>
              </div>
            )}
            
            {item.impact && (
              <div className="mb-3">
                <span className="text-sm font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">{item.impact}</span>
              </div>
            )}
            
            <ul className="space-y-2">
              {item.details.map((detail, idx) => (
                <li key={idx} className="text-sm text-gray-500 flex items-center">
                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const CSR: React.FC = () => {
  return (
    <section id="csr" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Corporate Social Responsibility
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making a positive impact through sustainable practices and community engagement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {csrInitiatives.map((initiative) => (
            <CSRSection key={initiative.category} initiative={initiative} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CSR;