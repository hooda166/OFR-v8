import React from 'react';
import { Lightbulb, BookOpen, Microscope, Users, Award, Target, Zap, Laptop } from 'lucide-react';

const CentreOfExcellence = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Centre of Excellence
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Driving innovation and excellence in fiber optic technology through research, development, and continuous learning
            </p>
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Focus Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our specialized domains of expertise and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Microscope className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Research & Development</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Product innovation</li>
                <li>• Performance optimization</li>
                <li>• Technology integration</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Knowledge Hub</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Technical documentation</li>
                <li>• Industry best practices</li>
                <li>• Case studies</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Laptop className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Innovation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Smart manufacturing</li>
                <li>• IoT integration</li>
                <li>• Process automation</li>
                <li>• Data analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized knowledge and capabilities that set us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Excellence</h3>
              <p className="text-gray-600">Advanced manufacturing processes and quality control</p>
            </div>

            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Highly skilled professionals and researchers</p>
            </div>

            <div className="text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Leadership</h3>
              <p className="text-gray-600">Setting standards in fiber optic technology</p>
            </div>

            <div className="text-center">
              <Lightbulb className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation Hub</h3>
              <p className="text-gray-600">Continuous research and development</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CentreOfExcellence;