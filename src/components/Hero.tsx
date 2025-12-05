import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-300 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            Knowledge Base
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1]">
            Build better <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-white">
              software faster.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
            A curated collection of technical notes, deep dives, and best practices for modern backend engineering.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="#docs"
              className="px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              Explore Docs
              <ArrowRight size={18} />
            </a>
            <a 
              href="https://github.com"
              className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Right Visual - Abstract Code Representation */}
        <div className="relative hidden lg:block">
           {/* Decorative Grid */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
           
           <div className="relative z-10 bg-[#1e1f22] border border-white/10 rounded-xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-xs text-gray-500 font-mono">MyTechStack.java</span>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="text-gray-400">
                  <span className="text-purple-400">public class</span> <span className="text-yellow-200">Engineer</span> <span className="text-gray-300">{`{`}</span>
                </div>
                <div className="pl-4 text-gray-400">
                  <span className="text-purple-400">private final</span> List&lt;String&gt; skills = List.of(
                </div>
                <div className="pl-8 text-green-300">
                  "Java", "ClickHouse", "React", "System Design"
                </div>
                <div className="pl-4 text-gray-400">);</div>
                <div className="pl-4 text-gray-400 pt-2">
                  <span className="text-purple-400">public void</span> <span className="text-blue-300">learn</span>() <span className="text-gray-300">{`{`}</span>
                </div>
                <div className="pl-8 text-gray-500">// Constant improvement</div>
                <div className="pl-8 text-white">
                  Documentation.read(<span className="text-orange-400">"Deep Dive"</span>);
                </div>
                <div className="pl-4 text-gray-300">{`}`}</div>
                <div className="text-gray-300">{`}`}</div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-cyan-500 p-4 rounded-xl shadow-lg animate-pulse-slow">
                 <Code2 size={32} className="text-white" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;