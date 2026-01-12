
import React, { useState } from 'react';
import { Product } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (p: Product) => void;
  onUpdateStock: (id: string, newStock: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onAddProduct, onUpdateStock }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', price: 0, stock: 0, material: '', carats: '', origin: '', gem_type: 'Esmeralda'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      ...newProduct as Product,
      id: Math.random().toString(36).substr(2, 9),
      currency: 'USD',
      image_urls: ["https://picsum.photos/800/1000"]
    });
    setIsFormOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-display font-bold">Panel de Control</h2>
          <p className="text-gray-500">Gestión de Inventario Bacata Gold</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
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
              <th className="px-6 py-4 text-sm font-bold uppercase text-slate-500">Detalles</th>
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
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-500">
                    {p.material} • {p.carats} • {p.origin}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono">${p.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateStock(p.id, p.stock - 1)} className="size-6 bg-slate-100 rounded flex items-center justify-center hover:bg-slate-200">-</button>
                    <span className="font-bold w-8 text-center">{p.stock}</span>
                    <button onClick={() => onUpdateStock(p.id, p.stock + 1)} className="size-6 bg-slate-100 rounded flex items-center justify-center hover:bg-slate-200">+</button>
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
          <div className="bg-white dark:bg-slate-800 w-full max-w-xl rounded-2xl shadow-2xl p-8 animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-display font-bold">Añadir Joya Exclusiva</h3>
              <button onClick={() => setIsFormOpen(false)} className="material-symbols-outlined">close</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                placeholder="Nombre de la pieza" 
                className="w-full rounded-lg border-slate-200 dark:bg-slate-700"
                value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Precio (USD)" className="rounded-lg border-slate-200 dark:bg-slate-700" onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                <input type="number" placeholder="Stock" className="rounded-lg border-slate-200 dark:bg-slate-700" onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Material (ej: Oro 18k)" className="rounded-lg border-slate-200 dark:bg-slate-700" onChange={e => setNewProduct({...newProduct, material: e.target.value})} />
                <input placeholder="Gema" className="rounded-lg border-slate-200 dark:bg-slate-700" onChange={e => setNewProduct({...newProduct, gem_type: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Quilates" className="rounded-lg border-slate-200 dark:bg-slate-700" onChange={e => setNewProduct({...newProduct, carats: e.target.value})} />
                <input placeholder="Origen" className="rounded-lg border-slate-200 dark:bg-slate-700" onChange={e => setNewProduct({...newProduct, origin: e.target.value})} />
              </div>
              <textarea placeholder="Descripción técnica" className="w-full rounded-lg border-slate-200 dark:bg-slate-700" rows={3} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
              <button type="submit" className="w-full bg-primary text-white py-4 rounded-lg font-bold shadow-lg hover:bg-opacity-90">Certificar y Guardar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
