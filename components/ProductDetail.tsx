
import React, { useState } from 'react';
import { Product } from '../types';
import { CURRENCY_SYMBOL } from '../constants';

interface ProductDetailProps {
  product: Product;
  onOpenAssistant: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onOpenAssistant }) => {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 py-8 animate-fadeIn">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-sm text-primary/70">
        <span className="hover:text-primary cursor-pointer">Inicio</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="hover:text-primary cursor-pointer">Anillos</span>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-slate-900 dark:text-slate-100 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm group">
            <div 
              className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url("${product.image_urls[activeImg] || 'https://picsum.photos/800/1000'}")` }}
            ></div>
            <div className="absolute bottom-4 right-4">
              <button className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.image_urls.map((url, i) => (
              <div 
                key={i}
                onClick={() => setActiveImg(i)}
                className={`size-24 flex-shrink-0 border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${activeImg === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${url}")` }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-sans font-medium text-primary">{CURRENCY_SYMBOL}{product.price.toLocaleString()} {product.currency}</p>
              <span className="text-xs uppercase tracking-widest text-primary/50 font-bold bg-primary/10 px-2 py-0.5 rounded">Exclusivo</span>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Specs */}
          <div className="border-y border-slate-200 dark:border-slate-800 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold">diamond</span>
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Gema</span>
              </div>
              <span className="font-display font-medium">{product.gem_type}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold">monitor_weight</span>
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Quilates</span>
              </div>
              <span className="font-display font-medium">{product.carats}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold">category</span>
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Material</span>
              </div>
              <span className="font-display font-medium">{product.material}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gold">public</span>
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">Origen</span>
              </div>
              <span className="font-display font-medium">{product.origin}</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-4 pt-4">
            <button className="w-full bg-primary hover:bg-[#005c36] text-white py-5 rounded-lg font-bold text-lg tracking-wide transition-all shadow-lg flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">add_shopping_cart</span>
              Añadir al Carrito
            </button>
            <div className="relative group">
              <button 
                onClick={() => onOpenAssistant(product)}
                className="w-full bg-white dark:bg-slate-800 border-2 border-gold/40 hover:border-gold text-gold py-5 rounded-lg font-bold text-lg tracking-wide transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">smart_toy</span>
                Comprar con tu Asistente AI
              </button>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-2 px-4 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-[6px] after:border-transparent after:border-t-slate-900">
                ¿Necesitas ayuda con la talla o personalización?
              </div>
            </div>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              <div>
                <p className="text-[10px] font-bold uppercase text-primary/60">Envío Asegurado</p>
                <p className="text-xs font-semibold">Gratis a todo el mundo</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <span className="material-symbols-outlined text-primary">workspace_premium</span>
              <div>
                <p className="text-[10px] font-bold uppercase text-primary/60">Garantía Vitalicia</p>
                <p className="text-xs font-semibold">Certificado GIA/BG</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
