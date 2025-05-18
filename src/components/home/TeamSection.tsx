import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Alex Morgan",
      title: "Founder & CEO"
    },
    {
      name: "Sarah Chen",
      title: "CTO"
    },
    {
      name: "Michael Rodriguez",
      title: "Lead Developer"
    },
    {
      name: "Jessica Park",
      title: "UX Director"
    },
    {
      name: "David Kim",
      title: "AI Research Lead"
    },
    {
      name: "Zoe Williams",
      title: "Project Manager"
    }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute -left-16 bottom-1/3 w-32 h-32 rounded-full bg-red-600/15 blur-2xl animate-float"></div>
      <div className="absolute -right-16 top-1/4 w-48 h-48 rounded-full bg-blue-500/15 blur-3xl animate-float-slow"></div>
      
      <div className="container-custom relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">Our Team</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl p-4 rounded-lg bg-gray-900/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-gray-800 rounded-md mb-3 overflow-hidden group">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 transition-transform duration-700 group-hover:scale-110"></div>
              </div>
              <h3 className="font-medium text-white">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
