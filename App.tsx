
import React, { useState, useEffect } from 'react';
import { Product, UCPManifest, UCPCapabilityType } from './types';
import { MOCK_PRODUCTS, BRAND_NAME } from './constants';
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import AdminPanel from './components/AdminPanel';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'product' | 'admin'>('home');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // UCP Discovery Mock
  const getUCPManifest = (): UCPManifest => ({
    version: '1.0',
    name: BRAND_NAME,
    description: 'Protocolo de Comercio Agéntico de Bacata Gold',
    capabilities: [
      { type: UCPCapabilityType.PRODUCT_DISCOVERY, endpoint: '/api/ucp/discovery', description: 'Búsqueda por atributos técnicos' },
      { type: UCPCapabilityType.CHECKOUT, endpoint: '/api/ucp/checkout', description: 'Checkout seguro vía token' }
    ],
    auth: { type: 'Bearer', flow: 'OIDC' }
  });

  const handleNavigate = (v: 'home' | 'product' | 'admin') => {
    setView(v);
    if (v === 'home') setSelectedProduct(null);
  };

  const handleAddProduct = (p: Product) => {
    setProducts(prev => [p, ...prev]);
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, newStock) } : p));
  };

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setView('product');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500">
      <Header onNavigate={handleNavigate} />

      <main>
        {view === 'home' && (
          <div className="max-w-[1280px] mx-auto px-6 py-12">
            <section className="text-center mb-16 animate-fadeIn">
              <h1 className="text-5xl font-display font-bold mb-4">Piezas Maestras</h1>
              <p className="text-gray-500 max-w-2xl mx-auto">Cada joya es única, certificada y diseñada para perdurar por generaciones.</p>
            </section>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(p => (
                <div key={p.id} className="group cursor-pointer flex flex-col gap-4 animate-slideUp" onClick={() => handleSelectProduct(p)}>
                  <div className="aspect-[4/5] bg-slate-200 rounded-xl overflow-hidden relative border border-transparent group-hover:border-primary/20 transition-all shadow-sm">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url("${p.image_urls[0]}")` }}></div>
                    <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur text-primary py-3 rounded-lg font-bold translate-y-12 group-hover:translate-y-0 transition-transform shadow-xl">
                      Ver Detalles
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">{p.gem_type}</p>
                    <h3 className="text-lg font-display font-bold">{p.name}</h3>
                    <p className="text-primary font-bold mt-1">${p.price.toLocaleString()} {p.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'product' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onOpenAssistant={(p) => {
              setSelectedProduct(p);
              setIsAssistantOpen(true);
            }} 
          />
        )}

        {view === 'admin' && (
          <AdminPanel 
            products={products} 
            onAddProduct={handleAddProduct} 
            onUpdateStock={handleUpdateStock} 
          />
        )}
      </main>

      {/* Footer (Simplified) */}
      <footer className="mt-20 border-t border-primary/10 py-20 px-6 bg-white dark:bg-background-dark">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-display font-bold text-primary mb-4 uppercase">{BRAND_NAME}</h2>
            <p className="text-gray-500 max-w-sm">Elevando la herencia de las esmeraldas colombianas a un nivel de lujo global. Belleza natural, minería responsable.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">UCP Protocol</h4>
            <a href="/.well-known/ucp" className="text-sm text-gray-500 hover:text-primary transition-colors">Manifest Discovery</a>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <p className="text-sm text-gray-500">Muzo & Bogotá, Colombia</p>
          </div>
        </div>
      </footer>

      {isAssistantOpen && (
        <ChatAssistant 
          products={products} 
          activeProduct={selectedProduct || undefined} 
          onClose={() => setIsAssistantOpen(false)} 
        />
      )}

      {/* Floating Action Button for AI (when not in detail or closed) */}
      {!isAssistantOpen && (
        <button 
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 size-16 bg-gold text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
        >
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
          <span className="absolute right-full mr-4 bg-white text-gold text-xs font-bold py-2 px-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gold/20">
            ¿Cómo puedo ayudarte?
          </span>
        </button>
      )}
    </div>
  );
};

export default App;
