import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

// Contact inbox: where "Send Message" submissions should land if the
// database isn't configured yet (or as a manual fallback either way).
const CONTACT_INBOX_EMAIL = 'sales@ofrtelecom.com';

// Fill these in after creating your free Supabase project — see
// supabase/SETUP.md in this project for the full step-by-step guide.
// Dashboard -> Project Settings -> API -> "Project URL" and "anon public" key.
// Both are safe to expose in client-side code: the database only allows
// inserts from this key (see supabase/schema.sql), never reads.
const SUPABASE_URL = ''; // e.g. 'https://xxxxxxxxxxxx.supabase.co'
const SUPABASE_ANON_KEY = ''; // e.g. 'eyJhbGciOi...'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            message: formData.message
          })
        });
        if (res.ok) {
          setStatus('sent');
          setFormData({ name: '', email: '', company: '', message: '' });
          return;
        }
        throw new Error('Supabase insert failed');
      } catch (err) {
        console.error('Contact form: database submission failed, falling back to mailto:', err);
      }
    }

    // Fallback: database isn't configured yet (or the request failed) — open
    // the visitor's email client with the message pre-filled so it still
    // reaches us.
    const subject = encodeURIComponent(`Website enquiry from ${formData.name || 'website visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_INBOX_EMAIL}?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fieldClasses =
    'mt-1 block w-full rounded-md border-2 border-blue-300 bg-blue-50/40 shadow-sm ' +
    'focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors duration-200';

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for inquiries, quotes, or support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Offices</h3>
              
              <div className="space-y-8">
                <div className="border-b pb-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Registered Office</p>
                      <p className="text-gray-600">
                        OFR TELECOM PVT LTD<br />
                        767, SECTOR-29,<br />
                        FARIDABAD-121008,<br />
                        HARYANA
                      </p>
                      <p className="text-gray-600 flex items-center mt-2">
                        <Phone className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        0124-4045351
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Works</p>
                      <p className="text-gray-600">
                        OFR TELECOM PVT LTD<br />
                        F-281, F-282, F-283 &amp; F-284,<br />
                        RIICO Industrial Area, Karoli,<br />
                        ALWAR, RAJASTHAN-301707<br />
                        (India)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Sales Office &ndash; Gurugram</p>
                      <p className="text-gray-600">
                        OFR TELECOM PVT LTD<br />
                        903, 9th Floor, ILD Trade Centre,<br />
                        Sector-47, Sohna Road,<br />
                        GURUGRAM, HARYANA
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                    <a href={`mailto:${CONTACT_INBOX_EMAIL}`} className="ml-4 text-gray-600 hover:text-blue-600">
                      {CONTACT_INBOX_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={fieldClasses}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={fieldClasses}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-5 w-5" />
              </button>

              {status === 'sent' && (
                <div className="flex items-center text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-3">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>
                    Thanks! Your message has been prepared for {CONTACT_INBOX_EMAIL}. If your email app opened, just hit send.
                  </span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>Something went wrong. Please try again or call us directly.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;