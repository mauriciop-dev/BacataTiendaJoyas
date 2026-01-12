
import React from 'react';
import { BRAND_LOGO, BRAND_NAME } from '../constants';

interface HeaderProps {
  onNavigate: (view: 'home' | 'product' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md px-6 md:px-20 py-4 transition-all">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="text-primary">{BRAND_LOGO}</div>
          <h2 className="text-[#0c1d16] dark:text-white text-2xl font-bold tracking-tight font-serif uppercase">{BRAND_NAME}</h2>
        </div>
        
        <nav className="hidden lg:flex items-center gap-10">
          <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider">Inicio</button>
          <a href="#" className="hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider">Anillos</a>
          <a href="#" className="hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider">Collares</a>
          <button onClick={() => onNavigate('admin')} className="hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider">Admin</button>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-[#e6f4ef] dark:bg-white/10 rounded-full px-4 py-1.5">
            <span className="material-symbols-outlined text-primary text-xl">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-primary/70 w-32" placeholder="Buscar..." type="text"/>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined">person</span>
            </button>
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors relative">
              <span className="material-symbols-outlined">shopping_bag</span>
              <span className="absolute top-1 right-1 bg-gold text-[10px] text-white font-bold size-4 flex items-center justify-center rounded-full">1</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
