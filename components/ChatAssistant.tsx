
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { getAIResponse } from '../services/geminiService';

interface ChatAssistantProps {
  products: Product[];
  activeProduct?: Product;
  onClose: () => void;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ products, activeProduct, onClose }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeProduct) {
      setMessages([
        { role: 'assistant', text: `¡Hola! Veo que estás interesado en el ${activeProduct.name}. Soy tu asistente experto de Bacata Gold. ¿Te gustaría saber más sobre su origen en ${activeProduct.origin} o necesitas ayuda con la talla?` }
      ]);
    } else {
      setMessages([
        { role: 'assistant', text: "Bienvenido a Bacata Gold. Soy tu asistente de joyería agéntica. ¿Qué tipo de esmeralda colombiana estás buscando hoy?" }
      ]);
    }
  }, [activeProduct]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await getAIResponse(userMsg, products);
      setMessages(prev => [...prev, { role: 'assistant', text: response || "Lo siento, no pude procesar tu solicitud." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Ocurrió un error al conectar con el agente experto." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col z-[200] border border-gold/20 overflow-hidden animate-slideUp">
      {/* Header */}
      <div className="bg-primary p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-sm">smart_toy</span>
          </div>
          <div>
            <p className="font-bold text-sm">Bacata Expert Agent</p>
            <p className="text-[10px] opacity-70">Model Context Protocol Enabled</p>
          </div>
        </div>
        <button onClick={onClose} className="material-symbols-outlined">close</button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm rounded-tl-none border border-slate-100 dark:border-slate-700'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl animate-pulse flex gap-2">
              <div className="size-2 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="size-2 bg-slate-300 rounded-full animate-bounce delay-100"></div>
              <div className="size-2 bg-slate-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Escribe a tu asistente..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
          />
          <button onClick={handleSend} className="bg-primary text-white size-8 rounded-lg flex items-center justify-center hover:bg-opacity-90">
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
