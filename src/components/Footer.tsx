
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-6">
              <Link to="/" className="text-xl font-bold flex items-center">
                <img src="/nibble-logo-white.svg" alt="Nibble Logo" className="h-8" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Services</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Projects</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Team</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Case Studies</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Guides</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Connect</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Twitter</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">LinkedIn</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Instagram</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">GitHub</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Privacy</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Terms</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Cookies</Link></li>
                <li><Link to="/" className="text-xs text-gray-400 hover:text-white">Licenses</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© 2023 Nibble Dev Team. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
            <Link to="/" className="hover:text-white">Terms of Service</Link>
            <Link to="/" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
