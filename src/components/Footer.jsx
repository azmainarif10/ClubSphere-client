import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='lg:px-20 rounded-2xl py-3'>
    <footer className="bg-gray-700 text-gray-300 pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        
      
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">ClubSphere</h3>
          <p className="text-gray-400 mb-4">
            ClubSphere is your go-to platform for discovering, joining, and managing clubs. Connect, grow, and explore activities across various interests.
          </p>
          <p className="text-gray-500 text-sm">Contact us: support@clubsphere.com</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/clubs" className="hover:text-blue-400 transition">Explore Clubs</a></li>
            <li><a href="/events" className="hover:text-blue-400 transition">Events</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4 mb-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
              <FaLinkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaTwitter size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            Join our community and stay updated with latest clubs and events.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ClubSphere. All Rights Reserved.
      </div>
    </footer>
    </div>
  );
};

export default Footer;
