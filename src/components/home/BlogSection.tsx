import React from 'react';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogPosts = [
    {
      title: "The Future of Web3 Technology",
      category: "TECH"
    },
    {
      title: "How AI is Revolutionizing Business Operations",
      category: "AI"
    }
  ];

  return (
    <section className="py-16 bg-black text-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">Blog</h2>
          <div className="mt-4 md:mt-0">
            <Link to="/" className="text-sm flex items-center text-gray-400 hover:text-white transition-colors">
              View all <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="border-t border-gray-800 pt-6">
              <div className="text-xs text-gray-500 mb-2">{post.category}</div>
              <h3 className="text-xl font-semibold mb-4 text-white">{post.title}</h3>
              <Link to="/" className="text-sm flex items-center text-red-600 hover:text-red-500">
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
