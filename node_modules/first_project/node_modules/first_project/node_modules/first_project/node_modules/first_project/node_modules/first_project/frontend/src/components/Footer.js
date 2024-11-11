import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 text-white bg-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Eshop. All Rights Reserved.
        </p>
        <p className="text-sm">
          <a href="/privacy-policy" className="text-blue-400 hover:text-blue-600">Privacy Policy</a> | 
          <a href="/terms" className="text-blue-400 hover:text-blue-600"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
