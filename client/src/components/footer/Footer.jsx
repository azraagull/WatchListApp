import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-white-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  border-t border-white-600 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12">
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">About Us</h2>
            <p className="text-gray-600 leading-relaxed">
              This is the diary of everybody wants to write on it.
            </p>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/home" className="text-gray-600 hover:text-pink-600 transition-colors duration-300">Home</a></li>
              <li><a href="/movies" className="text-gray-600 hover:text-pink-600 transition-colors duration-300">Movies</a></li>
              <li><a href="/tvShows" className="text-gray-600 hover:text-pink-600 transition-colors duration-300">Tv-Shows</a></li>
              <li><a href="/actors" className="text-gray-600 hover:text-pink-600 transition-colors duration-300">Actors</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold text-pink-600 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              123 Street, City, Country
              <br />
              contact@example.com
              <br />
              +123 456 7890
              
            </p>
           <div className="col-span-1 mt-4">
            <a href="#" className="mx-2">
          <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '24px' }} className="text-gray-600 hover:text-pink-600 transition-colors duration-300" />
        </a>
        <a href="#" className="mx-2">
          <FontAwesomeIcon icon={faGithub} style={{ fontSize: '24px' }} className="text-gray-600 hover:text-pink-600 transition-colors duration-300" />
        </a>
        <a href="#" className="mx-2">
          <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '24px' }} className="text-gray-600 hover:text-pink-600 transition-colors duration-300" />
        </a>
        <a href="#" className="mx-2">
          <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '24px' }} className="text-gray-600 hover:text-pink-600 transition-colors duration-300" />
        </a></div>
          </div>
          
        </div>
       
   
        <div className="border-t border-white-600 py-6">
          <p className="text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
