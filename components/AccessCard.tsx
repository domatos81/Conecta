import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AccessTool } from '../types';

interface AccessCardProps {
  tool: AccessTool;
}

export const AccessCard: React.FC<AccessCardProps> = ({ tool }) => {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col p-6 bg-senior-card rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-conecta-cyan/10 hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg bg-slate-900/50 ${tool.colorClass} ring-1 ring-slate-700 group-hover:ring-slate-500 transition-colors`}>
          <tool.icon size={28} />
        </div>
        {tool.badge && (
          <span className="px-2 py-1 text-xs font-semibold text-slate-300 bg-slate-700 rounded-full border border-slate-600">
            {tool.badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-conecta-cyan transition-colors">
        {tool.title}
      </h3>
      
      <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
        {tool.description}
      </p>

      <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-200 transition-colors mt-auto">
        <span>Acessar Portal</span>
        <ExternalLink size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
    </a>
  );
};