import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-8 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-300">
      {/* Enhanced Title Section */}
      <section className="mb-8 animate-fadeIn">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 drop-shadow-lg mb-2">
          About Codenest
        </h1>
        <p className="text-2xl text-gray-400 max-w-4xl">
          Your destination for effective, accessible coding assessments. Codenest is designed to support educators and engage students with a user-friendly, results-driven platform.
        </p>
      </section>

      {/* Project Description */}
      <section className="my-12 bg-gray-700 bg-opacity-50 p-8 rounded-lg animate-fadeIn">
        <h2 className="text-3xl font-semibold text-white mb-4">Project Description</h2>
        <p className="text-lg leading-relaxed text-gray-400">
          Codenest is a web-based application designed to support educators in creating, managing, and analyzing coding tests. Our platform allows teachers to effortlessly administer coding exams while providing students with a user-friendly interface to showcase their skills. With Codenest, assessment becomes more efficient and insightful.
        </p>
      </section>

      {/* Mission */}
      <section className="my-12 bg-gray-700 bg-opacity-50 p-8 rounded-lg animate-fadeIn">
        <h2 className="text-3xl font-semibold text-white mb-4">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-400">
          Our mission is to create an innovative solution for educational institutions that supports the growth of the next generation of developers. We believe in bridging the gap between learning and application through effective tools that make the assessment process fair, objective, and accessible.
        </p>
      </section>

      {/* Key Features */}
      <section className="my-12 animate-fadeIn">
        <h2 className="text-3xl font-semibold text-white mb-4">Key Features</h2>
        <ul className="list-disc list-inside text-lg text-gray-400 space-y-2">
          <li>Customizable test creation tailored to any curriculum.</li>
          <li>Real-time results for immediate feedback.</li>
          <li>Comprehensive progress tracking with analytics.</li>
          <li>Interactive UI that is easy for both students and educators.</li>
        </ul>
      </section>

     {/* Testimonials */}
     <section className="my-12 px-8 py-6 bg-gray-800 rounded-lg shadow-lg animate-fadeIn">
        <h2 className="text-3xl font-semibold text-gray-300 mb-4">What Users Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-700 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:bg-gray-600">
            <p className="text-lg text-gray-300">"Codenest has completely transformed the way we conduct our coding assessments. It's intuitive and saves so much time!"</p>
            <p className="text-right font-semibold mt-2 text-yellow-400">- Khoshbo Bharadwaj, Educator</p>
          </div>
          <div className="bg-gray-700 p-6 shadow-md rounded-lg transition-transform transform hover:scale-105 hover:bg-gray-600">
            <p className="text-lg text-gray-300">"As a student, I love how easy it is to navigate the tests on Codenest. It takes the stress out of coding exams!"</p>
            <p className="text-right font-semibold mt-2 text-yellow-400">- Pawan Tiwari, Student</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
