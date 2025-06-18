import React, { useEffect, useRef } from 'react';
import styles from './WhyUsSection.module.css';

const WhyUsSection = () => {
  const reasonRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.2 }
    );

    reasonRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      title: "expertise",
      icon: '/expertise-icon.svg',
      description: "Our team of experienced experts have the knowledge and expertise to deliver innovative IT solutions that meet your unique needs."
    },
    {
      title: "technology",
      icon: '/technology-icon.svg',
      description: "We stay up to date with the latest trends and technologies in the IT industry, so you can get the most advanced solutions available."
    },
    {
      title: "solutions",
      icon: '/solutions-icon.svg',
      description: "We take a personalized approach to every project, working closely with you to understand your business and create solutions."
    },
    {
      title: "results",
      icon: '/results-icon.svg',
      description: "Our track record speaks for itself – we've helped businesses of all sizes and industries achieve their goals with our IT solutions."
    }
  ];

  return (
    <section className="text-white py-10 md:py-20 relative z-20 bg-black">
      <div className="container-custom bg-transparent relative z-20 mt-10 md:mt-20">
        <h2 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-10 md:mb-20 text-center">
          Why <span className="text-red-600">Us</span>?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10 md:mb-20 gap-6 md:gap-10 lg:gap-12">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              ref={el => reasonRefs.current[index] = el}
              className={`${styles.reasonCard} flex flex-col items-center text-center p-4 md:p-6 rounded-lg transition-all duration-300 hover:bg-gray-900 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer`}
            >
              <div className="mb-4 md:mb-8">
                <div className={`w-16 h-16 md:w-24 md:h-24 mx-auto opacity-80 ${styles.iconWrapper}`}>
                  <img src={reason.icon} alt={reason.title} className={`w-full h-full object-contain ${styles.icon}`} />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-3 transition-colors duration-300 hover:text-red-600">{reason.title}</h3>
              <p className="text-base md:text-lg text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
