import React from 'react';
import { Database, Coffee, ArrowUpRight, BookOpen } from 'lucide-react';
import { TechCardProps } from '../types';

const Card: React.FC<TechCardProps> = ({ title, description, icon: Icon, href, gradient, tags }) => (
  <a
    href={href}
    className="group relative flex flex-col bg-[#19191c] rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
  >
    {/* Gradient Overlay on Hover */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${gradient}`} />

    <div className="relative z-10 flex justify-between items-start mb-6">
      <div className={`p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors`}>
        <Icon size={32} className="text-white" />
      </div>
      <ArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" />
    </div>

    <h3 className="relative z-10 text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
      {title}
    </h3>
    <p className="relative z-10 text-gray-400 mb-8 leading-relaxed">
      {description}
    </p>

    <div className="relative z-10 mt-auto flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5">
          {tag}
        </span>
      ))}
    </div>
  </a>
);

const TechCards: React.FC = () => {
  return (
    <section id="docs" className="py-20 px-6 bg-[#0c0c0d]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Documentation</h2>
            <p className="text-gray-400 max-w-xl">
              Deep dives into core technologies. Select a topic to explore my personal learning notes and technical references.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-white/10 to-transparent mx-8 mb-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: ClickHouse */}
          <Card
            title="ClickHouse 学习笔记"
            description="High-performance OLAP database management. Notes on optimization, materialized views, and cluster management."
            icon={Database}
            href="/post/ClickHouse学习笔记.md"
            gradient="from-yellow-400 to-orange-600"
            tags={['OLAP', 'Big Data', 'SQL', 'Optimization']}
          />

          {/* Card 2: Java */}
          <Card
            title="Java 基础"
            description="Core concepts of Java programming. Covering JVM internals, concurrency, collections framework, and best practices."
            icon={Coffee}
            href="/post/java基础知识_fixed.md"
            gradient="from-red-500 to-pink-600"
            tags={['JVM', 'Backend', 'Concurrency', 'OOP']}
          />
        </div>
        
        {/* Secondary Links / More Placeholder */}
        <div className="mt-6 p-6 rounded-2xl bg-[#19191c] border border-white/5 flex items-center justify-between group hover:border-white/20 transition-colors cursor-pointer">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold">More Archives</h4>
                <p className="text-sm text-gray-500">Explore older posts and algorithms</p>
              </div>
           </div>
           <ArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" />
        </div>

      </div>
    </section>
  );
};

export default TechCards;