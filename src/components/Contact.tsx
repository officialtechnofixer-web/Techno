import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Linkedin, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "919265627252";
    const message = `New contact form submission:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Message: ${formData.message}

Please respond to this inquiry.`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    setShowContactOptions(false);
  };

  const handleEmailClick = () => {
    const subject = `Contact Form: ${formData.service} - ${formData.firstName} ${formData.lastName}`;
    const body = `New contact form submission:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Message: ${formData.message}

Please respond to this inquiry.`;

    const mailtoURL = `mailto:officialtechnofixer@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoURL);
    setShowContactOptions(false);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-800 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to fix your tech problems or upgrade your IT infrastructure?
            Contact us today for fast, reliable service.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">+91 9265627252</p>
                  <p className="text-sm text-blue-400">Emergency Hotline Available 24/7</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-green-600 p-3 rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">officialtechnofixer@gmail.com</p>
                  <p className="text-sm text-green-400">We respond within 2 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-600 dark:text-gray-300">Ahmedabad, Gujarat, India</p>
                  <p className="text-sm text-purple-400">Serving clients across Gujarat</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-orange-600 p-3 rounded-lg">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold">Business Hours</h4>
                  <p className="text-gray-600 dark:text-gray-300">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-sm text-orange-400">Emergency support available 24/7</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-8">
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/techno-fixer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 hover:bg-blue-600 p-3 rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/techno.fixer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-700 hover:bg-pink-600 p-3 rounded-lg transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://www.facebook.com/share/1772gXYzaV/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 p-3 rounded-lg transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl dark:shadow-none transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-300"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-300"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-300"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">
                  Service Type
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-colors duration-300"
                >
                  <option value="">Select a service</option>
                  <option value="laptop-repair">Laptop Repair</option>
                  <option value="computer-repair">Computer Repair</option>
                  <option value="network-setup">Network Setup</option>
                  <option value="custom-build">Custom PC Build</option>
                  <option value="business-it">Business IT Solutions</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 resize-none transition-colors duration-300"
                  placeholder="Describe your tech issue or requirements..."
                ></textarea>
              </div>

              <button
                type="button"
                onClick={() => setShowContactOptions(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4 text-white">Need Immediate Assistance?</h3>
          <p className="text-blue-100 mb-6">
            Our emergency support team is available 24/7 for critical IT issues
          </p>
          <button
            onClick={() => {
              // Copy primary contact number to clipboard
              navigator.clipboard.writeText('+91 9265627252').then(() => {
                // Show success message (optional)
                console.log('Emergency hotline number copied to clipboard');
                // Automatically open phone dialer
                window.location.href = 'tel:+919265627252';
              }).catch(err => {
                console.error('Failed to copy number:', err);
                // Still open phone dialer even if copy fails
                window.location.href = 'tel:+919265627252';
              });
            }}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Call Emergency Hotline
          </button>
        </div>
      </div>

      {/* Contact Options Modal */}
      {showContactOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-md w-full mx-4 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Choose Contact Method</h3>

            <div className="space-y-4">
              {/* WhatsApp Option */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex items-center justify-center space-x-3 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
                <span className="font-semibold">Contact via WhatsApp</span>
              </button>

              {/* Email Option */}
              <button
                onClick={handleEmailClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex items-center justify-center space-x-3 transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="font-semibold">Send Email</span>
              </button>

              {/* Cancel Button */}
              <button
                onClick={() => setShowContactOptions(false)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;