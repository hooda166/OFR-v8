import React from 'react';
import { Award, Shield, Users, Clock } from 'lucide-react';

interface Quality {
  icon: React.ElementType;
  title: string;
  description: string;
}

const qualities: Quality[] = [
  {
    icon: Award,
    title: 'ISO Certified',
    description: 'ISO 14000:1,45000:1,9001:1 certified quality management system ensuring consistent quality.'
  },
  {
    icon: Shield,
    title: 'Quality Control',
    description: 'Rigorous testing and quality control processes at every stage of production.'
  },
  {
    icon: Users,
    title: 'Customer Satisfaction',
    description: 'Dedicated to exceeding customer expectations with superior service and support.'
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'Reliable and timely delivery through efficient logistics management.'
  }
];

const Quality: React.FC = () => {
  return (
    <section id="quality" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Commitment to Quality
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering excellence through rigorous quality standards and continuous improvement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((quality) => (
            <div
              key={quality.title}
              className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <quality.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{quality.title}</h3>
              <p className="text-gray-600">{quality.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quality;