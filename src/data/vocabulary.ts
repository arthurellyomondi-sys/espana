export interface Word {
  spanish: string;
  english: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
  words: Word[];
}

export const categories: Category[] = [
  {
    id: "greetings",
    name: "Greetings",
    emoji: "👋",
    color: "from-amber-500 to-orange-500",
    words: [
      {
        spanish: "Hola",
        english: "Hello",
        pronunciation: "OH-lah",
        example: "¡Hola, amigo!",
        exampleTranslation: "Hello, friend!",
      },
      {
        spanish: "Buenos días",
        english: "Good morning",
        pronunciation: "BWEH-nohs DEE-ahs",
        example: "Buenos días, ¿cómo estás?",
        exampleTranslation: "Good morning, how are you?",
      },
      {
        spanish: "Buenas tardes",
        english: "Good afternoon",
        pronunciation: "BWEH-nahs TAR-dehs",
        example: "Buenas tardes, señora.",
        exampleTranslation: "Good afternoon, ma'am.",
      },
      {
        spanish: "Buenas noches",
        english: "Good night",
        pronunciation: "BWEH-nahs NOH-chehs",
        example: "Buenas noches, dulces sueños.",
        exampleTranslation: "Good night, sweet dreams.",
      },
      {
        spanish: "Adiós",
        english: "Goodbye",
        pronunciation: "ah-DYOHS",
        example: "Adiós, nos vemos mañana.",
        exampleTranslation: "Goodbye, see you tomorrow.",
      },
      {
        spanish: "Por favor",
        english: "Please",
        pronunciation: "pohr fah-BOHR",
        example: "Un café, por favor.",
        exampleTranslation: "A coffee, please.",
      },
      {
        spanish: "Gracias",
        english: "Thank you",
        pronunciation: "GRAH-syahs",
        example: "Muchas gracias por tu ayuda.",
        exampleTranslation: "Thank you very much for your help.",
      },
      {
        spanish: "De nada",
        english: "You're welcome",
        pronunciation: "deh NAH-dah",
        example: "De nada, fue un placer.",
        exampleTranslation: "You're welcome, it was a pleasure.",
      },
    ],
  },
  {
    id: "food",
    name: "Food & Drinks",
    emoji: "🍽️",
    color: "from-red-500 to-pink-500",
    words: [
      {
        spanish: "Agua",
        english: "Water",
        pronunciation: "AH-gwah",
        example: "Un vaso de agua, por favor.",
        exampleTranslation: "A glass of water, please.",
      },
      {
        spanish: "Pan",
        english: "Bread",
        pronunciation: "PAHN",
        example: "El pan está muy fresco.",
        exampleTranslation: "The bread is very fresh.",
      },
      {
        spanish: "Manzana",
        english: "Apple",
        pronunciation: "mahn-SAH-nah",
        example: "Quiero una manzana roja.",
        exampleTranslation: "I want a red apple.",
      },
      {
        spanish: "Leche",
        english: "Milk",
        pronunciation: "LEH-cheh",
        example: "La leche está fría.",
        exampleTranslation: "The milk is cold.",
      },
      {
        spanish: "Café",
        english: "Coffee",
        pronunciation: "kah-FEH",
        example: "Me gusta el café con leche.",
        exampleTranslation: "I like coffee with milk.",
      },
      {
        spanish: "Arroz",
        english: "Rice",
        pronunciation: "ah-ROHS",
        example: "El arroz con pollo es delicioso.",
        exampleTranslation: "Rice with chicken is delicious.",
      },
      {
        spanish: "Pollo",
        english: "Chicken",
        pronunciation: "POH-yoh",
        example: "Vamos a comer pollo asado.",
        exampleTranslation: "Let's eat roasted chicken.",
      },
      {
        spanish: "Fruta",
        english: "Fruit",
        pronunciation: "FROO-tah",
        example: "Me encanta la fruta fresca.",
        exampleTranslation: "I love fresh fruit.",
      },
    ],
  },
  {
    id: "numbers",
    name: "Numbers",
    emoji: "🔢",
    color: "from-blue-500 to-cyan-500",
    words: [
      {
        spanish: "Uno",
        english: "One",
        pronunciation: "OO-noh",
        example: "Tengo uno.",
        exampleTranslation: "I have one.",
      },
      {
        spanish: "Dos",
        english: "Two",
        pronunciation: "DOHS",
        example: "Dos cafés, por favor.",
        exampleTranslation: "Two coffees, please.",
      },
      {
        spanish: "Tres",
        english: "Three",
        pronunciation: "TREHS",
        example: "Son las tres de la tarde.",
        exampleTranslation: "It's three in the afternoon.",
      },
      {
        spanish: "Cinco",
        english: "Five",
        pronunciation: "SEEN-koh",
        example: "Tengo cinco hermanos.",
        exampleTranslation: "I have five siblings.",
      },
      {
        spanish: "Diez",
        english: "Ten",
        pronunciation: "DYEHS",
        example: "Cuesta diez dólares.",
        exampleTranslation: "It costs ten dollars.",
      },
      {
        spanish: "Veinte",
        english: "Twenty",
        pronunciation: "BEYN-teh",
        example: "Tengo veinte años.",
        exampleTranslation: "I am twenty years old.",
      },
      {
        spanish: "Cien",
        english: "One hundred",
        pronunciation: "SYEHN",
        example: "Hay cien personas aquí.",
        exampleTranslation: "There are one hundred people here.",
      },
      {
        spanish: "Mil",
        english: "One thousand",
        pronunciation: "MEEL",
        example: "Cuesta mil pesos.",
        exampleTranslation: "It costs one thousand pesos.",
      },
    ],
  },
  {
    id: "colors",
    name: "Colors",
    emoji: "🎨",
    color: "from-purple-500 to-violet-500",
    words: [
      {
        spanish: "Rojo",
        english: "Red",
        pronunciation: "ROH-hoh",
        example: "Me gusta el color rojo.",
        exampleTranslation: "I like the color red.",
      },
      {
        spanish: "Azul",
        english: "Blue",
        pronunciation: "ah-SOOL",
        example: "El cielo es azul.",
        exampleTranslation: "The sky is blue.",
      },
      {
        spanish: "Verde",
        english: "Green",
        pronunciation: "BEHR-deh",
        example: "Los árboles son verdes.",
        exampleTranslation: "The trees are green.",
      },
      {
        spanish: "Amarillo",
        english: "Yellow",
        pronunciation: "ah-mah-REE-yoh",
        example: "El sol es amarillo.",
        exampleTranslation: "The sun is yellow.",
      },
      {
        spanish: "Negro",
        english: "Black",
        pronunciation: "NEH-groh",
        example: "Tengo un gato negro.",
        exampleTranslation: "I have a black cat.",
      },
      {
        spanish: "Blanco",
        english: "White",
        pronunciation: "BLAHN-koh",
        example: "La nieve es blanca.",
        exampleTranslation: "Snow is white.",
      },
      {
        spanish: "Naranja",
        english: "Orange",
        pronunciation: "nah-RAHN-hah",
        example: "Me gusta el jugo de naranja.",
        exampleTranslation: "I like orange juice.",
      },
      {
        spanish: "Morado",
        english: "Purple",
        pronunciation: "moh-RAH-doh",
        example: "Las uvas son moradas.",
        exampleTranslation: "Grapes are purple.",
      },
    ],
  },
  {
    id: "animals",
    name: "Animals",
    emoji: "🐾",
    color: "from-green-500 to-emerald-500",
    words: [
      {
        spanish: "Perro",
        english: "Dog",
        pronunciation: "PEH-rroh",
        example: "Mi perro es muy grande.",
        exampleTranslation: "My dog is very big.",
      },
      {
        spanish: "Gato",
        english: "Cat",
        pronunciation: "GAH-toh",
        example: "El gato duerme mucho.",
        exampleTranslation: "The cat sleeps a lot.",
      },
      {
        spanish: "Pájaro",
        english: "Bird",
        pronunciation: "PAH-hah-roh",
        example: "El pájaro canta por la mañana.",
        exampleTranslation: "The bird sings in the morning.",
      },
      {
        spanish: "Pez",
        english: "Fish",
        pronunciation: "PEHS",
        example: "El pez nada en el agua.",
        exampleTranslation: "The fish swims in the water.",
      },
      {
        spanish: "Caballo",
        english: "Horse",
        pronunciation: "kah-BAH-yoh",
        example: "Me gusta montar a caballo.",
        exampleTranslation: "I like to ride horses.",
      },
      {
        spanish: "Vaca",
        english: "Cow",
        pronunciation: "BAH-kah",
        example: "La vaca come hierba.",
        exampleTranslation: "The cow eats grass.",
      },
      {
        spanish: "Conejo",
        english: "Rabbit",
        pronunciation: "koh-NEH-hoh",
        example: "El conejo es muy lindo.",
        exampleTranslation: "The rabbit is very cute.",
      },
      {
        spanish: "Mariposa",
        english: "Butterfly",
        pronunciation: "mah-ree-POH-sah",
        example: "La mariposa es hermosa.",
        exampleTranslation: "The butterfly is beautiful.",
      },
    ],
  },
  {
    id: "travel",
    name: "Travel",
    emoji: "✈️",
    color: "from-sky-500 to-blue-500",
    words: [
      {
        spanish: "Aeropuerto",
        english: "Airport",
        pronunciation: "ah-eh-roh-PWEHR-toh",
        example: "Vamos al aeropuerto.",
        exampleTranslation: "Let's go to the airport.",
      },
      {
        spanish: "Hotel",
        english: "Hotel",
        pronunciation: "oh-TEHL",
        example: "El hotel tiene piscina.",
        exampleTranslation: "The hotel has a pool.",
      },
      {
        spanish: "Playa",
        english: "Beach",
        pronunciation: "PLAH-yah",
        example: "La playa es hermosa.",
        exampleTranslation: "The beach is beautiful.",
      },
      {
        spanish: "Museo",
        english: "Museum",
        pronunciation: "moo-SEH-oh",
        example: "Visitamos el museo de arte.",
        exampleTranslation: "We visited the art museum.",
      },
      {
        spanish: "Restaurante",
        english: "Restaurant",
        pronunciation: "rehs-tow-RAHN-teh",
        example: "El restaurante es muy bueno.",
        exampleTranslation: "The restaurant is very good.",
      },
      {
        spanish: "Calle",
        english: "Street",
        pronunciation: "KAH-yeh",
        example: "La calle está muy transitada.",
        exampleTranslation: "The street is very busy.",
      },
      {
        spanish: "Iglesia",
        english: "Church",
        pronunciation: "ee-GLEH-syah",
        example: "La iglesia es muy antigua.",
        exampleTranslation: "The church is very old.",
      },
      {
        spanish: "Parque",
        english: "Park",
        pronunciation: "PAHR-keh",
        example: "Los niños juegan en el parque.",
        exampleTranslation: "The children play in the park.",
      },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getAllWords(): Word[] {
  return categories.flatMap((c) => c.words);
}
