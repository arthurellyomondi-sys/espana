export interface Conjugation {
  person: string;
  spanish: string;
  english: string;
}

export interface Verb {
  infinitive: string;
  english: string;
  type: "regular" | "irregular";
  group: "ar" | "er" | "ir";
  conjugations: Conjugation[];
  examples: string[];
}

export const verbs: Verb[] = [
  {
    infinitive: "Hablar",
    english: "To speak",
    type: "regular",
    group: "ar",
    conjugations: [
      { person: "Yo", spanish: "hablo", english: "I speak" },
      { person: "Tú", spanish: "hablas", english: "You speak" },
      { person: "Él/Ella", spanish: "habla", english: "He/She speaks" },
      { person: "Nosotros", spanish: "hablamos", english: "We speak" },
      { person: "Vosotros", spanish: "habláis", english: "You all speak" },
      { person: "Ellos/Ellas", spanish: "hablan", english: "They speak" },
    ],
    examples: [
      "Yo hablo español.",
      "Ellos hablan muy rápido.",
      "Nosotros hablamos todos los días.",
    ],
  },
  {
    infinitive: "Comer",
    english: "To eat",
    type: "regular",
    group: "er",
    conjugations: [
      { person: "Yo", spanish: "como", english: "I eat" },
      { person: "Tú", spanish: "comes", english: "You eat" },
      { person: "Él/Ella", spanish: "come", english: "He/She eats" },
      { person: "Nosotros", spanish: "comemos", english: "We eat" },
      { person: "Vosotros", spanish: "coméis", english: "You all eat" },
      { person: "Ellos/Ellas", spanish: "comen", english: "They eat" },
    ],
    examples: [
      "Yo como frutas todos los días.",
      "Ellos comen en el restaurante.",
      "Nosotros comemos juntos.",
    ],
  },
  {
    infinitive: "Vivir",
    english: "To live",
    type: "regular",
    group: "ir",
    conjugations: [
      { person: "Yo", spanish: "vivo", english: "I live" },
      { person: "Tú", spanish: "vives", english: "You live" },
      { person: "Él/Ella", spanish: "vive", english: "He/She lives" },
      { person: "Nosotros", spanish: "vivimos", english: "We live" },
      { person: "Vosotros", spanish: "vivís", english: "You all live" },
      { person: "Ellos/Ellas", spanish: "viven", english: "They live" },
    ],
    examples: [
      "Yo vivo en Madrid.",
      "Ellos viven en una casa grande.",
      "Nosotros vivimos cerca del parque.",
    ],
  },
  {
    infinitive: "Ser",
    english: "To be (permanent)",
    type: "irregular",
    group: "er",
    conjugations: [
      { person: "Yo", spanish: "soy", english: "I am" },
      { person: "Tú", spanish: "eres", english: "You are" },
      { person: "Él/Ella", spanish: "es", english: "He/She is" },
      { person: "Nosotros", spanish: "somos", english: "We are" },
      { person: "Vosotros", spanish: "sois", english: "You all are" },
      { person: "Ellos/Ellas", spanish: "son", english: "They are" },
    ],
    examples: [
      "Yo soy estudiante.",
      "Ellos son amigos.",
      "Nosotros somos de México.",
    ],
  },
  {
    infinitive: "Estar",
    english: "To be (temporary/location)",
    type: "irregular",
    group: "ar",
    conjugations: [
      { person: "Yo", spanish: "estoy", english: "I am" },
      { person: "Tú", spanish: "estás", english: "You are" },
      { person: "Él/Ella", spanish: "está", english: "He/She is" },
      { person: "Nosotros", spanish: "estamos", english: "We are" },
      { person: "Vosotros", spanish: "estáis", english: "You all are" },
      { person: "Ellos/Ellas", spanish: "están", english: "They are" },
    ],
    examples: [
      "Estoy cansado.",
      "Ellos están en la escuela.",
      "Nosotros estamos contentos.",
    ],
  },
  {
    infinitive: "Tener",
    english: "To have",
    type: "irregular",
    group: "er",
    conjugations: [
      { person: "Yo", spanish: "tengo", english: "I have" },
      { person: "Tú", spanish: "tienes", english: "You have" },
      { person: "Él/Ella", spanish: "tiene", english: "He/She has" },
      { person: "Nosotros", spanish: "tenemos", english: "We have" },
      { person: "Vosotros", spanish: "tenéis", english: "You all have" },
      { person: "Ellos/Ellas", spanish: "tienen", english: "They have" },
    ],
    examples: [
      "Tengo un perro.",
      "Ellos tienen mucho dinero.",
      "Nosotros tenemos tiempo.",
    ],
  },
  {
    infinitive: "Ir",
    english: "To go",
    type: "irregular",
    group: "ir",
    conjugations: [
      { person: "Yo", spanish: "voy", english: "I go" },
      { person: "Tú", spanish: "vas", english: "You go" },
      { person: "Él/Ella", spanish: "va", english: "He/She goes" },
      { person: "Nosotros", spanish: "vamos", english: "We go" },
      { person: "Vosotros", spanish: "vais", english: "You all go" },
      { person: "Ellos/Ellas", spanish: "van", english: "They go" },
    ],
    examples: [
      "Voy a la tienda.",
      "Ellos van al cine.",
      "Vamos a la playa.",
    ],
  },
  {
    infinitive: "Hacer",
    english: "To do/make",
    type: "irregular",
    group: "er",
    conjugations: [
      { person: "Yo", spanish: "hago", english: "I do/make" },
      { person: "Tú", spanish: "haces", english: "You do/make" },
      { person: "Él/Ella", spanish: "hace", english: "He/She does/makes" },
      { person: "Nosotros", spanish: "hacemos", english: "We do/make" },
      { person: "Vosotros", spanish: "hacéis", english: "You all do/make" },
      { person: "Ellos/Ellas", spanish: "hacen", english: "They do/make" },
    ],
    examples: [
      "Hago ejercicio todos los días.",
      "Ellos hacen la tarea.",
      "Nosotros hacemos la cena.",
    ],
  },
  {
    infinitive: "Poder",
    english: "To be able to/can",
    type: "irregular",
    group: "er",
    conjugations: [
      { person: "Yo", spanish: "puedo", english: "I can" },
      { person: "Tú", spanish: "puedes", english: "You can" },
      { person: "Él/Ella", spanish: "puede", english: "He/She can" },
      { person: "Nosotros", spanish: "podemos", english: "We can" },
      { person: "Vosotros", spanish: "podéis", english: "You all can" },
      { person: "Ellos/Ellas", spanish: "pueden", english: "They can" },
    ],
    examples: [
      "Puedo hablar español.",
      "Ellos pueden venir mañana.",
      "No podemos ir al cine.",
    ],
  },
  {
    infinitive: "Querer",
    english: "To want",
    type: "irregular",
    group: "er",
    conjugations: [
      { person: "Yo", spanish: "quiero", english: "I want" },
      { person: "Tú", spanish: "quieres", english: "You want" },
      { person: "Él/Ella", spanish: "quiere", english: "He/She wants" },
      { person: "Nosotros", spanish: "queremos", english: "We want" },
      { person: "Vosotros", spanish: "queréis", english: "You all want" },
      { person: "Ellos/Ellas", spanish: "quieren", english: "They want" },
    ],
    examples: [
      "Quiero aprender español.",
      "Ellos quieren viajar a España.",
      "Queremos ayudarte.",
    ],
  },
];

