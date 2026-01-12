
import React, { useState } from 'react';
import { Product } from '../types';
import { generateProductImage } from '../services/geminiService';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
  onUpdateStock: (id: string, newStock: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onAddProduct, onUpdateStock }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', price: 0, stock: 0, material: '', carats: '', origin: '', gem_type: 'Esmeralda', category: 'anillos', description: ''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      ...newProduct as Product,
      id: Math.random().toString(36).substr(2, 9),
      currency: 'USD',
      image_urls: previewImage ? [previewImage] : ["https://picsum.photos/800/1000"]
    });
    setPreviewImage(null);
    setIsFormOpen(false);
  };

  const handleGenerateIAImage = async () => {
    if (!newProduct.name || !newProduct.description) {
      alert("Por favor ingrese un nombre y una descripción primero para guiar a la IA.");
      return;
    }
    setIsGenerating(true);
    const result = await generateProductImage(newProduct.name, newProduct.description);
    if (result) {
      setPreviewImage(result);
    } else {
      alert("No se pudo generar la imagen. Verifique su API Key.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-display font-bold">Panel de Control</h2>
          <p className="text-gray-500">Gestión de Inventario Bacata Gold</p>
        </div>
        <button 
          onClick={() => {
            setPreviewImage(null);
            setIsFormOpen(true);
          }}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Nuevo Producto
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Producto</th>
              <th className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Categoría</th>
              <th className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Precio</th>
              <th className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Stock</th>
              <th className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded bg-slate-100 bg-cover bg-center" style={{ backgroundImage: `url(${p.image_urls[0]})` }}></div>
                    <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 capitalize text-slate-500 text-sm font-medium">{p.category}</td>
                <td className="px-6 py-4 font-mono text-sm">${p.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateStock(p.id, p.stock - 1)} className="size-6 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center hover:bg-slate-200">-</button>
                    <span className="font-bold w-8 text-center">{p.stock}</span>
                    <button onClick={() => onUpdateStock(p.id, p.stock + 1)} className="size-6 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center hover:bg-slate-200">+</button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:underline text-sm font-bold">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-xl rounded-2xl shadow-2xl p-8 animate-slideUp overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display font-bold">Añadir Joya Exclusiva</h3>
              <button onClick={() => setIsFormOpen(false)} className="material-symbols-outlined">close</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Col: Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Nombre</label>
                    <input 
                      placeholder="Nombre de la pieza" 
                      className="w-full rounded-lg border-slate-200 dark:bg-slate-700"
                      value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Categoría</label>
                    <select 
                      className="w-full rounded-lg border-slate-200 dark:bg-slate-700"
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                    >
                      <option value="anillos">Anillos</option>
                      <option value="collares">Collares</option>
                      <option value="oro">Oro</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Precio</label>
                      <input type="number" placeholder="Precio (USD)" className="w-full rounded-lg border-slate-200 dark:bg-slate-700" onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Stock</label>
                      <input type="number" placeholder="Stock" className="w-full rounded-lg border-slate-200 dark:bg-slate-700" onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Descripción</label>
                    <textarea placeholder="Descripción técnica" className="w-full rounded-lg border-slate-200 dark:bg-slate-700" rows={3} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
                  </div>
                </div>

                {/* Right Col: IA Image */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-1">Imagen del Producto</label>
                  <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden group">
                    {previewImage ? (
                      <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="text-center p-4">
                        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">image</span>
                        <p className="text-xs text-slate-400">Genere una imagen con IA o suba un archivo</p>
                      </div>
                    )}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold flex-col gap-2">
                        <div className="size-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        El agente está creando...
                      </div>
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={handleGenerateIAImage}
                    disabled={isGenerating}
                    className="w-full flex items-center justify-center gap-2 bg-gold/10 text-gold border border-gold/40 py-2 rounded-lg font-bold text-sm hover:bg-gold hover:text-white transition-all disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-lg">smart_toy</span>
                    Generar con IA (Flash 2.5)
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex gap-4">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 py-4 font-bold text-slate-500">Cancelar</button>
                <button type="submit" className="flex-[2] bg-primary text-white py-4 rounded-lg font-bold shadow-lg hover:bg-opacity-90">Certificar y Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
