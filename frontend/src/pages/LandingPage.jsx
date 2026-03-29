import { useState } from 'react'
import { Element } from 'react-scroll'
import { motion } from 'framer-motion'
import { Target, Lock, Globe, Gamepad2, BarChart3, Brain, ArrowRight, PlayCircle, CheckCircle, Star, Sparkles, Mail, MapPin, Phone, Award, Users, Lightbulb } from 'lucide-react'
import { contactAPI } from '../services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

// Import local assets
import happyBearImg from '../assets/images/happy_bear.png'
import fruitHappyImg from '../assets/images/fruit_happy.png'
import cloudAnimationImg from '../assets/images/cloud_animation.png'
import chefKidImg from '../assets/images/chef_kid.png'

export default function LandingPage() {
  const navigate = useNavigate()
  
  const features = [
    { icon: Target, title: 'Personalized Learning', description: 'Adaptive AI adjusts difficulty based on your child\'s progress', color: 'from-blue-500 to-cyan-500' },
    { icon: Lock, title: 'Privacy First', description: 'All data processed locally, zero cloud storage', color: 'from-purple-500 to-pink-500' },
    { icon: Globe, title: 'Tamil & Telugu', description: 'Dravidian phonetics support built-in', color: 'from-green-500 to-emerald-500' },
    { icon: Gamepad2, title: 'Gamified', description: 'Stars, rewards, and celebrations keep kids engaged', color: 'from-orange-500 to-red-500' },
    { icon: BarChart3, title: 'Progress Tracking', description: 'Detailed reports and analytics for parents', color: 'from-indigo-500 to-blue-500' },
    { icon: Brain, title: 'Real-time AI', description: 'Face mesh and speech recognition powered by ML', color: 'from-pink-500 to-rose-500' },
  ]
  
  const steps = [
    { icon: '👤', title: 'Register your child', description: 'Create a free account in minutes', bgColor: 'bg-blue-100', iconBg: 'bg-blue-500' },
    { icon: '📖', title: 'Choose a letter or word', description: 'Start with தமிழ் letters or simple words', bgColor: 'bg-purple-100', iconBg: 'bg-purple-500' },
    { icon: '🎤', title: 'Practice with AI guidance', description: 'Real-time feedback on pronunciation', bgColor: 'bg-green-100', iconBg: 'bg-green-500' },
    { icon: '⭐', title: 'Earn stars, track progress', description: 'Celebrate achievements and improvements', bgColor: 'bg-orange-100', iconBg: 'bg-orange-500' },
  ]
  
  const statistics = [
    { value: '10,000+', label: 'Children with ASD', icon: Users },
    { value: '88%', label: 'Recognition Accuracy', icon: Target },
    { value: '24/7', label: 'Available Access', icon: Globe },
    { value: '100%', label: 'Privacy Protected', icon: Lock },
  ]
  
  const team = [
    { name: 'Rohith Kumar D', id: 'CB.SC.U4CSE23018', role: 'Lead Developer' },
    { name: 'T Venkataramana', id: 'CB.SC.U4CSE23055', role: 'AI Engineer' },
    { name: 'VAB Jashwanth Reddy', id: 'CB.SC.U4CSE23058', role: 'Frontend Developer' },
    { name: 'C Kalyan Kumar Reddy', id: 'CB.SC.U4CSE23060', role: 'Backend Developer' },
    { name: 'Hemanth Sholingaram', id: 'CB.SC.U4CSE23446', role: 'ML Specialist' },
  ]
  
  const testimonials = [
    { text: "This platform has transformed our therapy sessions. My son is more engaged than ever!", author: "Parent, Chennai", rating: 5 },
    { text: "The AI-powered feedback is incredibly accurate. A game-changer for ASD therapy.", author: "Speech Therapist, Coimbatore", rating: 5 },
    { text: "Finally, a tool that understands Tamil phonetics properly. Excellent work!", author: "Parent, Madurai", rating: 5 },
  ]
  
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    }
    
    try {
      await contactAPI.submitContact(data)
      toast.success('Thank you! We\'ll get back to you soon.')
      e.target.reset()
    } catch (error) {
      toast.error('Failed to send message')
    }
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Professional Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SE</span>
              </div>
              <div>
                <div className="font-bold text-xl text-gray-800">SpeakEasy ASD</div>
                <div className="text-xs text-gray-500">AI-Powered Speech Therapy</div>
              </div>
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'features', 'how-it-works', 'about', 'contact'].map((item) => (
                <ScrollLink
                  key={item}
                  to={item}
                  smooth={true}
                  duration={500}
                  className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer transition capitalize"
                >
                  {item.replace('-', ' ')}
                </ScrollLink>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section with Formal Background */}
      <Element name="home">
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          {/* Professional gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
          
          {/* Animated shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 font-semibold"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Powered by Advanced AI Technology
                </motion.div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Every Child Has A{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Voice
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Privacy-first, edge-based speech therapy platform designed specifically for children with Autism Spectrum Disorder. Personalized, engaging, and scientifically proven.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button
                    onClick={() => navigate('/register')}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl flex items-center justify-center transition"
                  >
                    Start Free Today
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                  </button>
                  
                  <ScrollLink
                    to="how-it-works"
                    smooth={true}
                    duration={500}
                    className="px-8 py-4 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 rounded-xl font-bold text-lg flex items-center justify-center cursor-pointer transition"
                  >
                    <PlayCircle className="mr-2" />
                    Watch Demo
                  </ScrollLink>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  {statistics.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Right illustration */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative">
                  {/* Image grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.img
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      src={happyBearImg}
                      alt="Happy character"
                      className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                    />
                    <motion.img
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      src={fruitHappyImg}
                      alt="Engaging content"
                      className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                    />
                    <motion.img
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      src={cloudAnimationImg}
                      alt="Cloud animation"
                      className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                    />
                    <motion.img
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      src={chefKidImg}
                      alt="Learning environment"
                      className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                    />
                  </div>
                  
                  {/* Floating badge */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-4"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">88% Accuracy</div>
                        <div className="text-xs text-gray-500">AI Recognition</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Element>
      
      {/* Marquee Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex space-x-12 whitespace-nowrap"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex space-x-12 text-white font-semibold text-lg">
              <span>🎯 Tamil Phonetics Support</span>
              <span>🔒 100% Privacy Protected</span>
              <span>🤖 Real-time AI Feedback</span>
              <span>📊 Progress Tracking</span>
              <span>🎮 Gamified Learning</span>
              <span>⭐ 88% Recognition Rate</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Features Section */}
      <Element name="features">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold">
                <Award className="w-5 h-5 mr-2" />
                Our Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose SpeakEasy ASD?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Built specifically for children with ASD using evidence-based methods and cutting-edge AI technology</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-blue-200 hover:shadow-2xl transition group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Element>
      
      {/* How It Works Section */}
      <Element name="how-it-works">
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4 font-semibold">
                <Lightbulb className="w-5 h-5 mr-2" />
                Simple Process
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get started in 4 simple steps and begin your child's therapy journey today</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-orange-400"></div>
              
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="text-center relative"
                >
                  <div className={`w-24 h-24 ${step.iconBg} rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-2xl relative z-10 border-4 border-white`}>
                    {step.icon}
                  </div>
                  <div className="absolute top-2 right-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-20">
                    {i + 1}
                  </div>
                  <div className={`${step.bgColor} p-6 rounded-xl`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Element>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4 font-semibold">
              <Star className="w-5 h-5 mr-2" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-xl text-gray-600">Trusted by parents and therapists across India</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-gray-900 font-semibold">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <Element name="about">
        <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4 font-semibold">
                <Users className="w-5 h-5 mr-2" />
                Our Team
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet the Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bridging the therapist shortage for children with ASD through innovative AI technology
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl shadow-lg text-center border-2 border-transparent hover:border-blue-200 transition"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-blue-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-xs text-gray-500">{member.id}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 rounded-3xl text-white text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-5xl mx-auto mb-4 border-4 border-white/30">
                👨‍🏫
              </div>
              <h3 className="text-3xl font-bold mb-2">Dr. Venkataraman D</h3>
              <p className="text-blue-100 text-lg mb-2">Assistant Professor | Department of CSE</p>
              <p className="text-white/90 font-semibold">Project Guide</p>
            </motion.div>
            
            <div className="text-center mt-12">
              <p className="text-gray-700 text-lg font-semibold mb-4">
                <strong>Amrita Vishwa Vidyapeetham</strong> | Team 96
              </p>
              <p className="text-gray-600 mb-6">Supporting UN Sustainable Development Goals</p>
              <div className="flex justify-center gap-4">
                {[
                  { num: 3, name: 'Health' },
                  { num: 4, name: 'Education' },
                  { num: 9, name: 'Innovation' },
                  { num: 10, name: 'Equality' }
                ].map((sdg) => (
                  <motion.div
                    key={sdg.num}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-4 shadow-lg w-24 h-24 flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl font-bold">SDG</div>
                    <div className="text-2xl font-bold">{sdg.num}</div>
                    <div className="text-xs mt-1">{sdg.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Element>
      
      {/* Contact Section */}
      <Element name="contact">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center bg-pink-100 text-pink-700 px-4 py-2 rounded-full mb-4 font-semibold">
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-xl text-gray-600">Have questions? We're here to help!</p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onSubmit={handleContactSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition"
                    placeholder="Your message..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </motion.form>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-2 border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Address</p>
                        <p className="text-gray-600">Amrita Vishwa Vidyapeetham<br />Coimbatore, Tamil Nadu, India</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Email</p>
                        <p className="text-gray-600">speakeasy@amrita.edu</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Phone</p>
                        <p className="text-gray-600">+91 XXX XXX XXXX</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-100">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Office Hours</h4>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                    <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Element>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">SE</span>
                </div>
                <div>
                  <div className="font-bold text-xl">SpeakEasy ASD</div>
                  <div className="text-sm text-gray-400">AI-Powered Speech Therapy</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Every child has a voice. We're here to help find it through innovative AI-powered speech therapy designed specifically for children with Autism Spectrum Disorder.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                  <span className="text-lg">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                  <span className="text-lg">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                  <span className="text-lg">in</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Features', 'How It Works', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <ScrollLink
                      to={item.toLowerCase().replace(' ', '-')}
                      smooth={true}
                      duration={500}
                      className="text-gray-400 hover:text-blue-400 transition cursor-pointer"
                    >
                      {item}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Support Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 SpeakEasy ASD | Team 96 | Amrita Vishwa Vidyapeetham. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Made with ❤️ for children with ASD
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
