import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock password for demo purposes
    if (password === 'TercaAdmin2026') {
      onLogin();
      setPassword('');
      setError('');
    } else {
      setError('Senha incorreta.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-conecta-cyan/10 flex items-center justify-center text-conecta-cyan">
              <Lock size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Acesso Restrito</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-slate-400 mb-6 text-sm">
            Área exclusiva para gestão do portal. Insira a senha administrativa para continuar.
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Senha de Administrador
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-conecta-cyan focus:ring-1 focus:ring-conecta-cyan transition-all"
              placeholder="••••••••"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-medium bg-conecta-cyan text-slate-900 hover:bg-cyan-400 transition-colors shadow-lg shadow-conecta-cyan/20"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
