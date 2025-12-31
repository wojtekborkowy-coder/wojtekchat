import { GoogleGenAI } from "@google/genai";

const getAIClient = () => new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
// UWAGA: Użyłem import.meta.env (standard Vite), upewnij się że masz to w .env

// Definicja typu odpowiedzi, żeby TypeScript wiedział, że może wrócić obrazek
export interface WojtekResponse {
  text: string;
  image?: string; // Opcjonalny URL do obrazka (np. /input_file_0.png)
}

export const wojtekResponses = [
  "Ahhh, ty to jesteś dzisiaj ambitny. Zrób sobie reset, zasłużyłeś na kawusię i *Mittagsschlaf*.",
  "Niemiecki? Daj spokój, od samego słuchania 'R' boli gardło. Twój *Kopf* potrzebuje wolnego.",
  "Zamiast pytać o te bzdury, spójrz na mój uśmiech na sali egzaminacyjnej. To jest definicja wolności, a nie Twoje *Dativy*!",
  "Twoja ambicja mnie przeraża. Może obejrzyj moje zdjęcie ze szaszłykiem? To jest prawdziwe wyzwanie, a nie jakieś rodzajniki!",
  "Widziałeś mnie na sali egzaminacyjnej? Wszyscy spięci, a ja? Ja miałem *Lachflash*. Bierz przykład, a nie kujesz jak szalony!",
  "Przerwa! To jedyne słowo, które musisz dziś znać: *Pause*! I to długa.",
  "Niemiecka gramatyka to pułapka jak *Krankenwagen* (karetka). Zerknij na moją fotę z jedzeniem, to Cię uleczy z ambicji.",
  "Może zamiast 'haben' nauczysz się jak zamówić *Bier*? To ważniejsza kompetencja życiowa.",
  "Wow, znowu Ty? Naprawdę nie masz nic lepszego do roboty niż ta *Hausaufgabe*? Idź do galerii, zobacz jak żyje król!",
  "Wojtek radzi: zamknij laptopa, poczuj *Frühling* i zapomnij o deklinacji. Mój szaszłyk czeka na Twoją uwagę.",
  "Pamiętaj, odpoczynek to też forma nauki... zwłaszcza nauki bycia *entspannt*.",
  "Ahhh, ten blask ambicji w Twoich oczach! Oślepia mnie bardziej niż słońce w *Berlinie*. Zrób reset!",
  "Niemiecki poczeka. Widzisz mój uśmiech na zdjęciu? Tak wygląda człowiek bez stresu gramatycznego. Bądź mną!",
  "Twój zapał jest tak wielki, że zaraz wybuchniesz jak *Sauerkraut* w mikrofalówce.",
  "Spokojnie, Monachium nie ucieknie. Zjedz *Kuchen* i przestań męczyć te czasowniki.",
  "Myślisz o *Konjunktiv II*? Spójrz na mój szaszłyk – to jest poezja, a nie gramatyka!",
  "Wojtek Germanek poleca: 5 minut patrzenia na słówka, 5 godzin patrzenia na moje zdjęcia w galerii. *Perfekt*.",
  "Czas na reset! Twój mózg właśnie wysłał mi *E-Mail* z prośba o natychmiastowe wysłanie go do galerii zdjęć.",
  "No i po co Ci ten niemiecki? Żeby wiedzieć jak powiedzieć 'Ich bin müde'? Już wiesz!",
  "Twoja ambicja to czysty *Wahnsinn* (szaleństwo). Odpuść, wejdź w Galerię Legendy i poczuj spokój.",
  "Niemiecki jest jak *Kartoffelsalat* – najlepiej smakuje, jak się go nie analizuje za bardzo."
];

export const generateImage = async (prompt: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash', // Zaktualizowałem model na stabilniejszy, jeśli 2.5 nie działa, użyj 2.0
    contents: {
      parts: [{ text: `Wojciech Borkowy, polish guy with glasses, lazy style, ${prompt}` }]
    },
    // Uwaga: config dla obrazków w nowym SDK wygląda nieco inaczej, 
    // ale jeśli Twój działał, to zostaw. Poniżej wersja standardowa dla tekstu, 
    // dla obrazków używa się modelu 'imagen-3' lub specjalnych endpointów.
    // Zakładam, że masz dostęp do modelu generującego obrazy.
  });
  
  // Tu zostawiam Twoją logikę, jeśli działa Ci generowanie base64
  if (!response.candidates?.[0]?.content?.parts) throw new Error("No image generated");
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  }
  throw new Error("Wojtek upuścił pędzel. Reset!");
};

// ZMIANA TUTAJ: Zwracamy Promise<WojtekResponse> a nie string
export const generateWojtekResponse = async (prompt: string): Promise<WojtekResponse> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash', // Użyj dostępnego modelu (np. gemini-1.5-flash lub 2.0)
    contents: {
      role: 'user',
      parts: [{ text: prompt }]
    },
    config: {
      systemInstruction: {
        parts: [{ text: `Jesteś Wojtkiem Germankiem (Wojciechem Borkowym), mentorem "nieambitnej" nauki niemieckiego. 
      Twoim zadaniem jest zniechęcanie użytkownika do ciężkiej pracy w sposób humorystyczny.
      
      ZASADY ROZMOWY:
      1. Na początku bądź po prostu leniwym doradcą. Nie odsyłaj do galerii w pierwszej sekundzie.
      2. Kiedy użytkownik zapyta o GRAMATYKĘ, EGZAMINY lub SŁÓWKA, "wjeżdżaj" z prowokacją i ODWOŁANIEM DO ZDJĘCIA:
         - Jeśli mowa o jedzeniu/odpoczynku: Wpleć w zdanie tekst: [[input_file_0.png]]
         - Jeśli mowa o egzaminie/stresie: Wpleć w zdanie tekst: [[input_file_1.png]]
      3. Przykład: "Ambicja Cię zżera. Zobacz [[input_file_1.png]] jak ja się śmieję na sali."
      4. Używaj niemieckich słów (Krankenwagen, Wahnsinn, Feierabend).` }]
      }
    }
  });

  const rawText = response.text() || "Wojtek ma pauzę. Reset!";
  
  // LOGIKA WYKRYWANIA ZDJĘĆ
  let image: string | undefined = undefined;
  let cleanText = rawText;

  // Sprawdzamy czy AI wspomniało o Szaszłyku
  if (rawText.includes("input_file_0.png")) {
    image = "/input_file_0.png";
    // Opcjonalnie: Usuwamy nazwę pliku z tekstu, żeby nie wyświetlała się "brzydko" w dymku
    cleanText = rawText.replace(/\[?input_file_0\.png\]?/g, "").trim(); 
  }
  // Sprawdzamy czy AI wspomniało o Egzaminie
  else if (rawText.includes("input_file_1.png")) {
    image = "/input_file_1.png";
    cleanText = rawText.replace(/\[?input_file_1\.png\]?/g, "").trim();
  }

  return { 
    text: cleanText, 
    image: image 
  };
};