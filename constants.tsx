import { 
  Building2, 
  Truck, 
  KeyRound, 
  ShieldCheck, 
  LayoutGrid, 
  BookOpen, 
  GraduationCap, 
  Server
} from 'lucide-react';
import { AccessTool, Category } from './types';

export const ACCESS_TOOLS: AccessTool[] = [
  // CORE SYSTEMS
  {
    id: 'erp-hcm',
    title: 'ERP & HCM Cloud',
    description: 'Acesso geral ao sistema de gestão empresarial e recursos humanos (Vega).',
    url: 'https://vega.seniorcloud.com.br/',
    category: Category.CORE,
    icon: Building2,
    colorClass: 'text-blue-400 group-hover:text-blue-300',
    badge: 'Diário'
  },
  {
    id: 'tms-cloud',
    title: 'TMS Cloud',
    description: 'Sistema de gestão de transportes e logística. Acesso via RDWeb.',
    url: 'https://cloudtms.senior.com.br/RDWeb/webclient/',
    category: Category.CORE,
    icon: Truck,
    colorClass: 'text-green-400 group-hover:text-green-300',
    badge: 'Logística'
  },
  {
    id: 'senior-x',
    title: 'Senior X / Senior Flow',
    description: 'Plataforma integrada Senior X para fluxo de processos, BPM e gestão de identidade.',
    url: 'https://platform.senior.com.br/',
    category: Category.CORE,
    icon: LayoutGrid,
    colorClass: 'text-purple-400 group-hover:text-purple-300'
  },

  // ADMIN / ACCESS
  {
    id: 'flow-reset-erp',
    title: 'FlowReset: ERP & Cloud',
    description: 'Ferramenta para criação de usuários de rede e redefinição de senhas do ambiente ERP.',
    url: 'https://ocflow-s1.seniorcloud.com.br:3000/login',
    category: Category.ADMIN,
    icon: KeyRound,
    colorClass: 'text-orange-400 group-hover:text-orange-300',
    badge: 'Admin'
  },
  {
    id: 'flow-reset-tms',
    title: 'FlowReset: TMS',
    description: 'Gestão exclusiva de usuários e senhas para o ambiente TMS (Transporte).',
    url: 'https://senioruser-st.seniorcloud.com.br/login',
    category: Category.ADMIN,
    icon: ShieldCheck,
    colorClass: 'text-yellow-400 group-hover:text-yellow-300',
    badge: 'Admin'
  },
  {
    id: 'gestao-ti',
    title: 'Gestão Senior Cloud',
    description: 'Painel de gestão de TI e acessos da Senior Cloud.',
    url: 'https://gestao.seniorcloud.com.br/auth/login',
    category: Category.ADMIN,
    icon: Server,
    colorClass: 'text-indigo-400 group-hover:text-indigo-300',
    badge: 'Admin'
  },

  // KNOWLEDGE
  {
    id: 'docs',
    title: 'Documentação Senior',
    description: 'Manuais técnicos, notas da versão, help e guias de usuário.',
    url: 'https://documentacao.senior.com.br/',
    category: Category.KNOWLEDGE,
    icon: BookOpen,
    colorClass: 'text-cyan-400 group-hover:text-cyan-300'
  },
  {
    id: 'university',
    title: 'Universidade Senior',
    description: 'Portal de treinamentos, cursos e certificações corporativas.',
    url: 'https://ucsonline.senior.com.br/',
    category: Category.KNOWLEDGE,
    icon: GraduationCap,
    colorClass: 'text-pink-400 group-hover:text-pink-300'
  }
];

export const LOGOS = {
  terca: "https://cdn.jsdelivr.net/gh/domatos81/Conecta@main/Prancheta%20111.png", 
  terca_full: "https://image.pollinations.ai/prompt/Logo%20Terca%20Zilli%20Armazens%20blue%20green?width=300&height=100&nologo=true",
  tercalog: "https://cdn.jsdelivr.net/gh/domatos81/Conecta@main/tercalog%20logo.png",
  conecta: "https://cdn.jsdelivr.net/gh/domatos81/Conecta@main/Prancheta%202.png"
};