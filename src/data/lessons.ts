export type ExerciseType =
  | "translate"
  | "fill_blank"
  | "listen_choose"
  | "word_bank"
  | "match_pairs";

export interface Exercise {
  type: ExerciseType;
  prompt: string;
  correct: string;
  options?: string[];
  wordBank?: string[];
  pairs?: { spanish: string; english: string }[];
  hint?: string;
  spanish?: string;
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  description: string;
  exercises: Exercise[];
  xpReward: number;
}

export interface Unit {
  id: string;
  title: string;
  emoji: string;
  color: string;
  lessons: Lesson[];
}

export const units: Unit[] = [
  {
    id: "unit-1",
    title: "Basics",
    emoji: "🌱",
    color: "from-emerald-500 to-green-500",
    lessons: [
      {
        id: "l1",
        title: "Greetings",
        emoji: "👋",
        description: "Learn how to say hello and goodbye",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Hola" mean?',
            correct: "Hello",
            options: ["Hello", "Goodbye", "Please", "Thank you"],
          },
          {
            type: "translate",
            prompt: 'What does "Adiós" mean?',
            correct: "Goodbye",
            options: ["Hello", "Goodbye", "Good night", "See you"],
          },
          {
            type: "fill_blank",
            prompt: "_____ días, ¿cómo estás?",
            correct: "Buenos",
            options: ["Buenos", "Buenas", "Bueno", "Buena"],
            spanish: "Buenos días, ¿cómo estás?",
          },
          {
            type: "word_bank",
            prompt: "Build: Thank you very much",
            correct: "Muchas gracias",
            wordBank: ["Muchas", "gracias", "Por", "favor", "De", "nada"],
          },
          {
            type: "translate",
            prompt: 'What does "Buenas noches" mean?',
            correct: "Good night",
            options: ["Good morning", "Good afternoon", "Good night", "Goodbye"],
          },
          {
            type: "translate",
            prompt: 'What does "De nada" mean?',
            correct: "You're welcome",
            options: ["Thank you", "You're welcome", "Please", "Of nothing"],
          },
          {
            type: "fill_blank",
            prompt: "Un café, _____ favor.",
            correct: "por",
            options: ["por", "para", "de", "con"],
            spanish: "Un café, por favor.",
          },
        ],
      },
      {
        id: "l2",
        title: "Politeness",
        emoji: "🙏",
        description: "Essential polite expressions",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Por favor" mean?',
            correct: "Please",
            options: ["Thank you", "Please", "Sorry", "Excuse me"],
          },
          {
            type: "translate",
            prompt: 'What does "Gracias" mean?',
            correct: "Thank you",
            options: ["Please", "Thank you", "Sorry", "Hello"],
          },
          {
            type: "fill_blank",
            prompt: "_____ nada, fue un placer.",
            correct: "De",
            options: ["De", "Por", "Para", "Con"],
            spanish: "De nada, fue un placer.",
          },
          {
            type: "word_bank",
            prompt: "Build: Good afternoon, ma'am",
            correct: "Buenas tardes señora",
            wordBank: ["Buenas", "tardes", "señora", "señor", "noches"],
          },
          {
            type: "translate",
            prompt: 'What does "Lo siento" mean?',
            correct: "I'm sorry",
            options: ["I'm sorry", "I feel it", "I think", "Excuse me"],
          },
          {
            type: "fill_blank",
            prompt: "_____ gracias por tu ayuda.",
            correct: "Muchas",
            options: ["Muchas", "Mucho", "Muchos", "Mucha"],
            spanish: "Muchas gracias por tu ayuda.",
          },
        ],
      },
      {
        id: "l3",
        title: "Introductions",
        emoji: "🤝",
        description: "Introduce yourself in Spanish",
        xpReward: 20,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Me llamo" mean?',
            correct: "My name is",
            options: ["I call", "My name is", "I am called", "His name is"],
          },
          {
            type: "word_bank",
            prompt: "Build: My name is Carlos",
            correct: "Me llamo Carlos",
            wordBank: ["Me", "llamo", "Carlos", "Soy", "nombre"],
          },
          {
            type: "translate",
            prompt: 'What does "¿Cómo te llamas?" mean?',
            correct: "What is your name?",
            options: [
              "How are you?",
              "What is your name?",
              "What do you call?",
              "Where are you from?",
            ],
          },
          {
            type: "fill_blank",
            prompt: "Soy _____ España.",
            correct: "de",
            options: ["de", "en", "por", "para"],
            spanish: "Soy de España.",
          },
          {
            type: "translate",
            prompt: 'What does "Mucho gusto" mean?',
            correct: "Nice to meet you",
            options: [
              "A lot of taste",
              "Nice to meet you",
              "Very good",
              "Much pleasure",
            ],
          },
          {
            type: "fill_blank",
            prompt: "¿De _____ eres?",
            correct: "dónde",
            options: ["dónde", "donde", "qué", "quién"],
            spanish: "¿De dónde eres?",
          },
          {
            type: "translate",
            prompt: 'What does "Encantado" mean?',
            correct: "Pleased to meet you",
            options: [
              "Enchanted",
              "Pleased to meet you",
              "Excited",
              "Happy to help",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "unit-2",
    title: "Food & Drinks",
    emoji: "🍽️",
    color: "from-red-500 to-pink-500",
    lessons: [
      {
        id: "l4",
        title: "Basic Foods",
        emoji: "🍎",
        description: "Learn common food words",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Agua" mean?',
            correct: "Water",
            options: ["Water", "Milk", "Coffee", "Juice"],
          },
          {
            type: "translate",
            prompt: 'What does "Pan" mean?',
            correct: "Bread",
            options: ["Bread", "Butter", "Cheese", "Meat"],
          },
          {
            type: "fill_blank",
            prompt: "Quiero una _____ roja.",
            correct: "manzana",
            options: ["manzana", "naranja", "pera", "uva"],
            spanish: "Quiero una manzana roja.",
          },
          {
            type: "translate",
            prompt: 'What does "Leche" mean?',
            correct: "Milk",
            options: ["Milk", "Water", "Coffee", "Tea"],
          },
          {
            type: "word_bank",
            prompt: "Build: A glass of water, please",
            correct: "Un vaso de agua por favor",
            wordBank: ["Un", "vaso", "de", "agua", "por", "favor", "café"],
          },
          {
            type: "translate",
            prompt: 'What does "Café" mean?',
            correct: "Coffee",
            options: ["Coffee", "Tea", "Cafe", "Cake"],
          },
        ],
      },
      {
        id: "l5",
        title: "Meals",
        emoji: "🍽️",
        description: "Talk about meals and eating",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Arroz" mean?',
            correct: "Rice",
            options: ["Rice", "Chicken", "Fish", "Beans"],
          },
          {
            type: "translate",
            prompt: 'What does "Pollo" mean?',
            correct: "Chicken",
            options: ["Chicken", "Fish", "Beef", "Pork"],
          },
          {
            type: "fill_blank",
            prompt: "El arroz con _____ es delicioso.",
            correct: "pollo",
            options: ["pollo", "carne", "pescado", "verdura"],
            spanish: "El arroz con pollo es delicioso.",
          },
          {
            type: "word_bank",
            prompt: "Build: I like fresh fruit",
            correct: "Me gusta la fruta fresca",
            wordBank: ["Me", "gusta", "la", "fruta", "fresca", "el", "pan"],
          },
          {
            type: "translate",
            prompt: 'What does "Fruta" mean?',
            correct: "Fruit",
            options: ["Fruit", "Vegetable", "Meat", "Bread"],
          },
          {
            type: "fill_blank",
            prompt: "Me gusta el café con _____.",
            correct: "leche",
            options: ["leche", "azúcar", "agua", "hielo"],
            spanish: "Me gusta el café con leche.",
          },
          {
            type: "translate",
            prompt: 'What does "Comer" mean?',
            correct: "To eat",
            options: ["To eat", "To drink", "To cook", "To buy"],
          },
        ],
      },
      {
        id: "l6",
        title: "Ordering Food",
        emoji: "🍴",
        description: "Order food at a restaurant",
        xpReward: 20,
        exercises: [
          {
            type: "word_bank",
            prompt: "Build: A table for two, please",
            correct: "Una mesa para dos por favor",
            wordBank: ["Una", "mesa", "para", "dos", "por", "favor", "tres"],
          },
          {
            type: "translate",
            prompt: 'What does "La cuenta" mean?',
            correct: "The check/bill",
            options: ["The check/bill", "The menu", "The table", "The order"],
          },
          {
            type: "fill_blank",
            prompt: "¿Me puede traer el _____?",
            correct: "menú",
            options: ["menú", "cuenta", "plato", "vaso"],
            spanish: "¿Me puede traer el menú?",
          },
          {
            type: "translate",
            prompt: 'What does "Está delicioso" mean?',
            correct: "It's delicious",
            options: ["It's delicious", "It's ready", "It's expensive", "It's hot"],
          },
          {
            type: "word_bank",
            prompt: "Build: I want to ask for the check",
            correct: "Quiero pedir la cuenta",
            wordBank: ["Quiero", "pedir", "la", "cuenta", "el", "menú"],
          },
          {
            type: "translate",
            prompt: 'What does "¿Qué me recomienda?" mean?',
            correct: "What do you recommend?",
            options: [
              "What do you recommend?",
              "What do you want?",
              "What is this?",
              "How much is it?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "unit-3",
    title: "Numbers & Time",
    emoji: "🔢",
    color: "from-blue-500 to-cyan-500",
    lessons: [
      {
        id: "l7",
        title: "Numbers 1-10",
        emoji: "1️⃣",
        description: "Count from one to ten",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Uno" mean?',
            correct: "One",
            options: ["One", "Two", "Three", "Ten"],
          },
          {
            type: "translate",
            prompt: 'What does "Cinco" mean?',
            correct: "Five",
            options: ["Three", "Four", "Five", "Six"],
          },
          {
            type: "fill_blank",
            prompt: "Tengo _____ hermanos.",
            correct: "cinco",
            options: ["cinco", "cuatro", "tres", "seis"],
            spanish: "Tengo cinco hermanos.",
          },
          {
            type: "translate",
            prompt: 'What does "Diez" mean?',
            correct: "Ten",
            options: ["Ten", "Twelve", "Twenty", "Hundred"],
          },
          {
            type: "word_bank",
            prompt: "Build: Two coffees, please",
            correct: "Dos cafés por favor",
            wordBank: ["Dos", "cafés", "por", "favor", "Tres", "aguas"],
          },
          {
            type: "translate",
            prompt: 'What does "Tres" mean?',
            correct: "Three",
            options: ["Two", "Three", "Four", "Five"],
          },
          {
            type: "fill_blank",
            prompt: "Son las _____ de la tarde.",
            correct: "tres",
            options: ["tres", "dos", "cuatro", "cinco"],
            spanish: "Son las tres de la tarde.",
          },
        ],
      },
      {
        id: "l8",
        title: "Larger Numbers",
        emoji: "💯",
        description: "Learn bigger numbers",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Veinte" mean?',
            correct: "Twenty",
            options: ["Ten", "Twenty", "Thirty", "Fifteen"],
          },
          {
            type: "translate",
            prompt: 'What does "Cien" mean?',
            correct: "One hundred",
            options: ["One hundred", "One thousand", "Fifty", "Ten"],
          },
          {
            type: "fill_blank",
            prompt: "Cuesta _____ dólares.",
            correct: "diez",
            options: ["diez", "cien", "mil", "veinte"],
            spanish: "Cuesta diez dólares.",
          },
          {
            type: "translate",
            prompt: 'What does "Mil" mean?',
            correct: "One thousand",
            options: ["One hundred", "One thousand", "One million", "Ten"],
          },
          {
            type: "fill_blank",
            prompt: "Tengo _____ años.",
            correct: "veinte",
            options: ["veinte", "diez", "cien", "treinta"],
            spanish: "Tengo veinte años.",
          },
          {
            type: "word_bank",
            prompt: "Build: It costs one thousand pesos",
            correct: "Cuesta mil pesos",
            wordBank: ["Cuesta", "mil", "pesos", "cien", "dólares"],
          },
        ],
      },
      {
        id: "l9",
        title: "Telling Time",
        emoji: "🕐",
        description: "Ask and tell the time",
        xpReward: 20,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "¿Qué hora es?" mean?',
            correct: "What time is it?",
            options: ["What hour?", "What time is it?", "When is it?", "How late?"],
          },
          {
            type: "word_bank",
            prompt: "Build: It's three o'clock",
            correct: "Son las tres",
            wordBank: ["Son", "las", "tres", "Es", "la", "dos"],
          },
          {
            type: "fill_blank",
            prompt: "Es la una de la _____.",
            correct: "tarde",
            options: ["tarde", "mañana", "noche", "madrugada"],
            spanish: "Es la una de la tarde.",
          },
          {
            type: "translate",
            prompt: 'What does "Mañana" mean in time context?',
            correct: "Tomorrow/Morning",
            options: ["Tomorrow/Morning", "Afternoon", "Night", "Today"],
          },
          {
            type: "translate",
            prompt: 'What does "¿A qué hora?" mean?',
            correct: "At what time?",
            options: ["At what time?", "What hour?", "How long?", "When?"],
          },
          {
            type: "fill_blank",
            prompt: "La reunión es a las _____ de la mañana.",
            correct: "nueve",
            options: ["nueve", "ocho", "diez", "once"],
            spanish: "La reunión es a las nueve de la mañana.",
          },
        ],
      },
    ],
  },
  {
    id: "unit-4",
    title: "Family & People",
    emoji: "👨‍👩‍👧‍👦",
    color: "from-teal-500 to-cyan-500",
    lessons: [
      {
        id: "l10",
        title: "Immediate Family",
        emoji: "👪",
        description: "Learn family member words",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Madre" mean?',
            correct: "Mother",
            options: ["Mother", "Father", "Sister", "Grandmother"],
          },
          {
            type: "translate",
            prompt: 'What does "Padre" mean?',
            correct: "Father",
            options: ["Mother", "Father", "Brother", "Grandfather"],
          },
          {
            type: "fill_blank",
            prompt: "Mi _____ cocina muy bien.",
            correct: "madre",
            options: ["madre", "padre", "hermana", "hija"],
            spanish: "Mi madre cocina muy bien.",
          },
          {
            type: "translate",
            prompt: 'What does "Hermano" mean?',
            correct: "Brother",
            options: ["Brother", "Sister", "Son", "Father"],
          },
          {
            type: "word_bank",
            prompt: "Build: My sister lives in Madrid",
            correct: "Mi hermana vive en Madrid",
            wordBank: ["Mi", "hermana", "vive", "en", "Madrid", "hermano"],
          },
          {
            type: "translate",
            prompt: 'What does "Hijo" mean?',
            correct: "Son",
            options: ["Son", "Daughter", "Brother", "Father"],
          },
        ],
      },
      {
        id: "l11",
        title: "Extended Family",
        emoji: "👴",
        description: "Grandparents and more",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Abuelo" mean?',
            correct: "Grandfather",
            options: ["Grandfather", "Grandmother", "Uncle", "Father"],
          },
          {
            type: "translate",
            prompt: 'What does "Abuela" mean?',
            correct: "Grandmother",
            options: ["Grandmother", "Grandfather", "Aunt", "Mother"],
          },
          {
            type: "fill_blank",
            prompt: "Mi _____ tiene ochenta años.",
            correct: "abuelo",
            options: ["abuelo", "abuela", "padre", "hermano"],
            spanish: "Mi abuelo tiene ochenta años.",
          },
          {
            type: "word_bank",
            prompt: "Build: My grandmother makes cookies",
            correct: "Mi abuela hace galletas",
            wordBank: ["Mi", "abuela", "hace", "galletas", "abuelo", "pan"],
          },
          {
            type: "translate",
            prompt: 'What does "Esposo" mean?',
            correct: "Husband",
            options: ["Husband", "Wife", "Brother", "Son"],
          },
          {
            type: "fill_blank",
            prompt: "Mi _____ estudia música.",
            correct: "hija",
            options: ["hija", "hijo", "hermana", "madre"],
            spanish: "Mi hija estudia música.",
          },
        ],
      },
      {
        id: "l12",
        title: "Describing People",
        emoji: "🧑",
        description: "Describe family members",
        xpReward: 20,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Joven" mean?',
            correct: "Young",
            options: ["Young", "Old", "Tall", "Short"],
          },
          {
            type: "translate",
            prompt: 'What does "Grande" mean?',
            correct: "Big",
            options: ["Big", "Small", "Tall", "Old"],
          },
          {
            type: "fill_blank",
            prompt: "Mi hermano es _____ que yo.",
            correct: "mayor",
            options: ["mayor", "menor", "mejor", "peor"],
            spanish: "Mi hermano es mayor que yo.",
          },
          {
            type: "word_bank",
            prompt: "Build: My dog is very big",
            correct: "Mi perro es muy grande",
            wordBank: ["Mi", "perro", "es", "muy", "grande", "pequeño"],
          },
          {
            type: "translate",
            prompt: 'What does "Pequeño" mean?',
            correct: "Small/Little",
            options: ["Small/Little", "Big", "Young", "Short"],
          },
          {
            type: "fill_blank",
            prompt: "Mi padre _____ mucho.",
            correct: "trabaja",
            options: ["trabaja", "estudia", "cocina", "juega"],
            spanish: "Mi padre trabaja mucho.",
          },
        ],
      },
    ],
  },
  {
    id: "unit-5",
    title: "Daily Life",
    emoji: "☀️",
    color: "from-amber-500 to-orange-500",
    lessons: [
      {
        id: "l13",
        title: "Colors",
        emoji: "🎨",
        description: "Learn the colors in Spanish",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Rojo" mean?',
            correct: "Red",
            options: ["Red", "Blue", "Green", "Yellow"],
          },
          {
            type: "translate",
            prompt: 'What does "Azul" mean?',
            correct: "Blue",
            options: ["Blue", "Green", "Red", "Purple"],
          },
          {
            type: "fill_blank",
            prompt: "El cielo es _____.",
            correct: "azul",
            options: ["azul", "rojo", "verde", "negro"],
            spanish: "El cielo es azul.",
          },
          {
            type: "translate",
            prompt: 'What does "Verde" mean?',
            correct: "Green",
            options: ["Green", "Blue", "Yellow", "Red"],
          },
          {
            type: "word_bank",
            prompt: "Build: The trees are green",
            correct: "Los árboles son verdes",
            wordBank: ["Los", "árboles", "son", "verdes", "flores", "rojos"],
          },
          {
            type: "translate",
            prompt: 'What does "Amarillo" mean?',
            correct: "Yellow",
            options: ["Yellow", "Orange", "Green", "Red"],
          },
          {
            type: "fill_blank",
            prompt: "Tengo un gato _____.",
            correct: "negro",
            options: ["negro", "blanco", "rojo", "gris"],
            spanish: "Tengo un gato negro.",
          },
        ],
      },
      {
        id: "l14",
        title: "Weather",
        emoji: "🌤️",
        description: "Talk about the weather",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Sol" mean?',
            correct: "Sun",
            options: ["Sun", "Rain", "Snow", "Wind"],
          },
          {
            type: "fill_blank",
            prompt: "Hace mucho _____ hoy.",
            correct: "sol",
            options: ["sol", "viento", "frío", "calor"],
            spanish: "Hace mucho sol hoy.",
          },
          {
            type: "translate",
            prompt: 'What does "Lluvia" mean?',
            correct: "Rain",
            options: ["Rain", "Snow", "Cloud", "Storm"],
          },
          {
            type: "translate",
            prompt: 'What does "Nieve" mean?',
            correct: "Snow",
            options: ["Snow", "Rain", "Cloud", "Wind"],
          },
          {
            type: "word_bank",
            prompt: "Build: It's cold in winter",
            correct: "Hace frío en invierno",
            wordBank: ["Hace", "frío", "en", "invierno", "calor", "verano"],
          },
          {
            type: "fill_blank",
            prompt: "Hay muchas _____ en el cielo.",
            correct: "nubes",
            options: ["nubes", "estrellas", "aves", "tormentas"],
            spanish: "Hay muchas nubes en el cielo.",
          },
        ],
      },
      {
        id: "l15",
        title: "Animals",
        emoji: "🐾",
        description: "Learn animal names",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Perro" mean?',
            correct: "Dog",
            options: ["Dog", "Cat", "Bird", "Fish"],
          },
          {
            type: "translate",
            prompt: 'What does "Gato" mean?',
            correct: "Cat",
            options: ["Cat", "Dog", "Rabbit", "Horse"],
          },
          {
            type: "fill_blank",
            prompt: "El _____ duerme mucho.",
            correct: "gato",
            options: ["gato", "perro", "pájaro", "pez"],
            spanish: "El gato duerme mucho.",
          },
          {
            type: "word_bank",
            prompt: "Build: The fish swims in the water",
            correct: "El pez nada en el agua",
            wordBank: ["El", "pez", "nada", "en", "el", "agua", "río"],
          },
          {
            type: "translate",
            prompt: 'What does "Caballo" mean?',
            correct: "Horse",
            options: ["Horse", "Cow", "Dog", "Bird"],
          },
          {
            type: "translate",
            prompt: 'What does "Mariposa" mean?',
            correct: "Butterfly",
            options: ["Butterfly", "Bird", "Bee", "Flower"],
          },
          {
            type: "fill_blank",
            prompt: "El conejo es muy _____.",
            correct: "lindo",
            options: ["lindo", "grande", "feo", "rápido"],
            spanish: "El conejo es muy lindo.",
          },
        ],
      },
    ],
  },
  {
    id: "unit-6",
    title: "Getting Around",
    emoji: "🧭",
    color: "from-sky-500 to-blue-500",
    lessons: [
      {
        id: "l16",
        title: "Directions",
        emoji: "🧭",
        description: "Navigate with direction words",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Izquierda" mean?',
            correct: "Left",
            options: ["Left", "Right", "Straight", "Back"],
          },
          {
            type: "translate",
            prompt: 'What does "Derecha" mean?',
            correct: "Right",
            options: ["Right", "Left", "Straight", "Corner"],
          },
          {
            type: "fill_blank",
            prompt: "Gira a la _____ en la esquina.",
            correct: "izquierda",
            options: ["izquierda", "derecha", "recto", "atrás"],
            spanish: "Gira a la izquierda en la esquina.",
          },
          {
            type: "translate",
            prompt: 'What does "Cerca" mean?',
            correct: "Near",
            options: ["Near", "Far", "Here", "There"],
          },
          {
            type: "word_bank",
            prompt: "Build: Go straight for two blocks",
            correct: "Sigue recto por dos cuadras",
            wordBank: ["Sigue", "recto", "por", "dos", "cuadras", "tres"],
          },
          {
            type: "fill_blank",
            prompt: "El aeropuerto está _____.",
            correct: "lejos",
            options: ["lejos", "cerca", "aquí", "allí"],
            spanish: "El aeropuerto está lejos.",
          },
        ],
      },
      {
        id: "l17",
        title: "Places",
        emoji: "🏛️",
        description: "Learn places around town",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Hotel" mean?',
            correct: "Hotel",
            options: ["Hotel", "Hospital", "House", "Hostel"],
          },
          {
            type: "translate",
            prompt: 'What does "Playa" mean?',
            correct: "Beach",
            options: ["Beach", "Pool", "Lake", "Park"],
          },
          {
            type: "fill_blank",
            prompt: "Visitamos el _____ de arte.",
            correct: "museo",
            options: ["museo", "parque", "restaurante", "hotel"],
            spanish: "Visitamos el museo de arte.",
          },
          {
            type: "word_bank",
            prompt: "Build: The children play in the park",
            correct: "Los niños juegan en el parque",
            wordBank: ["Los", "niños", "juegan", "en", "el", "parque", "calle"],
          },
          {
            type: "translate",
            prompt: 'What does "Restaurante" mean?',
            correct: "Restaurant",
            options: ["Restaurant", "Kitchen", "Cafeteria", "Store"],
          },
          {
            type: "fill_blank",
            prompt: "La _____ está muy transitada.",
            correct: "calle",
            options: ["calle", "ciudad", "casa", "iglesia"],
            spanish: "La calle está muy transitada.",
          },
        ],
      },
      {
        id: "l18",
        title: "Travel Phrases",
        emoji: "✈️",
        description: "Essential travel expressions",
        xpReward: 20,
        exercises: [
          {
            type: "word_bank",
            prompt: "Build: How do I get to downtown?",
            correct: "Cómo llego al centro",
            wordBank: ["Cómo", "llego", "al", "centro", "dónde", "está"],
          },
          {
            type: "translate",
            prompt: 'What does "¿Está lejos de aquí?" mean?',
            correct: "Is it far from here?",
            options: [
              "Is it far from here?",
              "Is it near here?",
              "Where is it?",
              "How far?",
            ],
          },
          {
            type: "fill_blank",
            prompt: "Necesito un _____.",
            correct: "taxi",
            options: ["taxi", "bus", "tren", "avión"],
            spanish: "Necesito un taxi.",
          },
          {
            type: "translate",
            prompt: 'What does "¿Cuánto cuesta el boleto?" mean?',
            correct: "How much does the ticket cost?",
            options: [
              "How much does the ticket cost?",
              "Where is the ticket?",
              "Can I buy a ticket?",
              "What time is the bus?",
            ],
          },
          {
            type: "word_bank",
            prompt: "Build: Where is the subway station?",
            correct: "Dónde está la estación de metro",
            wordBank: ["Dónde", "está", "la", "estación", "de", "metro", "bus"],
          },
          {
            type: "fill_blank",
            prompt: "¿Puede mostrarme en el _____?",
            correct: "mapa",
            options: ["mapa", "libro", "celular", "papel"],
            spanish: "¿Puede mostrarme en el mapa?",
          },
        ],
      },
    ],
  },
  {
    id: "unit-7",
    title: "Professions",
    emoji: "👨‍⚕️",
    color: "from-violet-500 to-purple-500",
    lessons: [
      {
        id: "l19",
        title: "Jobs",
        emoji: "💼",
        description: "Learn vocabulary about professions",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Profesor" mean?',
            correct: "Teacher",
            options: ["Teacher", "Professor", "Student", "Doctor"],
          },
          {
            type: "translate",
            prompt: 'What does "Enfermera" mean?',
            correct: "Nurse",
            options: ["Nurse", "Doctor", "Patient", "Pharmacist"],
          },
          {
            type: "fill_blank",
            prompt: "Mi _____ es muy amable.",
            correct: "profesor",
            options: ["profesor", "médico", "abogado", "ingeniero"],
            spanish: "Mi profesor es muy amable.",
          },
          {
            type: "translate",
            prompt: 'What does "Abogado" mean?',
            correct: "Lawyer",
            options: ["Lawyer", "Judge", "Police officer", "Teacher"],
          },
          {
            type: "translate",
            prompt: 'What does "Ingeniero" mean?',
            correct: "Engineer",
            options: ["Engineer", "Architect", "Scientist", "Mechanic"],
          },
          {
            type: "word_bank",
            prompt: "Build: My sister is a nurse",
            correct: "Mi hermana es enfermera",
            wordBank: ["Mi", "hermana", "es", "enfermera", "profesora", "la"],
          },
        ],
      },
      {
        id: "l20",
        title: "Work Talk",
        emoji: "🏢",
        description: "Work-related phrases",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Cocinero" mean?',
            correct: "Cook/Chef",
            options: ["Cook/Chef", "Waiter", "Farmer", "Baker"],
          },
          {
            type: "fill_blank",
            prompt: "El _____ construye casas.",
            correct: "carpintero",
            options: ["carpintero", "músico", "periodista", "ingeniero"],
            spanish: "El carpintero construye casas.",
          },
          {
            type: "translate",
            prompt: 'What does "Periodista" mean?',
            correct: "Journalist",
            options: ["Journalist", "Writer", "Reporter", "Editor"],
          },
          {
            type: "translate",
            prompt: 'What does "Músico" mean?',
            correct: "Musician",
            options: ["Musician", "Singer", "Artist", "Dancer"],
          },
          {
            type: "fill_blank",
            prompt: "Ella _____ en un restaurante.",
            correct: "trabaja",
            options: ["trabaja", "estudia", "cocina", "vive"],
            spanish: "Ella trabaja en un restaurante.",
          },
          {
            type: "word_bank",
            prompt: "Build: He works as a journalist",
            correct: "Él trabaja como periodista",
            wordBank: ["Él", "trabaja", "como", "periodista", "músico", "en"],
          },
        ],
      },
      {
        id: "l21",
        title: "Careers",
        emoji: "🎯",
        description: "Advanced career vocabulary",
        xpReward: 20,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Trabajo" mean?',
            correct: "Job/Work",
            options: ["Job/Work", "Career", "Task", "Office"],
          },
          {
            type: "fill_blank",
            prompt: "Quiero ser _____ cuando sea grande.",
            correct: "ingeniero",
            options: ["ingeniero", "enfermera", "cocinero", "carpintero"],
            spanish: "Quiero ser ingeniero cuando sea grande.",
          },
          {
            type: "word_bank",
            prompt: "Build: The musician plays the guitar",
            correct: "El músico toca la guitarra",
            wordBank: ["El", "músico", "toca", "la", "guitarra", "piano", "un"],
          },
          {
            type: "translate",
            prompt: 'What does "Empleo" mean?',
            correct: "Employment",
            options: ["Employment", "Interview", "Resume", "Boss"],
          },
          {
            type: "fill_blank",
            prompt: "La _____ cuida a los pacientes.",
            correct: "enfermera",
            options: ["enfermera", "profesora", "abogada", "periodista"],
            spanish: "La enfermera cuida a los pacientes.",
          },
          {
            type: "word_bank",
            prompt: "Build: The lawyer works at the office",
            correct: "El abogado trabaja en la oficina",
            wordBank: ["El", "abogado", "trabaja", "en", "la", "oficina", "casa"],
          },
          {
            type: "translate",
            prompt: 'What does "Oficina" mean?',
            correct: "Office",
            options: ["Office", "House", "Store", "School"],
          },
        ],
      },
    ],
  },
  {
    id: "unit-8",
    title: "Home & Emotions",
    emoji: "🏠",
    color: "from-orange-500 to-amber-500",
    lessons: [
      {
        id: "l22",
        title: "Around the House",
        emoji: "🛋️",
        description: "Learn home vocabulary",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Casa" mean?',
            correct: "House",
            options: ["House", "Home", "Room", "Building"],
          },
          {
            type: "translate",
            prompt: 'What does "Cocina" mean?',
            correct: "Kitchen",
            options: ["Kitchen", "Bathroom", "Bedroom", "Living room"],
          },
          {
            type: "fill_blank",
            prompt: "Mi _____ es muy grande.",
            correct: "dormitorio",
            options: ["dormitorio", "cocina", "baño", "mesa"],
            spanish: "Mi dormitorio es muy grande.",
          },
          {
            type: "translate",
            prompt: 'What does "Baño" mean?',
            correct: "Bathroom",
            options: ["Bathroom", "Kitchen", "Bedroom", "Garden"],
          },
          {
            type: "word_bank",
            prompt: "Build: The chair is next to the table",
            correct: "La silla está junto a la mesa",
            wordBank: ["La", "silla", "está", "junto", "a", "la", "mesa", "cama"],
          },
          {
            type: "translate",
            prompt: 'What does "Ventana" mean?',
            correct: "Window",
            options: ["Window", "Door", "Wall", "Floor"],
          },
        ],
      },
      {
        id: "l23",
        title: "Feelings",
        emoji: "😊",
        description: "Express emotions in Spanish",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Feliz" mean?',
            correct: "Happy",
            options: ["Happy", "Sad", "Angry", "Tired"],
          },
          {
            type: "translate",
            prompt: 'What does "Triste" mean?',
            correct: "Sad",
            options: ["Sad", "Happy", "Scared", "Tired"],
          },
          {
            type: "fill_blank",
            prompt: "Estoy _____ porque perdí mi libro.",
            correct: "triste",
            options: ["triste", "feliz", "enojado", "cansado"],
            spanish: "Estoy triste porque perdí mi libro.",
          },
          {
            type: "translate",
            prompt: 'What does "Enojado" mean?',
            correct: "Angry",
            options: ["Angry", "Happy", "Sad", "Scared"],
          },
          {
            type: "translate",
            prompt: 'What does "Cansado" mean?',
            correct: "Tired",
            options: ["Tired", "Sleepy", "Bored", "Sick"],
          },
          {
            type: "word_bank",
            prompt: "Build: I am very happy today",
            correct: "Estoy muy feliz hoy",
            wordBank: ["Estoy", "muy", "feliz", "hoy", "triste", "ayer"],
          },
        ],
      },
      {
        id: "l24",
        title: "Describing Feelings",
        emoji: "🎭",
        description: "Describe emotions in sentences",
        xpReward: 20,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Emocionado" mean?',
            correct: "Excited",
            options: ["Excited", "Happy", "Surprised", "Nervous"],
          },
          {
            type: "translate",
            prompt: 'What does "Asustado" mean?',
            correct: "Scared",
            options: ["Scared", "Angry", "Sad", "Worried"],
          },
          {
            type: "fill_blank",
            prompt: "El niño está _____ del perro.",
            correct: "asustado",
            options: ["asustado", "feliz", "triste", "cansado"],
            spanish: "El niño está asustado del perro.",
          },
          {
            type: "word_bank",
            prompt: "Build: I am very happy today",
            correct: "Estoy muy feliz hoy",
            wordBank: ["Estoy", "muy", "feliz", "hoy", "triste", "enojado"],
          },
          {
            type: "fill_blank",
            prompt: "Estamos _____ por el viaje.",
            correct: "emocionados",
            options: ["emocionados", "cansados", "tristes", "asustados"],
            spanish: "Estamos emocionados por el viaje.",
          },
          {
            type: "word_bank",
            prompt: "Build: She is sad because it is raining",
            correct: "Ella está triste porque llueve",
            wordBank: ["Ella", "está", "triste", "porque", "llueve", "feliz", "nieva"],
          },
          {
            type: "translate",
            prompt: 'What does "Me siento cansado" mean?',
            correct: "I feel tired",
            options: ["I feel tired", "I am sleeping", "I feel sick", "I am bored"],
          },
        ],
      },
    ],
  },
  {
    id: "unit-9",
    title: "School & Activities",
    emoji: "🏫",
    color: "from-cyan-500 to-teal-500",
    lessons: [
      {
        id: "l25",
        title: "Classroom",
        emoji: "📚",
        description: "Learn school vocabulary",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Escuela" mean?',
            correct: "School",
            options: ["School", "Classroom", "University", "Library"],
          },
          {
            type: "translate",
            prompt: 'What does "Libro" mean?',
            correct: "Book",
            options: ["Book", "Notebook", "Paper", "Pen"],
          },
          {
            type: "fill_blank",
            prompt: "Escribo con un _____.",
            correct: "lápiz",
            options: ["lápiz", "libro", "papel", "pizarra"],
            spanish: "Escribo con un lápiz.",
          },
          {
            type: "translate",
            prompt: 'What does "Computadora" mean?',
            correct: "Computer",
            options: ["Computer", "Tablet", "Phone", "Screen"],
          },
          {
            type: "word_bank",
            prompt: "Build: The teacher writes on the board",
            correct: "El profesor escribe en la pizarra",
            wordBank: ["El", "profesor", "escribe", "en", "la", "pizarra", "libro"],
          },
          {
            type: "translate",
            prompt: 'What does "Papel" mean?',
            correct: "Paper",
            options: ["Paper", "Book", "Card", "Page"],
          },
        ],
      },
      {
        id: "l26",
        title: "Sports",
        emoji: "⚽",
        description: "Sports and hobbies vocabulary",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Fútbol" mean?',
            correct: "Soccer/Football",
            options: ["Soccer/Football", "Basketball", "Tennis", "Baseball"],
          },
          {
            type: "translate",
            prompt: 'What does "Natación" mean?',
            correct: "Swimming",
            options: ["Swimming", "Running", "Diving", "Surfing"],
          },
          {
            type: "fill_blank",
            prompt: "Me gusta _____ por las mañanas.",
            correct: "correr",
            options: ["correr", "nadar", "cantar", "bailar"],
            spanish: "Me gusta correr por las mañanas.",
          },
          {
            type: "translate",
            prompt: 'What does "Bicicleta" mean?',
            correct: "Bicycle",
            options: ["Bicycle", "Motorcycle", "Car", "Scooter"],
          },
          {
            type: "word_bank",
            prompt: "Build: I like to sing and dance",
            correct: "Me gusta cantar y bailar",
            wordBank: ["Me", "gusta", "cantar", "y", "bailar", "correr", "jugar"],
          },
          {
            type: "translate",
            prompt: 'What does "Cantar" mean?',
            correct: "To sing",
            options: ["To sing", "To dance", "To play", "To paint"],
          },
        ],
      },
      {
        id: "l27",
        title: "Daily Activities",
        emoji: "🗓️",
        description: "Combine school and sports vocabulary",
        xpReward: 20,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Jugar" mean?',
            correct: "To play",
            options: ["To play", "To run", "To swim", "To sing"],
          },
          {
            type: "fill_blank",
            prompt: "Los _____ juegan fútbol en la escuela.",
            correct: "estudiantes",
            options: ["estudiantes", "profesores", "abogados", "músicos"],
            spanish: "Los estudiantes juegan fútbol en la escuela.",
          },
          {
            type: "word_bank",
            prompt: "Build: She reads a book every day",
            correct: "Ella lee un libro cada día",
            wordBank: ["Ella", "lee", "un", "libro", "cada", "día", "papel"],
          },
          {
            type: "fill_blank",
            prompt: "Tengo un _____ de matemáticas mañana.",
            correct: "examen",
            options: ["examen", "libro", "lápiz", "papel"],
            spanish: "Tengo un examen de matemáticas mañana.",
          },
          {
            type: "translate",
            prompt: 'What does "Bailar" mean?',
            correct: "To dance",
            options: ["To dance", "To sing", "To run", "To swim"],
          },
          {
            type: "word_bank",
            prompt: "Build: The students study at school",
            correct: "Los estudiantes estudian en la escuela",
            wordBank: ["Los", "estudiantes", "estudian", "en", "la", "escuela", "casa"],
          },
          {
            type: "fill_blank",
            prompt: "Mi amigo quiere _____ a nadar.",
            correct: "aprender",
            options: ["aprender", "correr", "jugar", "cantar"],
            spanish: "Mi amigo quiere aprender a nadar.",
          },
        ],
      },
    ],
  },
  {
    id: "unit-10",
    title: "Getting Around & Review",
    emoji: "🚗",
    color: "from-slate-500 to-gray-500",
    lessons: [
      {
        id: "l28",
        title: "Vehicles",
        emoji: "🚙",
        description: "Learn transportation vocabulary",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Coche" mean?',
            correct: "Car",
            options: ["Car", "Bus", "Train", "Truck"],
          },
          {
            type: "translate",
            prompt: 'What does "Autobús" mean?',
            correct: "Bus",
            options: ["Bus", "Car", "Train", "Taxi"],
          },
          {
            type: "fill_blank",
            prompt: "El _____ va muy rápido.",
            correct: "tren",
            options: ["tren", "avión", "coche", "barco"],
            spanish: "El tren va muy rápido.",
          },
          {
            type: "translate",
            prompt: 'What does "Avión" mean?',
            correct: "Airplane",
            options: ["Airplane", "Helicopter", "Bird", "Rocket"],
          },
          {
            type: "word_bank",
            prompt: "Build: The boat crosses the sea",
            correct: "El barco cruza el mar",
            wordBank: ["El", "barco", "cruza", "el", "mar", "río", "avión"],
          },
          {
            type: "translate",
            prompt: 'What does "Taxi" mean?',
            correct: "Taxi",
            options: ["Taxi", "Bus", "Car", "Uber"],
          },
        ],
      },
      {
        id: "l29",
        title: "Travel Vocabulary",
        emoji: "🧳",
        description: "Essential travel words",
        xpReward: 15,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Moto" mean?',
            correct: "Motorcycle",
            options: ["Motorcycle", "Car", "Bicycle", "Scooter"],
          },
          {
            type: "fill_blank",
            prompt: "Vamos a viajar en _____ mañana.",
            correct: "avión",
            options: ["avión", "coche", "tren", "barco"],
            spanish: "Vamos a viajar en avión mañana.",
          },
          {
            type: "translate",
            prompt: 'What does "Maleta" mean?',
            correct: "Suitcase",
            options: ["Suitcase", "Bag", "Backpack", "Box"],
          },
          {
            type: "word_bank",
            prompt: "Build: I travel by car to the beach",
            correct: "Viajo en coche a la playa",
            wordBank: ["Viajo", "en", "coche", "a", "la", "playa", "tren"],
          },
          {
            type: "fill_blank",
            prompt: "El _____ llega a las ocho.",
            correct: "autobús",
            options: ["autobús", "coche", "tren", "taxi"],
            spanish: "El autobús llega a las ocho.",
          },
          {
            type: "translate",
            prompt: 'What does "Pasaporte" mean?',
            correct: "Passport",
            options: ["Passport", "Ticket", "Luggage", "Visa"],
          },
        ],
      },
      {
        id: "l30",
        title: "Final Review",
        emoji: "🏆",
        description: "Review vocabulary from all units",
        xpReward: 30,
        exercises: [
          {
            type: "translate",
            prompt: 'What does "Buenos días" mean?',
            correct: "Good morning",
            options: ["Good morning", "Good night", "Goodbye", "Hello"],
          },
          {
            type: "fill_blank",
            prompt: "Quiero una _____ con leche.",
            correct: "manzana",
            options: ["manzana", "naranja", "pera", "uva"],
            spanish: "Quiero una manzana con leche.",
          },
          {
            type: "word_bank",
            prompt: "Build: My father works in an office",
            correct: "Mi padre trabaja en una oficina",
            wordBank: ["Mi", "padre", "trabaja", "en", "una", "oficina", "casa"],
          },
          {
            type: "translate",
            prompt: 'What does "Abuela" mean?',
            correct: "Grandmother",
            options: ["Grandmother", "Mother", "Aunt", "Sister"],
          },
          {
            type: "fill_blank",
            prompt: "El cielo es _____ hoy.",
            correct: "azul",
            options: ["azul", "rojo", "verde", "gris"],
            spanish: "El cielo es azul hoy.",
          },
          {
            type: "word_bank",
            prompt: "Build: I am very happy to learn Spanish",
            correct: "Estoy muy feliz de aprender español",
            wordBank: ["Estoy", "muy", "feliz", "de", "aprender", "español", "inglés"],
          },
          {
            type: "translate",
            prompt: 'What does "Enfermera" mean?',
            correct: "Nurse",
            options: ["Nurse", "Doctor", "Teacher", "Lawyer"],
          },
          {
            type: "fill_blank",
            prompt: "El _____ es muy divertido.",
            correct: "fútbol",
            options: ["fútbol", "libro", "coche", "lápiz"],
            spanish: "El fútbol es muy divertido.",
          },
          {
            type: "word_bank",
            prompt: "Build: The cat sleeps in the bedroom",
            correct: "El gato duerme en el dormitorio",
            wordBank: ["El", "gato", "duerme", "en", "el", "dormitorio", "cocina"],
          },
          {
            type: "translate",
            prompt: 'What does "Me llamo María" mean?',
            correct: "My name is María",
            options: ["My name is María", "I am María", "I call María", "She is María"],
          },
        ],
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  for (const unit of units) {
    const lesson = unit.lessons.find((l) => l.id === id);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getAllLessons(): Lesson[] {
  return units.flatMap((u) => u.lessons);
}

export function getUnitForLesson(lessonId: string): Unit | undefined {
  return units.find((u) => u.lessons.some((l) => l.id === lessonId));
}

export function getNextLesson(currentId: string): Lesson | undefined {
  const all = getAllLessons();
  const idx = all.findIndex((l) => l.id === currentId);
  return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
}

export function getPreviousLesson(currentId: string): Lesson | undefined {
  const all = getAllLessons();
  const idx = all.findIndex((l) => l.id === currentId);
  return idx > 0 ? all[idx - 1] : undefined;
}
