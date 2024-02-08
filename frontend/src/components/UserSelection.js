

import React, { useState, useEffect } from 'react';
import Primal from '../assets/Primal.jpeg';
import Vac from '../assets/Vac.jpeg';
import { FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserSelection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Primal, Vac];
  const [whatsappPopupVisible, setWhatsappPopupVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="flex flex-col sm:flex-row justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        transition: 'background-image 1s ease',
      }}
    >
      <div className="whatsapp-button">
        <a
          href={`https://api.whatsapp.com/send?phone=+94779951732`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn4.iconfinder.com/data/icons/miu-square-flat-social/60/whatsapp-square-social-media-512.png"
            alt="WhatsApp Icon"
            className="whatsapp-icon"
          />
        </a>
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center justify-center min-h-1/2-screen"> {/* Decrease min-h-screen */}
        <FaUserCog className="text-yellow-500 text-4xl" />
        <h2 className="text-2xl sm:text-4xl mb-4 sm:mb-6 text-center text-green-700 font-bold">
          SELECT USER TYPES
        </h2>
        <div className="flex justify-center w-full space-x-4"> {/* Increase spacing between buttons with space-x */}
          <Link to="/feedback" className="text-center">
            <button className="p-2 sm:p-4 h-16 bg-yellow-500 rounded-lg text-white shadow-lg hover:bg-green-700 hover:font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Customer Feedback
            </button>
          </Link>
         
          <Link to="/login" className="text-center">
            <button className="p-2 sm:p-4 h-16 bg-yellow-500 rounded-lg text-white shadow-lg hover:bg-green-700 hover:font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-green-500">
              Pharmacist
            </button>
          </Link>

          {/* <Link to="/doc-admin">
            <div className="text-center">
              <button className="p-2 sm:p-4 w-full h-20 bg-yellow-500 rounded-lg text-white shadow-lg hover:bg-green-700 hover:font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Login
              </button>
            </div>
          </Link> */}

<Link to="/doc-admin" className="text-center">
            <button className="p-2 sm:p-4 h-16 bg-yellow-500 rounded-lg text-white shadow-lg hover:bg-green-700 hover:font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-green-500">
              Doctor&Pharmacy Login
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default UserSelection;
