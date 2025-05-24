import React from 'react';

const ProjectsSection = () => {
  const projects = [
    {
      number: "01",
      title: "Lorem Ipsum",
      year: "2022",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      number: "02",
      title: "Lorem Ipsum",
      year: "2022",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      number: "03",
      title: "Lorem Ipsum",
      year: "2022",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ];

  return (
    <section className="bg-black text-white py-20">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-6xl font-bold">Projects</h2>
          <button className="border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center space-x-2">
            <span>READ MORE PROJECTS</span>
            <span className="ml-2">→</span>
          </button>
        </div>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="border-t border-white/10 pt-12 group cursor-pointer"
            >
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-1">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-sm">
                    {project.number}
                  </div>
                </div>
                <div className="col-span-3">
                  <h3 className="text-3xl font-medium mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-400">{project.year}</span>
                </div>
                <div className="col-span-4">
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="col-span-4">
                  <div className="bg-gray-800 h-48 rounded-lg w-full transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-600/10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
