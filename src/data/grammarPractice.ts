export interface GrammarPracticeQuestion {
  type: "multiple_choice" | "fill_blank" | "translate";
  prompt: string;
  correct: string;
  options?: string[];
  explanation: string;
}

export interface GrammarPracticeSet {
  id: string;
  title: string;
  emoji: string;
  description: string;
  questions: GrammarPracticeQuestion[];
}

export const grammarPracticeSets: GrammarPracticeSet[] = [
  {
    id: "articles",
    title: "Articles (el/la/los/las)",
    emoji: "📰",
    description: "Practice definite articles with nouns",
    questions: [
      { type: "multiple_choice", prompt: "___ gato negro", correct: "El", options: ["El", "La", "Los", "Las"], explanation: "Gato is masculine singular" },
      { type: "multiple_choice", prompt: "___ casa grande", correct: "La", options: ["El", "La", "Los", "Las"], explanation: "Casa is feminine singular" },
      { type: "multiple_choice", prompt: "___ libros nuevos", correct: "Los", options: ["El", "La", "Los", "Las"], explanation: "Libros is masculine plural" },
      { type: "multiple_choice", prompt: "___ mesas rojas", correct: "Las", options: ["El", "La", "Los", "Las"], explanation: "Mesas is feminine plural" },
      { type: "multiple_choice", prompt: "___ perro grande", correct: "El", options: ["El", "La", "Los", "Las"], explanation: "Perro is masculine singular" },
      { type: "multiple_choice", prompt: "___ ventanas abiertas", correct: "Las", options: ["El", "La", "Los", "Las"], explanation: "Ventanas is feminine plural" },
      { type: "multiple_choice", prompt: "___ zapatos negros", correct: "Los", options: ["El", "La", "Los", "Las"], explanation: "Zapatos is masculine plural" },
      { type: "multiple_choice", prompt: "___ leche fría", correct: "La", options: ["El", "La", "Los", "Las"], explanation: "Leche is feminine singular" },
    ],
  },
  {
    id: "ser-estar",
    title: "Ser vs Estar",
    emoji: "🔀",
    description: "Choose between ser and estar",
    questions: [
      { type: "multiple_choice", prompt: "Yo ___ estudiante.", correct: "soy", options: ["soy", "estoy", "es", "está"], explanation: "Profession uses ser" },
      { type: "multiple_choice", prompt: "Ella ___ cansada.", correct: "está", options: ["es", "está", "son", "están"], explanation: "Temporary state uses estar" },
      { type: "multiple_choice", prompt: "Nosotros ___ de México.", correct: "somos", options: ["somos", "estamos", "es", "están"], explanation: "Origin uses ser" },
      { type: "multiple_choice", prompt: "El café ___ caliente.", correct: "está", options: ["es", "está", "son", "están"], explanation: "Temperature/condition uses estar" },
      { type: "multiple_choice", prompt: "La fiesta ___ en mi casa.", correct: "está", options: ["es", "está", "son", "están"], explanation: "Location uses estar" },
      { type: "multiple_choice", prompt: "El cielo ___ azul.", correct: "es", options: ["es", "está", "son", "están"], explanation: "Inherent color uses ser" },
      { type: "multiple_choice", prompt: "María ___ muy bonita.", correct: "es", options: ["es", "está", "son", "están"], explanation: "Inherent quality uses ser" },
      { type: "multiple_choice", prompt: "Los niños ___ contentos.", correct: "están", options: ["son", "están", "es", "está"], explanation: "Current emotional state uses estar" },
    ],
  },
  {
    id: "por-para",
    title: "Por vs Para",
    emoji: "🔄",
    description: "Choose between por and para",
    questions: [
      { type: "multiple_choice", prompt: "Gracias ___ tu ayuda.", correct: "por", options: ["por", "para"], explanation: "Thanks for uses por" },
      { type: "multiple_choice", prompt: "Estudio ___ ser doctor.", correct: "para", options: ["por", "para"], explanation: "Purpose/goal uses para" },
      { type: "multiple_choice", prompt: "Camino ___ el parque.", correct: "por", options: ["por", "para"], explanation: "Through/along uses por" },
      { type: "multiple_choice", prompt: "El regalo es ___ ti.", correct: "para", options: ["por", "para"], explanation: "Intended recipient uses para" },
      { type: "multiple_choice", prompt: "Pagué diez dólares ___ el libro.", correct: "por", options: ["por", "para"], explanation: "Exchange/price uses por" },
      { type: "multiple_choice", prompt: "Necesito llegar ___ las tres.", correct: "para", options: ["por", "para"], explanation: "Deadline uses para" },
      { type: "multiple_choice", prompt: "Viajamos ___ avión.", correct: "en", options: ["por", "para", "en", "con"], explanation: "Transport mode uses en (trick question!)" },
      { type: "multiple_choice", prompt: "___ mí, es perfecto.", correct: "Para", options: ["Por", "Para", "A", "De"], explanation: "Opinion uses para" },
    ],
  },
  {
    id: "adjective-agreement",
    title: "Adjective Agreement",
    emoji: "🎨",
    description: "Match adjectives to nouns",
    questions: [
      { type: "fill_blank", prompt: "El gato ___ (negro/negra)", correct: "negro", options: ["negro", "negra", "negros", "negras"], explanation: "Masculine singular noun needs masc. sing. adjective" },
      { type: "fill_blank", prompt: "La casa ___ (grande/grandes)", correct: "grande", options: ["grande", "grandes", "grando", "granda"], explanation: "Grande doesn't change for gender" },
      { type: "fill_blank", prompt: "Los perros ___ (pequeño/pequeños)", correct: "pequeños", options: ["pequeño", "pequeña", "pequeños", "pequeñas"], explanation: "Masculine plural needs masc. pl. adjective" },
      { type: "fill_blank", prompt: "Las mesas ___ (blanco/blancas)", correct: "blancas", options: ["blanco", "blanca", "blancos", "blancas"], explanation: "Feminine plural needs fem. pl. adjective" },
      { type: "fill_blank", prompt: "El vestido ___ (bonito/bonita)", correct: "bonito", options: ["bonito", "bonita", "bonitos", "bonitas"], explanation: "Vestido is masculine (even though it means dress!)" },
      { type: "fill_blank", prompt: "La flor ___ (hermoso/hermosa)", correct: "hermosa", options: ["hermoso", "hermosa", "hermosos", "hermosas"], explanation: "Feminine singular noun needs fem. sing. adjective" },
      { type: "fill_blank", prompt: "Los zapatos ___ (nuevo/nuevos)", correct: "nuevos", options: ["nuevo", "nueva", "nuevos", "nuevas"], explanation: "Masculine plural needs masc. pl. adjective" },
      { type: "fill_blank", prompt: "Las ideas son ___ (bueno/buenas)", correct: "buenas", options: ["bueno", "buena", "buenos", "buenas"], explanation: "Feminine plural needs fem. pl. adjective" },
    ],
  },
  {
    id: "question-words",
    title: "Question Words",
    emoji: "❓",
    description: "Practice interrogative words",
    questions: [
      { type: "multiple_choice", prompt: "___ te llamas? (What)", correct: "Cómo", options: ["Qué", "Cómo", "Dónde", "Quién"], explanation: "Cómo te llamas = What is your name" },
      { type: "multiple_choice", prompt: "___ vives? (Where)", correct: "Dónde", options: ["Cómo", "Dónde", "Cuándo", "Quién"], explanation: "Dónde = Where" },
      { type: "multiple_choice", prompt: "___ cuesta? (How much)", correct: "Cuánto", options: ["Qué", "Cuándo", "Cuánto", "Por qué"], explanation: "Cuánto = How much" },
      { type: "multiple_choice", prompt: "___ es tu nombre? (Who)", correct: "Quién", options: ["Qué", "Quién", "Cuál", "Dónde"], explanation: "Quién = Who" },
      { type: "multiple_choice", prompt: "___ hora es? (What)", correct: "Qué", options: ["Qué", "Cómo", "Cuándo", "Cuánto"], explanation: "Qué hora = What time" },
      { type: "multiple_choice", prompt: "___ vienes? (When)", correct: "Cuándo", options: ["Dónde", "Cuándo", "Cómo", "Por qué"], explanation: "Cuándo = When" },
      { type: "multiple_choice", prompt: "___ no estudias? (Why)", correct: "Por qué", options: ["Qué", "Cómo", "Por qué", "Cuándo"], explanation: "Por qué = Why" },
      { type: "multiple_choice", prompt: "___ prefieres? (Which)", correct: "Cuál", options: ["Qué", "Cuál", "Quién", "Dónde"], explanation: "Cuál = Which" },
    ],
  },
];
