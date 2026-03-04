import React, { useState, useMemo } from 'react';
import { Search, Globe, Menu, X } from 'lucide-react';
import { ACCESS_TOOLS } from './constants';
import { AccessCard } from './components/AccessCard';
import { Category, AccessTool } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter logic
  const filteredTools = useMemo(() => {
    return ACCESS_TOOLS.filter(tool => {
      const searchLower = searchTerm.toLowerCase();
      return (
        tool.title.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.category.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm]);

  // Group by category
  const groupedTools = useMemo(() => {
    const groups: Partial<Record<Category, AccessTool[]>> = {};
    
    // Initialize groups in specific order if desired, or just iterate
    Object.values(Category).forEach(cat => {
      groups[cat] = filteredTools.filter(t => t.category === cat);
    });
    
    return groups;
  }, [filteredTools]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-conecta-cyan/10 to-transparent pointer-events-none" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logos */}
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-3">
                 {/* Recreating the Conecta logo feel with CSS since we can't guarantee external image loading */}
                 <div className="relative w-10 h-10 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-conecta-cyan rounded-full opacity-80"></div>
                    <div className="absolute right-0 top-1 w-2 h-2 bg-conecta-cyan rounded-full"></div>
                    <span className="text-xl font-bold text-conecta-cyan relative z-10">C</span>
                 </div>
                 <div className="hidden sm:block">
                   <h1 className="text-2xl font-bold text-white tracking-tight">
                     Conecta
                     <span className="text-conecta-cyan">Portal</span>
                   </h1>
                 </div>
               </div>
               
               <div className="hidden md:block w-px h-8 bg-slate-700 mx-2"></div>
               
               <div className="hidden md:flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                  {/* Text representation of the partner logos if images fail */}
                  <span className="font-bold text-lg text-senior-blue tracking-tighter">TERCA</span>
                  <span className="font-bold text-lg text-senior-green tracking-tighter">TERCALog</span>
               </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500 group-focus-within:text-conecta-cyan transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-900 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:border-conecta-cyan focus:ring-1 focus:ring-conecta-cyan sm:text-sm transition-all"
                  placeholder="Buscar ferramentas (TMS, Senior Flow, Senha...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* User/Date info (Mock) */}
            <div className="hidden md:flex items-center gap-4 text-sm text-slate-400">
              <div className="flex flex-col items-end">
                <span className="text-slate-200 font-medium">Bem-vindo(a)</span>
                <span className="text-xs">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900 p-4 space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-conecta-cyan"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full z-10">
        
        {/* Intro Section */}
        {!searchTerm && (
          <div className="animate-fade-in">
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
                Acessos <span className="text-transparent bg-clip-text bg-gradient-to-r from-senior-green to-conecta-cyan">Corporativos</span>
              </h2>
              <p className="mt-2 text-lg text-slate-400 max-w-2xl">
                Centralize suas operações. Acesse todas as ferramentas Senior, gestão de usuários e documentação em um único lugar.
              </p>
            </div>
          </div>
        )}

        {/* Grid Categories */}
        <div className="space-y-16">
          {Object.entries(groupedTools).map(([category, tools]) => {
            const categoryTools = tools as AccessTool[];
            if (!categoryTools || categoryTools.length === 0) return null;

            return (
              <section key={category} className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-2">
                  <Globe className="text-conecta-cyan" size={20} />
                  <h3 className="text-xl font-bold text-slate-200">{category}</h3>
                  <span className="ml-auto text-xs font-mono text-slate-600 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {categoryTools.length} Links
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTools.map((tool) => (
                    <AccessCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}

          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4 text-slate-500">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-300">Nenhum resultado encontrado</h3>
              <p className="text-slate-500 mt-2">Tente buscar por outro termo como "TMS" ou "Senha".</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-slate-500 text-sm">© {new Date().getFullYear()} Grupo Terca / Zilli. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-6 text-slate-600 text-sm">
             <a href="#" className="hover:text-conecta-cyan transition-colors">Suporte TI</a>
             <a href="#" className="hover:text-conecta-cyan transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;