export const sentenceExercises = [
  {
    spanish: "Yo como una manzana",
    english: "I eat an apple",
    words: ["Yo", "como", "una", "manzana"],
  },
  {
    spanish: "El gato duerme en la cama",
    english: "The cat sleeps on the bed",
    words: ["El", "gato", "duerme", "en", "la", "cama"],
  },
  {
    spanish: "Nosotros hablamos español",
    english: "We speak Spanish",
    words: ["Nosotros", "hablamos", "español"],
  },
  {
    spanish: "Ella tiene un perro negro",
    english: "She has a black dog",
    words: ["Ella", "tiene", "un", "perro", "negro"],
  },
  {
    spanish: "Ellos van al parque",
    english: "They go to the park",
    words: ["Ellos", "van", "al", "parque"],
  },
  {
    spanish: "Mi madre cocina muy bien",
    english: "My mother cooks very well",
    words: ["Mi", "madre", "cocina", "muy", "bien"],
  },
  {
    spanish: "Quiero un café con leche",
    english: "I want a coffee with milk",
    words: ["Quiero", "un", "café", "con", "leche"],
  },
  {
    spanish: "Los niños juegan en el parque",
    english: "The children play in the park",
    words: ["Los", "niños", "juegan", "en", "el", "parque"],
  },
  {
    spanish: "Me gusta la música latina",
    english: "I like Latin music",
    words: ["Me", "gusta", "la", "música", "latina"],
  },
  {
    spanish: "¿Dónde está el restaurante?",
    english: "Where is the restaurant?",
    words: ["¿Dónde", "está", "el", "restaurante?"],
  },
];
