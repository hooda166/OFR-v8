import { Award, Shield, Users, Target, CheckCircle, Wrench, FileText, Settings } from 'lucide-react';

const CompanyProfile = () => {
  return (
    <div className="bg-white">
      {/* Core Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 mt-8 md:mt-12 lg:mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Are the Essential Link</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-700 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Settings className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Expertise</h3>
              <p className="text-gray-600">Leading manufacturer of FRP/GRP/ARP/Optical Fibre Cables/ Fibre Accessories &  Passive products, delivering high-performance solutions at the forefront of the industry.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-700 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">Delivering core strength and reliability to build the future for every valued customer</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-700 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-600">To be recognized as one of the most respected companies for quality and commitment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Infrastructure */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Manufacturing Infrastructure</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-700 p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Existing Capacity</h3>
              <p>120,000 KM Per Month</p>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg text-white flex flex-col justify-center text-left">
              <h3 className="text-lg font-semibold">Thermal FRP Machines</h3>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg text-white flex flex-col justify-center text-left">
              <h3 className="text-lg font-semibold">Coating Extruders</h3>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg text-white flex flex-col justify-center text-left">
              <h3 className="text-lg font-semibold">FRP Rewinders</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <div className="bg-[#1a365d] p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Production Area</h3>
              <p>10,000 Square Feet</p>
            </div>
            <div className="bg-[#1a365d] p-6 rounded-lg text-white flex flex-col justify-center text-left">
              <h3 className="text-lg font-semibold">R&D and Quality labs</h3>
            </div>
            <div className="bg-[#1a365d] p-6 rounded-lg text-white flex flex-col justify-center text-left">
              <h3 className="text-lg font-semibold">UV FRP Machines</h3>
            </div>
            <div className="bg-[#1a365d] p-6 rounded-lg text-white flex flex-col justify-center text-left">
              <h3 className="text-lg font-semibold">Printing Machines</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Strengths */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Manufacturing Strengths</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-start">
                <Award className="h-8 w-8 text-blue-700 mt-1" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">ISO Certifications</h3>
                  <ul className="space-y-2">
                    <li>• ISO 9001:2015 - Quality Management System</li>
                    <li>• ISO 14001:2015 - Environmental Management System</li>
                    <li>• ISO 45001:2018 - Occupational Health & Safety Management System</li>
                    <li>• One Star Export House - Certified for foreign trade excellence</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <Shield className="h-8 w-8 text-blue-700 mt-1" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Manufacturing Process</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-700 mr-2" />
                      <span>All processes have documented SOPs displayed prominently</span>
                    </li>
                    <li className="flex items-center">
                      <Wrench className="h-5 w-5 text-blue-700 mr-2" />
                      <span>Equipment calibrated by certified agencies to ensure accuracy</span>
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-5 w-5 text-blue-700 mr-2" />
                      <span>Ensuring equipment reliability and workplace safety</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                      <span>Process transparency and quality control</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="h-5 w-5 text-blue-700 mr-2" />
                      <span>Only certified operators are deployed in production</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Strengths */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Organizational Strengths</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden px-2 md:px-6 py-6 md:py-10 lg:py-12">
            <div className="flex flex-col lg:flex-row h-auto lg:h-[350px]">
              {/* Image Section - Left Side */}
              <div className="lg:w-[45%] h-64 lg:h-full">
                <img
                  src="/Assets/Organizational strengths - Google.jpg"
                  alt="Organizational strengths"
                  className="w-full h-full object-cover object-center rounded-none"
                  loading="lazy"
                />
              </div>
              {/* Content Section - Right Side */}
              <div className="lg:w-[55%] p-6 lg:p-8 flex flex-col justify-center h-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Key Strengths</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-gray-800 leading-relaxed">
                      Partnerships with reputable global raw material suppliers
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-gray-800 leading-relaxed">
                      Optimized operating costs for competitive pricing
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-gray-800 leading-relaxed">
                      Strategic inventory and production management
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-gray-800 leading-relaxed">
                      Trusted supplier to major OFC companies
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-gray-800 leading-relaxed">
                      Comprehensive global customer support
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="font-medium text-gray-800 leading-relaxed">
                      Forward-thinking approach to innovation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyProfile;