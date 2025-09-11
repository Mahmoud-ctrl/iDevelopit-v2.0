'use client';

import React, { useState } from 'react';
import { motion, easeOut } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Phone, Share2, Clock, CheckCircle } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-green-500/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-400" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Message Sent Successfully!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-gray-400 text-lg"
          >
            We&apos;ll get back to you within 24 hours.
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="contact" className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div> */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 py-20"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s <span className="bg-white text-black px-2 py-1 rounded-md">Talk</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to transform your ideas into reality? Get in touch with our expert team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="rounded-lg p-3 mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Call Us</h3>
                  <p className="text-gray-400">
                    <a href="tel:+96171736695">71 736695</a> - <a href="tel:+96181943978">81 943978</a>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="rounded-lg p-3 mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email Us</h3>
                  <p className="text-gray-400"><a href="mailto:contact@idevelopit.dev">contact@idevelopit.dev</a></p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="rounded-lg p-3 mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Business Hours</h3>
                  <p className="text-gray-400">Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>
            </motion.div>

            
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-6"
            >
            <div className="flex items-center mb-4">
                <div className="rounded-lg p-3 mr-4 bg-white/10">
                    <Share2 className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-white font-semibold">Follow Us</h3>
                    <div className="flex space-x-4 mt-2 text-xl text-white">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="hover:text-blue-500 transition-colors duration-200" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="hover:text-pink-500 transition-colors duration-200" />
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok className="hover:text-gray-300 transition-colors duration-200" />
                        </a>
                    </div>
                </div>
            </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <motion.div
              variants={cardVariants}
              className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'name' ? 'text-white' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Your Name"
                        required
                        className="w-full bg-black/20 border border-white/20 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      />
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'email' ? 'text-white' : 'text-gray-500'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        placeholder="your@email.com"
                        required
                        className="w-full bg-black/20 border border-white/20 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'phone' ? 'text-white' : 'text-gray-500'
                      }`} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Your Phone Number"
                        className="w-full bg-black/20 border border-white/20 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      />
                    </div>
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField('')}
                      required
                      className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-4 text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-black/70">Select a Service</option>
                      <option value="web-development" className="bg-black/70">Web Development</option>
                      <option value="mobile-app" className="bg-black/70">Mobile App</option>
                      <option value="ui-ux-design" className="bg-black/70">UI/UX Design</option>
                      <option value="consulting" className="bg-black/70">Consulting</option>
                      <option value="other" className="bg-black/70">Other</option>
                    </select>
                  </motion.div>
                </div>

                {/* Message Field */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative"
                >
                  <div className="relative">
                    <MessageSquare className={`absolute left-3 top-4 w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'message' ? 'text-blue-400' : 'text-gray-500'
                    }`} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Tell us about your project..."
                      rows={6}
                      required
                      className="w-full bg-black/20 border border-white/20 rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 resize-none"
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-white font-semibold py-4 px-8 border border-white/20 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black rounded-lg cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;