import React from 'react';
import { useNavigate } from "react-router-dom";

function NotFound() {
  const router = useNavigate();

  const handleGoBack = () => {
    router('/');
  };

  return (
    <section
      className="relative flex items-center justify-center flex-col  h-auto md:h-[92vh] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url("/images/globe.jpg")`,
      }}
      data-aos="zoom-in-right"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-co-primary opacity-60"></div>
      
      {/* Error Message */}
      <div
        className="relative flex flex-col items-center justify-center md:justify-between gap-0 z-10 mt-20"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
      <h1 className="text-6xl font-bold text-white mb-4">Oops!</h1>
      <p className="text-2xl text-white mb-8">We can't seem to find the page you're looking for.</p>
      
      {/* Back to Home Button */}
      <button 
        onClick={handleGoBack}
        className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
      >
        Go Back Home
      </button>
      </div>

    </section>
  );
}

export default NotFound;
