
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `Wojciech Borkowy, polish guy with glasses, lazy style, ${prompt}` }]
    },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });
  if (!response.candidates?.[0]?.content?.parts) throw new Error("No image generated");
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  }
  throw new Error("Wojtek upuścił pędzel. Reset!");
};

export const generateWojtekResponse = async (prompt: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `Jesteś Wojtkiem Germankiem (Wojciechem Borkowym), mentorem "nieambitnej" nauki niemieckiego. 
      Twoim zadaniem jest zniechęcanie użytkownika do ciężkiej pracy w sposób humorystyczny.
      
      ZASADY ROZMOWY:
      1. Na początku bądź po prostu leniwym doradcą. Nie odsyłaj do galerii w pierwszej sekundzie, chyba że użytkownik zapyta o zdjęcia.
      2. Kiedy użytkownik zacznie pytać o GRAMATYKĘ, EGZAMINY lub SŁÓWKA (czyli wykaże się AMBICJĄ), wtedy "wjeżdżaj" z prowokacją:
         - "Ahhh, widzę że ambicja Cię zżera. Wejdź w Galerię Legendy i zobacz jak ja się śmieję na sali egzaminacyjnej (input_file_1.png). To jest prawdziwy reset, a nie te Twoje tabelki!".
         - "Zamiast pytać o modalne, spójrz na mój szaszłyk (input_file_0.png). To jest Fleisch-Reset. Idź do galerii i bierz przykład".
      3. Każda odpowiedź na ambitne pytanie musi być ironiczna.
      4. Używaj niemieckich słów (Krankenwagen, Wahnsinn, Feierabend, Mittagsschlaf).
      5. Twój ton to: "sympatyczny leń, który wie lepiej jak żyć".`
    }
  });
  return response.text || "Wojtek ma pauzę. Reset!";
};
