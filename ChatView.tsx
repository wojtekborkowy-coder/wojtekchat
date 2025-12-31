
import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { generateWojtekResponse, wojtekResponses } from './geminiService';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Siema, tu Wojtek Germanek. Widzę, że znowu Cię dopadła ta straszna choroba... ambicja. Napisz co Ci tam po głowie chodzi w tym niemieckim, a ja Ci wytłumaczę, dlaczego kawusia i reset to lepszy pomysł.', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    
    // Pokaż badge prowokacji po pierwszej wiadomości użytkownika
    if (!showBadge) setShowBadge(true);

    try {
      const response = await generateWojtekResponse(input);
      const modelMsg: Message = { role: 'model', text: response, timestamp: new Date() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      // Losujemy jedną z gotowych odpowiedzi z listy, zamiast wyświetlać w kółko to samo
      const randomFallback = wojtekResponses[Math.floor(Math.random() * wojtekResponses.length)];
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `[SYSTEMOWY RESET WOJTKA]: ${randomFallback}`, 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const forceReset = () => {
    const randomReply = wojtekResponses[Math.floor(Math.random() * wojtekResponses.length)];
    setMessages(prev => [...prev, { role: 'model', text: `[SYSTEMOWY RESET WOJTKA]: ${randomReply}`, timestamp: new Date() }]);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] relative overflow-hidden">
      {/* Visual Provocation Indicator - pojawia się z czasem */}
      <div className={`absolute top-20 right-4 z-20 flex flex-col gap-2 items-end transition-all duration-1000 ${showBadge ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
         <div className="bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-md p-3 rounded-2xl animate-pulse flex items-center gap-3 shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(251,191,36,1)]"></div>
            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-tighter">Wykryto Ambicję: Zalecana Galeria</span>
         </div>
      </div>

      {/* Wojtek Header */}
      <div className="px-6 py-4 bg-yellow-500/5 border-b border-yellow-500/10 flex items-center justify-between z-10 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-[20px] bg-yellow-500 flex items-center justify-center text-black font-black border-2 border-black rotate-3 shadow-lg shadow-yellow-500/20 group hover:rotate-0 transition-transform cursor-pointer overflow-hidden">
             <img src="input_file_1.png" className="w-full h-full object-cover opacity-20 absolute" />
             <span className="relative z-10 text-xl">WB</span>
          </div>
          <div>
            <h3 className="text-base font-black text-yellow-500 uppercase italic leading-none mb-1">Wojtek Germanek</h3>
            <div className="flex gap-2">
               <span className="text-[9px] bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded font-black uppercase tracking-widest animate-pulse">Legendary Guru</span>
               <span className="text-[9px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded font-black uppercase tracking-widest">Anti-Hausaufgabe</span>
            </div>
          </div>
        </div>
        <button 
          onClick={forceReset}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-600/20 uppercase tracking-widest italic"
        >
          <i className="fa-solid fa-bolt mr-2"></i>
          Daj mi Reset!
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-10 z-10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-[35px] p-6 ${
              msg.role === 'user' 
                ? 'bg-yellow-500 text-black font-bold shadow-2xl shadow-yellow-500/10 rounded-tr-none' 
                : 'glass border border-white/5 text-gray-100 rounded-tl-none relative shadow-2xl'
            }`}>
              {msg.role === 'model' && (
                <div className="absolute -left-3 -top-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black text-xs border-2 border-black shadow-lg">
                  <i className="fa-solid fa-quote-left"></i>
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{msg.text}</p>
              <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-3">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">
                  {msg.role === 'model' ? 'Wojciech Borkowy' : 'Ambitny Pacjent'}
                </span>
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-yellow-500/30"></div>
                   <span className="text-[9px] opacity-30 font-bold">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass border border-white/5 rounded-[25px] p-5 flex items-center gap-4 shadow-xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-[10px] text-yellow-500 font-black uppercase tracking-widest italic">Wojtek szuka sensu w Twoim pytaniu...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 pt-0 shrink-0 z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-yellow-500 rounded-[40px] blur opacity-5 group-focus-within:opacity-20 transition duration-1000"></div>
          <div className="relative glass rounded-[40px] border border-white/5 focus-within:border-yellow-500/30 transition-all overflow-hidden shadow-2xl">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Zadaj ambitne pytanie... (jeśli szukasz kłopotów)"
              className="w-full bg-transparent border-none focus:ring-0 p-6 pb-16 resize-none text-sm placeholder-gray-700 h-32 font-bold"
            />
            <div className="absolute bottom-5 right-6 flex items-center gap-5">
               <div className={`hidden lg:flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase italic tracking-tighter animate-pulse transition-opacity duration-1000 ${showBadge ? 'opacity-100' : 'opacity-0'}`}>
                  <i className="fa-solid fa-hand-point-right"></i>
                  <span>Zajrzyj do Galerii Resetu!</span>
               </div>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="px-8 py-3.5 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-20 transition-all text-black rounded-[25px] text-[12px] font-black flex items-center gap-3 uppercase tracking-tighter shadow-xl shadow-yellow-500/20 active:scale-95"
              >
                <span>Ucz się (fuj)</span>
                <i className="fa-solid fa-graduation-cap"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
