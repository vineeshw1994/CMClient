import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-16 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Footer Top Section: About */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 mb-12">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              We are a cutting-edge tech company focused on delivering innovative solutions for a better tomorrow. Our mission is to enhance the way people interact with technology and make lives more efficient.
            </p>
            <a
              href="#about"
              className="text-blue-500 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Learn more &rarr;
            </a>
          </div>

          {/* Footer Middle Section: Quick Links */}
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Right Section: Contact Info */}
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              1234 Tech Street, Silicon Valley, CA, 94016
            </p>
            <p className="text-gray-400 text-sm md:text-base mb-4">
              Email: support@techcompany.com
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              Phone: +1 (800) 123-4567
            </p>
          </div>
        </div>

        {/* Footer Bottom Section: Social Media and Footer Info */}
        <div className="mt-10 border-t border-gray-700 pt-8 flex flex-col items-center md:flex-row justify-between">
          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-6 md:mb-0 animate-fade-in">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-125 hover:rotate-12"
            >
              <i className="fab fa-facebook-f text-3xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-125 hover:rotate-12"
            >
              <i className="fab fa-twitter text-3xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-125 hover:rotate-12"
            >
              <i className="fab fa-instagram text-3xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-125 hover:rotate-12"
            >
              <i className="fab fa-linkedin-in text-3xl"></i>
            </a>
          </div>

          {/* Footer Info */}
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 TechCompany. All Rights Reserved.</p>
            <p className="mt-2">
              Designed by{" "}
              <a href="#me" className="text-blue-500 hover:underline transition-all">
                Your Name
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-40 -z-10 animate-slide-background"></div>
    </footer>
  );
};

export default Footer;
