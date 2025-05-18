import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Complete rebuild of a major retail platform with improved user experience and performance."
    },
    {
      title: "Healthcare Dashboard",
      description: "Data visualization tools for healthcare providers to monitor and improve patient outcomes."
    },
    {
      title: "Fintech Mobile App",
      description: "Secure and intuitive mobile application for personal finance management and investments."
    }
  ];

  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute left-0 top-1/3 w-32 h-32 rounded-full bg-red-600/20 blur-2xl animate-float-slow"></div>
      <div className="absolute right-0 bottom-1/4 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl animate-float"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">Projects</h2>
          <div className="hidden md:block">
            <div className="flex space-x-2">
              <button className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center transition-colors hover:bg-white/10">
                <span>←</span>
              </button>
              <button className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center transition-colors hover:bg-white/10">
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="border-t border-white/10 py-6 transition-all duration-300 hover:bg-white/5 group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <div className="h-3 w-3 rounded-full bg-red-600 mr-3 group-hover:animate-pulse"></div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 max-w-xl">{project.description}</p>
                </div>
                <div className="bg-gray-800 h-16 md:h-24 w-full md:w-64 rounded transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-600/10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
