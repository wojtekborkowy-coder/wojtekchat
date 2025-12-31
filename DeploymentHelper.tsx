
import React from 'react';

const DeploymentHelper: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">Plan <span className="gradient-text">Bitwy</span></h2>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Jak nie zepsuć wdrożenia Wojtka</p>
      </div>

      <div className="grid gap-8">
        {/* Odpowiedź na zdjęcia */}
        <section className="glass rounded-[40px] border border-yellow-500/10 p-10 space-y-8 relative overflow-hidden bg-gradient-to-br from-yellow-500/5 to-transparent">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-[25px] bg-yellow-500 flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/20">
              <i className="fa-solid fa-camera text-black text-2xl"></i>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white uppercase italic">Gdzie wrzucić zdjęcia (Netlify)?</h3>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Aby Galeria Legendy działała poprawnie po wrzuceniu na Netlify, musisz umieścić swoje dwa zdjęcia w tym samym folderze, w którym znajduje się <code className="text-yellow-500 font-bold">index.html</code>.
                </p>
                <div className="p-6 bg-black/40 rounded-3xl border border-white/5 font-mono text-xs space-y-2">
                  <div className="flex items-center gap-2 text-green-400">
                    <i className="fa-solid fa-folder-open"></i>
                    <span>Twoj_Folder_Projektu/</span>
                  </div>
                  <div className="pl-6 flex items-center gap-2 text-gray-300">
                    <i className="fa-solid fa-file-code"></i>
                    <span>index.html</span>
                  </div>
                  <div className="pl-6 flex items-center gap-2 text-yellow-500 font-bold">
                    <i className="fa-solid fa-file-image"></i>
                    <span>input_file_0.png (Szaszłyk)</span>
                  </div>
                  <div className="pl-6 flex items-center gap-2 text-yellow-500 font-bold">
                    <i className="fa-solid fa-file-image"></i>
                    <span>input_file_1.png (Egzamin)</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest italic">
                  * Jeśli zdjęcia będą miały inne nazwy, Wojtek ich nie znajdzie i zarządzi smutny reset.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass rounded-[40px] border border-white/5 p-10 space-y-8">
          <h3 className="text-xl font-black flex items-center gap-4 uppercase italic">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
               <i className="fa-solid fa-key text-blue-400 text-sm"></i>
            </div>
            Zmienna API_KEY
          </h3>
          <div className="p-6 bg-blue-500/10 rounded-3xl border border-blue-500/20">
             <p className="text-sm text-blue-200">
               W Netlify używaj nazwy <span className="font-black text-white px-2 py-1 bg-blue-500/30 rounded">API_KEY</span>. Żadnych małych liter, żadnych myślników. Wojtek nie lubi literówek prawie tak samo jak gramatyki.
             </p>
          </div>
        </section>

        <section className="glass rounded-[40px] border border-white/5 p-10 space-y-6">
          <h3 className="text-lg font-black uppercase italic text-gray-400">Krótka lista kontrolna:</h3>
          <ul className="space-y-3">
            {[
              "Zdjęcia input_file_0 i input_file_1 są w głównym folderze.",
              "Klucz API_KEY jest dodany w zakładce Environment na Netlify.",
              "Masz przy sobie kawę przed rozpoczęciem deployu.",
              "Twoja ambicja została ograniczona do minimum."
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-4 group">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black text-gray-600 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                  {i + 1}
                </div>
                <span className="text-sm text-gray-400 font-medium">{step}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DeploymentHelper;
