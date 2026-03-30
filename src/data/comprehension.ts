export interface ComprehensionPassage {
  id: string;
  title: string;
  emoji: string;
  type: "listening" | "reading";
  text: string;
  english: string;
  questions: {
    question: string;
    correct: string;
    options: string[];
  }[];
  xpReward: number;
}

export const listeningPassages: ComprehensionPassage[] = [
  {
    id: "l1",
    title: "Morning Routine",
    emoji: "🌅",
    type: "listening",
    text: "Me llamo Carlos. Todas las mañanas me despierto a las siete. Me ducho y me pongo ropa limpia. Después desayuno con mi familia. Como pan con mantequilla y bebo café con leche. Luego voy al trabajo en autobús.",
    english: "My name is Carlos. Every morning I wake up at seven. I shower and put on clean clothes. Then I have breakfast with my family. I eat bread with butter and drink coffee with milk. Then I go to work by bus.",
    questions: [
      { question: "¿A qué hora se despierta Carlos?", correct: "A las siete", options: ["A las seis", "A las siete", "A las ocho", "A las nueve"] },
      { question: "¿Qué come en el desayuno?", correct: "Pan con mantequilla", options: ["Huevos", "Pan con mantequilla", "Cereal", "Frutas"] },
      { question: "¿Cómo va al trabajo?", correct: "En autobús", options: ["En coche", "En bicicleta", "En autobús", "A pie"] },
    ],
    xpReward: 20,
  },
  {
    id: "l2",
    title: "Weekend Plans",
    emoji: "🏖️",
    type: "listening",
    text: "Este fin de semana vamos a la playa. Mi hermana y yo salimos el sábado por la mañana. Llevamos trajes de baño, toallas y protector solar. El clima va a ser perfecto: soleado con veintiocho grados. Por la noche vamos a cenar en un restaurante frente al mar.",
    english: "This weekend we're going to the beach. My sister and I leave Saturday morning. We bring swimsuits, towels, and sunscreen. The weather will be perfect: sunny with twenty-eight degrees. At night we're going to have dinner at a restaurant by the sea.",
    questions: [
      { question: "¿Adónde van?", correct: "A la playa", options: ["A la montaña", "A la playa", "Al campo", "A la ciudad"] },
      { question: "¿Cuándo salen?", correct: "El sábado por la mañana", options: ["El viernes", "El sábado por la mañana", "El domingo", "El lunes"] },
      { question: "¿Qué clima va a hacer?", correct: "Soleado", options: ["Lluvioso", "Nublado", "Soleado", "Frío"] },
    ],
    xpReward: 20,
  },
  {
    id: "l3",
    title: "At the Doctor",
    emoji: "🏥",
    type: "listening",
    text: "Buenos días, doctor. Me duele mucho la cabeza desde ayer. También tengo fiebre y estoy muy cansado. No puedo dormir bien por la noche. ¿Qué medicina necesito tomar?",
    english: "Good morning, doctor. My head hurts a lot since yesterday. I also have a fever and I'm very tired. I can't sleep well at night. What medicine do I need to take?",
    questions: [
      { question: "¿Qué le duele?", correct: "La cabeza", options: ["La espalda", "La cabeza", "El estómago", "La pierna"] },
      { question: "¿Desde cuándo se siente mal?", correct: "Desde ayer", options: ["Desde hoy", "Desde ayer", "Desde la semana pasada", "Desde hace dos días"] },
      { question: "¿Qué otro síntoma tiene?", correct: "Fiebre", options: ["Tos", "Fiebre", "Náuseas", "Mareos"] },
    ],
    xpReward: 20,
  },
];

