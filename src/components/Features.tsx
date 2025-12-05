import React from 'react';
import { Zap, Shield, Search, Layout } from 'lucide-react';
import { FeatureProps } from '../types';

const features: FeatureProps[] = [
  {
    title: 'Performance Focused',
    description: 'Optimized for speed and efficiency in data processing pipelines.',
    icon: Zap,
  },
  {
    title: 'Type Safe',
    description: 'Leveraging strict typing systems to reduce runtime errors.',
    icon: Shield,
  },
  {
    title: 'Deep Analysis',
    description: 'Going beyond the surface to understand internal mechanisms.',
    icon: Search,
  },
  {
    title: 'Structured Learning',
    description: 'Organized knowledge paths for systematic skill acquisition.',
    icon: Layout,
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-[#1e1f22] border border-white/5 flex items-center justify-center group-hover:border-purple-500/30 group-hover:bg-purple-500/5 transition-colors">
                <feature.icon size={24} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;