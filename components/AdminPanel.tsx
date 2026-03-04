import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { NewsItem } from '../types';

interface AdminPanelProps {
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ news, setNews, onBack }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<NewsItem>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = () => {
    if (isEditing) {
      setNews(news.map(item => item.id === isEditing ? { ...item, ...editForm } as NewsItem : item));
      setIsEditing(null);
    } else if (isAdding) {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        type: editForm.type as NewsItem['type'] || 'info',
        title: editForm.title || '',
        message: editForm.message || '',
        date: editForm.date || new Date().toLocaleDateString('pt-BR')
      };
      setNews([newItem, ...news]);
      setIsAdding(false);
    }
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este aviso?')) {
      setNews(news.filter(item => item.id !== id));
    }
  };

  const startEdit = (item: NewsItem) => {
    setIsEditing(item.id);
    setEditForm(item);
    setIsAdding(false);
  };

  const startAdd = () => {
    setIsAdding(true);
    setIsEditing(null);
    setEditForm({
      type: 'info',
      date: new Date().toLocaleDateString('pt-BR')
    });
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm({});
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          </div>
          <button 
            onClick={startAdd}
            disabled={isAdding || isEditing !== null}
            className="flex items-center gap-2 bg-conecta-cyan text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            Novo Aviso
          </button>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-lg font-semibold">Gestão de Avisos (News Feed)</h2>
            <p className="text-sm text-slate-400 mt-1">Gerencie os avisos que aparecem na página inicial do portal.</p>
          </div>

          <div className="p-6">
            {(isAdding || isEditing) && (
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 mb-8">
                <h3 className="text-lg font-medium mb-4">{isAdding ? 'Novo Aviso' : 'Editar Aviso'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Título</label>
                    <input 
                      type="text" 
                      value={editForm.title || ''}
                      onChange={e => setEditForm({...editForm, title: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-conecta-cyan"
                      placeholder="Ex: Manutenção Programada"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Tipo</label>
                    <select 
                      value={editForm.type || 'info'}
                      onChange={e => setEditForm({...editForm, type: e.target.value as NewsItem['type']})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-conecta-cyan"
                    >
                      <option value="info">Informação (Azul)</option>
                      <option value="maintenance">Manutenção (Laranja)</option>
                      <option value="feature">Novidade (Verde)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-1">Mensagem</label>
                    <textarea 
                      value={editForm.message || ''}
                      onChange={e => setEditForm({...editForm, message: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-conecta-cyan min-h-[100px]"
                      placeholder="Detalhes do aviso..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Data</label>
                    <input 
                      type="text" 
                      value={editForm.date || ''}
                      onChange={e => setEditForm({...editForm, date: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-conecta-cyan"
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={cancelEdit}
                    className="px-4 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={!editForm.title || !editForm.message}
                    className="flex items-center gap-2 bg-conecta-cyan text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    Salvar
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {news.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  Nenhum aviso cadastrado.
                </div>
              ) : (
                news.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
                    <div className="flex-1 mb-4 md:mb-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.type === 'maintenance' ? 'bg-orange-500/10 text-orange-400' : 
                          item.type === 'feature' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          {item.type === 'maintenance' ? 'Manutenção' : 
                           item.type === 'feature' ? 'Novidade' : 'Info'}
                        </span>
                        <h4 className="font-bold text-slate-200">{item.title}</h4>
                        <span className="text-xs text-slate-500 font-mono ml-auto md:ml-0">{item.date}</span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2">{item.message}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 md:ml-6 border-t border-slate-800 md:border-t-0 pt-3 md:pt-0">
                      <button 
                        onClick={() => startEdit(item)}
                        disabled={isAdding || isEditing !== null}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        disabled={isAdding || isEditing !== null}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
