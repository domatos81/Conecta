import React from 'react';
import { AlertCircle, Info, Zap } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsFeedProps {
  news: NewsItem[];
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ news }) => {
  const getIcon = (type: NewsItem['type']) => {
    switch (type) {
      case 'maintenance': return <AlertCircle size={18} className="text-orange-400" />;
      case 'feature': return <Zap size={18} className="text-green-400" />;
      case 'info': return <Info size={18} className="text-blue-400" />;
    }
  };

  const getBorderColor = (type: NewsItem['type']) => {
    switch (type) {
      case 'maintenance': return 'border-l-orange-500';
      case 'feature': return 'border-l-green-500';
      case 'info': return 'border-l-blue-500';
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-conecta-cyan rounded-full"></span>
        Novidades e Atualizações
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {news.map((item) => (
          <div 
            key={item.id}
            className={`bg-slate-900/50 border border-slate-800 ${getBorderColor(item.type)} border-l-4 rounded-r-lg p-4 hover:bg-slate-800 transition-colors`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  item.type === 'maintenance' ? 'text-orange-400' : 
                  item.type === 'feature' ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {item.type === 'maintenance' ? 'Manutenção' : 
                   item.type === 'feature' ? 'Novidade' : 'Info'}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">{item.date}</span>
            </div>
            
            <h4 className="font-bold text-slate-200 text-sm mb-1">{item.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};