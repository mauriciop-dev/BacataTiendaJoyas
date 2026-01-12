
import React, { useState, useEffect } from 'react';
import { Product, UCPManifest, UCPCapabilityType } from './types';
import { MOCK_PRODUCTS, BRAND_NAME, BRAND_LOGO } from './constants';
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import AdminPanel from './components/AdminPanel';
import ChatAssistant from './components/ChatAssistant';

type View = 'home' | 'product' | 'admin' | 'anillos' | 'collares' | 'oro';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  
  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminCreds, setAdminCreds] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleNavigate = (v: View) => {
    setView(v);
    if (v !== 'product') setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCreds.username === 'admin' && adminCreds.password === 'bacata123') {
      setIsAdminAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas. Intente de nuevo.');
    }
  };

  // Helper to group and slice products for the home page
  const getCategorizedHomeItems = () => {
    const categories: ('anillos' | 'collares' | 'oro')[] = ['anillos', 'collares', 'oro'];
    return categories.map(cat => ({
      id: cat,
      name: cat === 'oro' ? 'Oro Puro & Laminado' : (cat === 'anillos' ? 'Colección de Anillos' : 'Collares de Lujo'),
      items: products.filter(p => p.category === cat).slice(0, 2)
    }));
  };

  const renderProductGrid = (items: Product[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {items.map(p => (
        <div key={p.id} className="group cursor-pointer flex flex-col gap-4 animate-slideUp bg-white dark:bg-slate-800/40 p-4 rounded-2xl transition-all hover:shadow-xl" onClick={() => handleSelectProduct(p)}>
          <div className="aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden relative">
            <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url("${p.image_urls[0]}")` }}></div>
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Certificado</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[10px] uppercase tracking-widest text-gold font-bold">{p.gem_type}</p>
            <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors">{p.name}</h3>
            <p className="text-primary font-bold text-lg">${p.price.toLocaleString()} {p.currency}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500">
      <Header onNavigate={handleNavigate} />

      <main>
        {view === 'home' && (
          <div className="max-w-[1280px] mx-auto px-6 py-12">
            <section className="text-center mb-16 animate-fadeIn">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Bacata Gold</h1>
              <p className="text-gray-500 max-w-2xl mx-auto italic">"Donde la pureza del oro y la esmeralda cuentan una historia milenaria."</p>
            </section>
            
            <div className="space-y-24">
              {getCategorizedHomeItems().map((catSection) => (
                <div key={catSection.id} className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-8 border-b border-primary/10 pb-4">
                    <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tight">{catSection.name}</h2>
                    <button 
                      onClick={() => handleNavigate(catSection.id as any)}
                      className="text-primary font-bold text-sm uppercase tracking-widest hover:underline flex items-center gap-2"
                    >
                      Ver Todo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {catSection.items.map(p => (
                      <div key={p.id} className="group cursor-pointer flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-800/30 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-gold/10" onClick={() => handleSelectProduct(p)}>
                        <div className="w-full md:w-1/2 aspect-[4/5] bg-slate-200 rounded-2xl overflow-hidden">
                          <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url("${p.image_urls[0]}")` }}></div>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                          <p className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">{p.gem_type}</p>
                          <h3 className="text-3xl font-display font-bold mb-3">{p.name}</h3>
                          <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">{p.description}</p>
                          <p className="text-primary text-2xl font-bold">${p.price.toLocaleString()} {p.currency}</p>
                          <button className="mt-8 bg-primary text-white px-10 py-4 rounded-xl font-bold text-sm shadow-lg hover:bg-[#005c36] transition-colors">Detalles de la Pieza</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(view === 'anillos' || view === 'collares' || view === 'oro') && (
          <div className="max-w-[1280px] mx-auto px-6 py-16 animate-fadeIn">
            <header className="mb-12">
              <h1 className="text-5xl font-display font-bold capitalize mb-4">
                {view === 'oro' ? 'Oro Puro & Laminado' : view}
              </h1>
              <p className="text-slate-500 max-w-xl">
                {view === 'anillos' && "Descubra nuestra selección exclusiva de anillos con las esmeraldas más puras de Muzo y Chivor."}
                {view === 'collares' && "Elegancia que envuelve. Collares diseñados para resaltar la belleza natural de la piedra colombiana."}
                {view === 'oro' && "Materiales de inversión y orfebrería de la más alta calidad y pureza certificada."}
              </p>
            </header>
            {renderProductGrid(products.filter(p => p.category === view))}
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
          !isAdminAuthenticated ? (
            <div className="min-h-[70vh] flex items-center justify-center px-6">
              <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gold/20 animate-slideUp">
                <div className="flex flex-col items-center mb-8">
                  <div className="text-primary mb-4">{BRAND_LOGO}</div>
                  <h2 className="text-2xl font-display font-bold">Acceso Administrativo</h2>
                  <p className="text-sm text-slate-500">Ingrese sus credenciales para continuar</p>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Usuario</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary"
                      value={adminCreds.username}
                      onChange={e => setAdminCreds({...adminCreds, username: e.target.value})}
                      placeholder="admin"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Contraseña</label>
                    <input 
                      type="password" 
                      className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary"
                      value={adminCreds.password}
                      onChange={e => setAdminCreds({...adminCreds, password: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>
                  {loginError && <p className="text-red-500 text-xs font-bold">{loginError}</p>}
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg hover:bg-opacity-90 transition-all">
                    Iniciar Sesión
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <AdminPanel 
              products={products} 
              onAddProduct={handleAddProduct} 
              onUpdateStock={handleUpdateStock} 
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-primary/10 py-20 px-6 bg-white dark:bg-background-dark">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-display font-bold text-primary mb-4 uppercase">{BRAND_NAME}</h2>
            <p className="text-gray-500 max-w-sm leading-relaxed">Elevando la herencia de las esmeraldas colombianas a un nivel de lujo global. Belleza natural, minería responsable y artesanía sin igual.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">Navegación</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleNavigate('home')} className="text-sm text-gray-500 hover:text-primary transition-colors text-left">Inicio</button>
              <button onClick={() => handleNavigate('anillos')} className="text-sm text-gray-500 hover:text-primary transition-colors text-left">Anillos</button>
              <button onClick={() => handleNavigate('collares')} className="text-sm text-gray-500 hover:text-primary transition-colors text-left">Collares</button>
              <button onClick={() => handleNavigate('oro')} className="text-sm text-gray-500 hover:text-primary transition-colors text-left">Oro Puro</button>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-400">Contacto</h4>
            <p className="text-sm text-gray-500">Muzo & Bogotá, Colombia</p>
            <p className="text-sm text-gray-500 mt-2">info@bacatagold.com</p>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto mt-20 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">&copy; 2024 Bacata Gold Luxury. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-slate-400">
            <span className="material-symbols-outlined text-sm">security</span>
            <span className="material-symbols-outlined text-sm">verified</span>
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

      {!isAssistantOpen && (
        <button 
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-6 right-6 size-16 bg-gold text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
        >
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
        </button>
      )}
    </div>
  );
};

export default App;
