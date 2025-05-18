import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      title: "Web Development",
      description: "Building responsive, scalable websites and applications."
    },
    {
      title: "Mobile Development",
      description: "Creating native and cross-platform mobile apps."
    },
    {
      title: "Quality Assurance",
      description: "Ensuring flawless functionality and user experience."
    },
    {
      title: "Database Architecture",
      description: "Designing efficient data structures and systems."
    },
    {
      title: "Artificial Intelligence",
      description: "Implementing machine learning and AI solutions."
    }
  ];

  return (
    <section className="bg-gray-900 py-20 relative overflow-hidden">
      {/* Floating shape */}
      <div className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-red-600/10 blur-2xl animate-float"></div>
      <div className="absolute -right-20 bottom-1/4 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl animate-float-slow"></div>
      
      <div className="container-custom relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Services</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg transition-all border border-gray-700 duration-300 hover:shadow-xl hover:-translate-y-1 group bg-black/30`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              <h3 className={`text-xl font-bold mb-2 text-white relative z-10`}>{service.title}</h3>
              <p className={`text-sm text-gray-400 relative z-10`}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
