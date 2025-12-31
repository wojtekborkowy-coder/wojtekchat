
import React from 'react';

const GalleryView: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-black italic uppercase tracking-tighter gradient-text">Archiwum <span className="text-white">Resetu</span></h2>
        <p className="text-yellow-500 font-black uppercase tracking-[0.3em] text-xs">Prawdziwe dowody na to, że gramatyka nie ma znaczenia</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Foto 1: Szaszłyk */}
        <div className="group space-y-6">
          <div className="relative rounded-[50px] overflow-hidden border-8 border-yellow-500/10 shadow-[0_0_50px_rgba(251,191,36,0.1)] transition-all duration-700 group-hover:border-yellow-500/30 group-hover:shadow-yellow-500/20">
            <img 
              src="input_file_0.png" 
              alt="Wojtek ze szaszłykiem" 
              className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-yellow-500/30">
               <span className="text-yellow-500 font-black text-xl italic">10/10 RESET</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <h3 className="text-3xl font-black uppercase italic text-white mb-2">Fleisch-Reset: Operacja Szaszłyk</h3>
              <p className="text-yellow-500 font-bold uppercase tracking-widest text-xs italic">Lokalizacja: Raj dla podniebienia</p>
            </div>
          </div>
          <div className="glass p-10 rounded-[40px] border border-white/5 space-y-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12">
              <i className="fa-solid fa-drumstick-bite text-8xl"></i>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg italic font-medium">
              "Patrzysz na to i co widzisz? Ja widzę wolność. Ten szaszłyk ma więcej sensu niż cała deklinacja przymiotnika po rodzajniku nieokreślonym. Zjadłem go i zapomniałem o istnieniu słowa 'Hausaufgabe'. Bierz przykład!"
            </p>
            <div className="flex gap-4">
               <span className="px-3 py-1 bg-yellow-500/20 rounded-full text-[10px] font-black text-yellow-500 uppercase">#NoGrammar</span>
               <span className="px-3 py-1 bg-red-500/20 rounded-full text-[10px] font-black text-red-500 uppercase">#BigMeat</span>
               <span className="px-3 py-1 bg-blue-500/20 rounded-full text-[10px] font-black text-blue-500 uppercase">#WojtekStyle</span>
            </div>
          </div>
        </div>

        {/* Foto 2: Egzamin */}
        <div className="group space-y-6">
          <div className="relative rounded-[50px] overflow-hidden border-8 border-yellow-500/10 shadow-[0_0_50px_rgba(251,191,36,0.1)] transition-all duration-700 group-hover:border-yellow-500/30 group-hover:shadow-yellow-500/20">
            <img 
              src="input_file_1.png" 
              alt="Wojtek na egzaminie" 
              className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-yellow-500/30">
               <span className="text-yellow-500 font-black text-xl italic">0% AMBICJI</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <h3 className="text-3xl font-black uppercase italic text-white mb-2">Śmiech w Salonie Gier</h3>
              <p className="text-yellow-500 font-bold uppercase tracking-widest text-xs italic">Lokalizacja: Sala 'Straconego Czasu'</p>
            </div>
          </div>
          <div className="glass p-10 rounded-[40px] border border-white/5 space-y-6 relative overflow-hidden">
             <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12">
              <i className="fa-solid fa-face-laugh-squint text-8xl"></i>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg italic font-medium">
              "To jest mój ulubiony moment. Sala pełna spiętych ludzi, którzy myślą, że od tego egzaminu zależy ich życie. A ja? Ja się śmieję prosto w twarz tym arkuszom. Dlaczego? Bo wiedziałem, że po tym idę na reset. To jest uśmiech kogoś, kto już wygrał."
            </p>
            <div className="flex gap-4">
               <span className="px-3 py-1 bg-yellow-500/20 rounded-full text-[10px] font-black text-yellow-500 uppercase">#LaughAtProblems</span>
               <span className="px-3 py-1 bg-green-500/20 rounded-full text-[10px] font-black text-green-500 uppercase">#ResetMaster</span>
               <span className="px-3 py-1 bg-purple-500/20 rounded-full text-[10px] font-black text-purple-500 uppercase">#ChillMode</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-20">
        <div className="inline-block p-10 glass rounded-[50px] border-2 border-dashed border-yellow-500/30">
          <p className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
            "Jeśli Twoja nauka nie sprawia, że chcesz się śmiać jak ja na sali,<br/>to znaczy, że robisz to źle."
          </p>
          <p className="text-yellow-500 font-bold uppercase text-xs tracking-[0.5em]">— WOJTEK GERMANEK</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
