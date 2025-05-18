import React from 'react';

const CtaSection = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container-custom">
        <div className="bg-gray-800/50 border border-gray-700 text-white p-10 md:p-16 rounded-3xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Ready to take <br />
            your <span className="italic">business</span> to <br />
            the next <span className="text-red-600">level</span>?
          </h2>
          
          <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-red-700 transition-colors">
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
