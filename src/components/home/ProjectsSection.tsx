import { link } from 'fs';
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
  const projects = [
    {
      number: "01",
      title: "News Network",
      year: "2022",
      image: "news-network.png",
      link: 'https://seodirectservice.com',
      description: "You can automate posting of your articles by scheduling posts up to 30 days into the future, saving you time"
    },
    {
      number: "02",
      title: "Oasis Dental Call Center",
      year: "2023",
      image: "oasisdentalcallcenter.png",
      link: 'https://oasisdentalcallcenter.com',
      description: "The Oasis Dental Call Center is currently in its inception phase, having been conceived through the collaboration of the Gabucan brothers."
    },
    {
      number: "03",
      title: "Sparc Mobile",
      year: "2024",
      link: 'https://wesparc.com/',
      image: "wesparc.png",
      description: "Monitoring information to enhance efficiency, reliability, and accessibility for both staff and the general public."
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
            <Link
              to={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              key={index}
              >
                            <div 
              key={index} 
              className="p-12 border-t border-white/10 group cursor-pointer"
            >
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-1">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-sm">
                    {project.number}
                  </div>
                </div>
                <div className="col-span-3">
                  <h3 className="text-3xl font-medium mb-2 group-hover:text-red-600 ">
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
                  <div className="bg-gray-800 h-48 rounded-lg w-full transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-600/10">
                    <img 
                      src={`${project.image}`} 
                      alt={project.title} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
