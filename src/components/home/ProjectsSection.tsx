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
    },
    {
      number: "04",
      title: "Re360",
      year: "2025",
      link: 'https://re360.nibbleph.dev/',
      image: "re360.png",
      description: "re360 is a real estate management application, It is designed to help real estate agents and property managers manage their properties, tenants, leases, payments, maintenance, and more."
    }
  ];

  return (
    <section className="bg-black text-white py-10 md:py-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-0">Projects</h2>
          {/* Button commented out in original code */}
        </div>
        
        <div className="space-y-8 md:space-y-16">
          {projects.reverse().map((project, index) => (
            <Link
              to={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              key={index}
              >
                            <div 
              key={index} 
              className="p-6 md:p-12 border-t border-white/10 group cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                <div className="hidden md:block md:col-span-1">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-sm">
                    {project.number}
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3">
                  <h3 className="text-2xl md:text-3xl font-medium mb-2 group-hover:text-red-600">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-400">{project.year}</span>
                </div>
                <div className="col-span-1 md:col-span-4 my-4 md:my-0">
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="col-span-1 md:col-span-4">
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
