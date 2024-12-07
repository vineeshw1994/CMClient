import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu for mobile view
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header>
      {/* Navbar Container */}
      <nav className="flex justify-between items-center p-5 bg-gray-900 shadow-lg fixed w-full top-0 z-50">
        {/* Logo */}
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
         MasterConfig
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-white hover:text-green-400 transition duration-300">Home</a>
          <a href="#about" className="text-white hover:text-green-400 transition duration-300">About</a>
          <a href="#services" className="text-white hover:text-green-400 transition duration-300">Services</a>
          <a href="#contact" className="text-white hover:text-green-400 transition duration-300">Contact</a>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white text-3xl"
            onClick={toggleMenu}
            aria-label="Close mobile menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="flex flex-col items-center space-y-8 mt-16">
          <a href="#home" className="text-white text-xl hover:text-green-400 transition duration-300">Home</a>
          <a href="#about" className="text-white text-xl hover:text-green-400 transition duration-300">About</a>
          <a href="#services" className="text-white text-xl hover:text-green-400 transition duration-300">Services</a>
          <a href="#contact" className="text-white text-xl hover:text-green-400 transition duration-300">Contact</a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;


// import React, { useState } from 'react';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   // Toggle mobile menu
//   const toggleMenu = () => setIsOpen(!isOpen);

//   // Toggle profile dropdown menu
//   const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

//   return (
//     <header>
//       {/* Navbar Container */}
//       <nav className="flex justify-between items-center p-5 bg-gray-900 shadow-lg fixed w-full top-0 z-50">
//         {/* Logo */}
//         <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
//           IndustrialCo
//         </div>

//         {/* Desktop Navbar Links */}
//         <div className="hidden md:flex space-x-8">
//           <a href="#home" className="text-white hover:text-green-400 transition duration-300">Home</a>
//           <a href="#about" className="text-white hover:text-green-400 transition duration-300">About</a>
//           <a href="#services" className="text-white hover:text-green-400 transition duration-300">Services</a>
//           <a href="#contact" className="text-white hover:text-green-400 transition duration-300">Contact</a>
//         </div>

//         {/* Profile & Login/Logout Dropdown */}
//         <div className="relative flex items-center space-x-4">
//           {/* Profile Icon */}
//           <button onClick={toggleProfileMenu} className="text-white">
//             <i className="fas fa-user-circle text-3xl"></i>
//           </button>
//           {/* Dropdown Menu */}
//           {isProfileOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
//               <ul>
//                 <li>
//                   <a href="#login" className="block px-4 py-2 text-white hover:bg-gray-700">Login</a>
//                 </li>
//                 <li>
//                   <a href="#logout" className="block px-4 py-2 text-white hover:bg-gray-700">Logout</a>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Mobile Hamburger Icon */}
//         <button
//           className="md:hidden text-white text-3xl"
//           onClick={toggleMenu}
//           aria-label="Toggle mobile menu"
//         >
//           <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
//         </button>
//       </nav>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
//         aria-hidden={!isOpen}
//       >
//         <div className="flex justify-end p-4">
//           <button
//             className="text-white text-3xl"
//             onClick={toggleMenu}
//             aria-label="Close mobile menu"
//           >
//             <i className="fas fa-times"></i>
//           </button>
//         </div>
//         <div className="flex flex-col items-center space-y-8 mt-16">
//           <a href="#home" className="text-white text-xl hover:text-green-400 transition duration-300">Home</a>
//           <a href="#about" className="text-white text-xl hover:text-green-400 transition duration-300">About</a>
//           <a href="#services" className="text-white text-xl hover:text-green-400 transition duration-300">Services</a>
//           <a href="#contact" className="text-white text-xl hover:text-green-400 transition duration-300">Contact</a>
//           {/* Profile Dropdown in Mobile */}
//           <div className="relative">
//             <button onClick={toggleProfileMenu} className="text-white text-xl mt-4">
//               <i className="fas fa-user-circle"></i> Profile
//             </button>
//             {isProfileOpen && (
//               <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
//                 <ul>
//                   <li>
//                     <a href="#login" className="block px-4 py-2 text-white hover:bg-gray-700">Login</a>
//                   </li>
//                   <li>
//                     <a href="#logout" className="block px-4 py-2 text-white hover:bg-gray-700">Logout</a>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;


// import React, { useState } from "react";

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

//   return (
//     <header className="bg-gray-900 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <nav className="flex justify-between items-center py-4">
//           <div className="text-2xl font-bold">MyLogo</div>

//           {/* Desktop Navbar */}
//           <div className="hidden md:flex space-x-8">
//             <a
//               href="#home"
//               className="text-lg hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               Home
//             </a>
//             <a
//               href="#services"
//               className="text-lg hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               Services
//             </a>
//             <a
//               href="#about"
//               className="text-lg hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               About
//             </a>
//             <a
//               href="#contact"
//               className="text-lg hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
//             >
//               Contact
//             </a>
//           </div>

//           {/* Mobile Menu Icon */}
//           <button
//             className="md:hidden flex items-center space-x-2"
//             onClick={toggleMenu}
//           >
//             <span className="block w-6 h-0.5 bg-white"></span>
//             <span className="block w-6 h-0.5 bg-white"></span>
//             <span className="block w-6 h-0.5 bg-white"></span>
//           </button>
//         </nav>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:hidden bg-gray-900 text-white px-4 py-6 space-y-6 transition-all duration-300 ease-in-out transform`}
//       >
//         <a
//           href="#home"
//           className="block text-lg hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           Home
//         </a>
//         <a
//           href="#services"
//           className="block text-lg hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           Services
//         </a>
//         <a
//           href="#about"
//           className="block text-lg hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           About
//         </a>
//         <a
//           href="#contact"
//           className="block text-lg hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           Contact
//         </a>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