export const readingPassages: ComprehensionPassage[] = [
  {
    id: "r1",
    title: "Mi Familia",
    emoji: "👨‍👩‍👧‍👦",
    type: "reading",
    text: "Me llamo Sofía y soy de Argentina. Tengo una familia grande. Mi padre se llama Roberto y es abogado. Mi madre se llama Carmen y es profesora. Tengo dos hermanos: Miguel tiene dieciocho años y estudia ingeniería, y Lucía tiene quince años y le gusta pintar. Los domingos siempre comemos juntos en casa de mis abuelos.",
    english: "My name is Sofia and I'm from Argentina. I have a big family. My father's name is Roberto and he's a lawyer. My mother's name is Carmen and she's a teacher. I have two brothers: Miguel is eighteen and studies engineering, and Lucia is fifteen and likes painting. On Sundays we always eat together at my grandparents' house.",
    questions: [
      { question: "¿De dónde es Sofía?", correct: "De Argentina", options: ["De México", "De España", "De Argentina", "De Colombia"] },
      { question: "¿Qué profesión tiene su padre?", correct: "Abogado", options: ["Doctor", "Abogado", "Ingeniero", "Profesor"] },
      { question: "¿Qué edad tiene Miguel?", correct: "Dieciocho años", options: ["Quince años", "Dieciséis años", "Dieciocho años", "Veinte años"] },
      { question: "¿Qué hacen los domingos?", correct: "Comen juntos en casa de los abuelos", options: ["Van al cine", "Comen juntos en casa de los abuelos", "Juegan fútbol", "Visitan el museo"] },
    ],
    xpReward: 25,
  },
  {
    id: "r2",
    title: "Un Día en Madrid",
    emoji: "🇪🇸",
    type: "reading",
    text: "Ayer fue un día perfecto en Madrid. Por la mañana visité el Museo del Prado. Vi pinturas de Velázquez y Goya. Después caminé por el Parque del Retorno y almorcé en un pequeño restaurante. Por la tarde fui de compras en la Gran Vía. Por la noche cené con mis amigos en un restaurante español. Comimos paella y sangría. ¡Fue un día maravilloso!",
    english: "Yesterday was a perfect day in Madrid. In the morning I visited the Prado Museum. I saw paintings by Velázquez and Goya. After that I walked through Retiro Park and had lunch at a small restaurant. In the afternoon I went shopping on Gran Vía. At night I had dinner with my friends at a Spanish restaurant. We ate paella and sangria. It was a wonderful day!",
    questions: [
      { question: "¿Qué museo visitó?", correct: "El Museo del Prado", options: ["El Museo Reina Sofía", "El Museo del Prado", "El Thyssen", "El Museo Sorolla"] },
      { question: "¿Qué comieron por la noche?", correct: "Paella y sangría", options: ["Tapas y cerveza", "Paella y sangría", "Tortilla y vino", "Gazpacho y agua"] },
      { question: "¿Dónde fue de compras?", correct: "En la Gran Vía", options: ["En la Gran Vía", "En Sol", "En Chueca", "En Malasaña"] },
    ],
    xpReward: 25,
  },
  {
    id: "r3",
    title: "La Rutina de Ana",
    emoji: "📅",
    type: "reading",
    text: "Ana es estudiante de medicina en la Universidad de Buenos Aires. Se despierta a las seis de la mañana todos los días. Toma un café y come tostadas con mermelada. Luego toma el tren a la universidad. Las clases empiezan a las ocho y terminan a las tres de la tarde. Después de clase, Ana estudia en la biblioteca hasta las seis. Por la noche cena con su familia y ve la televisión. Se acuesta a las once.",
    english: "Ana is a medical student at the University of Buenos Aires. She wakes up at six in the morning every day. She has a coffee and eats toast with jam. Then she takes the train to the university. Classes start at eight and end at three in the afternoon. After class, Ana studies at the library until six. At night she has dinner with her family and watches television. She goes to bed at eleven.",
    questions: [
      { question: "¿Qué estudia Ana?", correct: "Medicina", options: ["Derecho", "Medicina", "Ingeniería", "Arquitectura"] },
      { question: "¿A qué hora terminan las clases?", correct: "A las tres de la tarde", options: ["A las dos", "A las tres de la tarde", "A las cuatro", "A las cinco"] },
      { question: "¿Qué hace después de clase?", correct: "Estudia en la biblioteca", options: ["Va al gimnasio", "Estudia en la biblioteca", "Trabaja", "Va al parque"] },
    ],
    xpReward: 25,
  },
];
