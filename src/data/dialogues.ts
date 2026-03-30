export interface DialogueLine {
  speaker: "user" | "npc";
  text: string;
  english: string;
}

export interface DialogueChoice {
  text: string;
  english: string;
  correct: boolean;
}

export interface DialogueStep {
  line?: DialogueLine;
  choices?: DialogueChoice[];
  correctResponse?: DialogueLine;
  wrongResponse?: DialogueLine;
}

export interface Dialogue {
  id: string;
  title: string;
  emoji: string;
  scenario: string;
  steps: DialogueStep[];
  xpReward: number;
}

export const dialogues: Dialogue[] = [
  {
    id: "restaurant",
    title: "At a Restaurant",
    emoji: "🍴",
    scenario: "You walk into a restaurant in Mexico City.",
    xpReward: 25,
    steps: [
      { line: { speaker: "npc", text: "¡Buenas tardes! ¿Mesa para cuántos?", english: "Good afternoon! Table for how many?" } },
      {
        choices: [
          { text: "Una mesa para dos, por favor.", english: "A table for two, please.", correct: true },
          { text: "Quiero un taxi.", english: "I want a taxi.", correct: false },
          { text: "No hablo español.", english: "I don't speak Spanish.", correct: false },
        ],
        correctResponse: { speaker: "npc", text: "¡Perfecto! Síganme, por favor.", english: "Perfect! Follow me, please." },
        wrongResponse: { speaker: "npc", text: "¿Disculpe? ¿Una mesa?", english: "Sorry? A table?" },
      },
      { line: { speaker: "npc", text: "Aquí tienen el menú. ¿Les traigo algo de beber?", english: "Here's the menu. Can I bring you something to drink?" } },
      {
        choices: [
          { text: "Dos aguas, por favor.", english: "Two waters, please.", correct: true },
          { text: "La cuenta, por favor.", english: "The check, please.", correct: false },
          { text: "No, gracias.", english: "No, thank you.", correct: true },
        ],
        correctResponse: { speaker: "npc", text: "Enseguida. ¿Ya saben qué van a ordenar?", english: "Right away. Do you know what you'll order?" },
        wrongResponse: { speaker: "npc", text: "¿La cuenta? ¡Todavía no han pedido!", english: "The check? You haven't ordered yet!" },
      },
      {
        choices: [
          { text: "¿Qué me recomienda?", english: "What do you recommend?", correct: true },
          { text: "Quiero la cuenta.", english: "I want the check.", correct: false },
          { text: "No tengo hambre.", english: "I'm not hungry.", correct: false },
        ],
        correctResponse: { speaker: "npc", text: "¡El mole poblano está delicioso! Es la especialidad de la casa.", english: "The mole poblano is delicious! It's the house specialty." },
        wrongResponse: { speaker: "npc", text: "¡Pero si todavía no han comido!", english: "But you haven't eaten yet!" },
      },
      { line: { speaker: "user", text: "¡Está delicioso! La cuenta, por favor.", english: "It's delicious! The check, please." } },
      { line: { speaker: "npc", text: "Son trescientos pesos. ¿Efectivo o tarjeta?", english: "That's 300 pesos. Cash or card?" } },
      {
        choices: [
          { text: "Con tarjeta, por favor.", english: "With card, please.", correct: true },
          { text: "Efectivo.", english: "Cash.", correct: true },
        ],
        correctResponse: { speaker: "npc", text: "¡Muchas gracias! ¡Que tengan un buen día!", english: "Thank you very much! Have a great day!" },
      },
    ],
  },
  {
    id: "hotel",
    title: "At a Hotel",
    emoji: "🏨",
    scenario: "You arrive at a hotel in Barcelona.",
    xpReward: 25,
    steps: [
      { line: { speaker: "npc", text: "¡Bienvenidos! ¿En qué puedo ayudarles?", english: "Welcome! How can I help you?" } },
      {
        choices: [
          { text: "Tengo una reservación a nombre de García.", english: "I have a reservation under the name García.", correct: true },
          { text: "¿Dónde está el restaurante?", english: "Where is the restaurant?", correct: false },
          { text: "Quiero comprar una habitación.", english: "I want to buy a room.", correct: false },
        ],
        correctResponse: { speaker: "npc", text: "Un momento... ¡Sí! Aquí está. Una habitación doble para tres noches.", english: "One moment... Yes! Here it is. A double room for three nights." },
        wrongResponse: { speaker: "npc", text: "Primero necesito verificar su reservación.", english: "I need to verify your reservation first." },
      },
      { line: { speaker: "npc", text: "¿Puedo ver su pasaporte, por favor?", english: "Can I see your passport, please?" } },
      {
        choices: [
          { text: "Aquí tiene.", english: "Here you go.", correct: true },
          { text: "No lo tengo.", english: "I don't have it.", correct: false },
        ],
        correctResponse: { speaker: "npc", text: "Perfecto. Su habitación es la 305. El ascensor está a la derecha.", english: "Perfect. Your room is 305. The elevator is on the right." },
        wrongResponse: { speaker: "npc", text: "Necesito su pasaporte para el check-in.", english: "I need your passport for check-in." },
      },
      { line: { speaker: "npc", text: "El desayuno se sirve de 7 a 10 en el restaurante del primer piso.", english: "Breakfast is served from 7 to 10 in the first-floor restaurant." } },
      {
        choices: [
          { text: "¿A qué hora es el check-out?", english: "What time is check-out?", correct: true },
          { text: "¿Cuánto cuesta el hotel?", english: "How much does the hotel cost?", correct: false },
        ],
        correctResponse: { speaker: "npc", text: "El check-out es a las doce del mediodía. ¡Que disfruten su estancia!", english: "Check-out is at noon. Enjoy your stay!" },
      },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    emoji: "🛍️",
    scenario: "You're at a market in Madrid.",
    xpReward: 25,
    steps: [
      { line: { speaker: "npc", text: "¡Hola! ¿Busca algo en especial?", english: "Hi! Are you looking for anything special?" } },
      {
        choices: [
          { text: "Solo estoy mirando, gracias.", english: "Just looking, thanks.", correct: true },
          { text: "Sí, busco una camisa.", english: "Yes, I'm looking for a shirt.", correct: true },
          { text: "No, gracias.", english: "No, thanks.", correct: true },
        ],
        correctResponse: { speaker: "npc", text: "¡Por favor! Si necesita algo, estoy aquí.", english: "Of course! If you need anything, I'm here." },
      },
      {
        choices: [
          { text: "¿Cuánto cuesta esta camisa?", english: "How much is this shirt?", correct: true },
          { text: "¿Tiene esto en otra talla?", english: "Do you have this in another size?", correct: true },
        ],
        correctResponse: { speaker: "npc", text: "Esa camisa cuesta cuarenta y cinco euros. Tenemos en talla S, M y L.", english: "That shirt is forty-five euros. We have S, M, and L." },
      },
      {
        choices: [
          { text: "Me la llevo.", english: "I'll take it.", correct: true },
          { text: "¿Aceptan tarjeta de crédito?", english: "Do you accept credit cards?", correct: true },
          { text: "Es muy caro. ¿Tiene algo más barato?", english: "It's too expensive. Do you have something cheaper?", correct: true },
        ],
        correctResponse: { speaker: "npc", text: "¡Excelente elección! Son cuarenta y cinco euros.", english: "Excellent choice! That's forty-five euros." },
      },
    ],
  },
];

export function getDialogueById(id: string): Dialogue | undefined {
  return dialogues.find((d) => d.id === id);
}
