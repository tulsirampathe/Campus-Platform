/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text = '', speed = 150, pause = 1000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const typeInterval = setInterval(() => {
        setDisplayedText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, speed);
      return () => clearInterval(typeInterval);
    } else {
      const pauseTimeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, pause);
      return () => clearTimeout(pauseTimeout);
    }
  }, [index, text, speed, pause]);

  return <span>{displayedText}</span>;
};

const Features = () => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-8 text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        <TypingEffect text="Why Choose Codenest?" speed={300} pause={2000} />
      </h2>
      <p className="text-gray-700 max-w-lg mx-auto mb-10">
        Our platform is designed to make coding tests easy to administer for teachers and engaging for students.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-md p-6 rounded-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-blue-50 to-teal-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Customizable Tests</h3>
          <p className="text-gray-600">Create tailored coding tests that match your curriculum and students’ needs.</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-blue-50 to-teal-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Real-Time Results</h3>
          <p className="text-gray-600">Get instant results and feedback to understand student progress at a glance.</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-blue-50 to-teal-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Progress Tracking</h3>
          <p className="text-gray-600">Track student improvement over time with detailed reports and analytics.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
