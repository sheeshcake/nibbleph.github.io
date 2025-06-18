import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  toggleFaq: (index: number) => void;
}

const FaqItem = ({ question, answer, index, isOpen, toggleFaq }: FaqItemProps) => {
  return (
    <motion.div 
      className="border-b border-white/10 py-4 md:py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button 
        className="flex w-full items-center justify-between text-left group"
        onClick={() => toggleFaq(index)}
      >
        <motion.span 
          className="text-xs md:text-sm mr-2 text-gray-400"
          animate={{ color: isOpen ? '#ffffff' : '#9ca3af' }}
          transition={{ duration: 0.3 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
        <span className="text-white text-base md:text-lg flex-grow group-hover:text-gray-300 transition-colors">{question}</span>
        <motion.span 
          className="text-white text-lg md:text-xl w-6 h-6 flex items-center justify-center"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="pt-4 pl-8">
              <motion.p 
                className="text-gray-400"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in a wide range of technologies including React, Vue, Angular for frontend; Node.js, Python, Laravel, and Java for backend; React Native and Flutter for mobile development; and AWS and Azure for cloud solutions."
    },
    {
      question: "How does your project development process work?",
      answer: "Our development process follows an agile methodology with regular sprints and client check-ins. We start with discovery and planning, move to design and development, perform thorough testing, and conclude with deployment and ongoing support."
    },
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on complexity and scope. A simple website might take 4-5 weeks, while a complex application could take 3-6 months. We provide detailed timelines during the initial consultation."
    }
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container-custom">
        <motion.h2 
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Questions
        </motion.h2>
        
        <div className="max-w-3xl">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
              isOpen={openIndex === index}
              toggleFaq={toggleFaq}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;