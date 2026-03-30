# Active Context: ¡Aprende! Spanish Learning App

## Current State

**Status**: Fully featured Spanish learning app with all requested features built and deployed.

## Recently Completed

- [x] 12 vocabulary categories (Greetings, Food, Numbers, Colors, Animals, Travel, Body, Weather, Family, Clothing, Directions, Emergency)
- [x] 6 game modes (Flashcards, Quiz, Matching, Listening, Typing, Sentence Builder)
- [x] Verb conjugation trainer with 10 common verbs
- [x] XP & leveling system with progress tracking
- [x] Daily goals with XP targets
- [x] 19 achievements/badges system
- [x] Spaced repetition for word review scheduling
- [x] Audio pronunciation via Web Speech API
- [x] Sound effects for correct/wrong answers
- [x] Conversation phrases (5 scenarios)
- [x] Cultural notes about Spanish-speaking countries
- [x] Word of the Day feature
- [x] Light/dark theme toggle
- [x] Progress persistence via localStorage

## Current Structure

| File/Directory | Purpose |
|----------------|---------|
| `src/app/page.tsx` | Home dashboard with all features |
| `src/app/learn/[category]/page.tsx` | Flashcards & quiz per category |
| `src/app/quiz/page.tsx` | Quick quiz selection |
| `src/app/matching/page.tsx` | Matching memory game |
| `src/app/listening/page.tsx` | Listening mode |
| `src/app/typing/page.tsx` | Typing mode |
| `src/app/sentences/page.tsx` | Sentence builder |
| `src/app/verbs/page.tsx` | Verb conjugation trainer |
| `src/app/achievements/page.tsx` | Achievements & stats |
| `src/data/vocabulary.ts` | 12 categories, 96 words, conversations, cultural notes |
| `src/data/verbs.ts` | 10 verbs, sentence exercises |
| `src/data/achievements.ts` | 19 achievement definitions |
| `src/context/ProgressContext.tsx` | Full progress/XP/streak management |
| `src/context/ThemeContext.tsx` | Light/dark theme |
| `src/components/Flashcard.tsx` | Flip card component |
| `src/components/Quiz.tsx` | Multiple choice quiz |
| `src/components/MatchingGame.tsx` | Memory matching game |
| `src/components/ListeningGame.tsx` | Audio-based quiz |
| `src/components/TypingGame.tsx` | Typing translation |
| `src/components/SentenceBuilder.tsx` | Word arrangement |
| `src/components/VerbPractice.tsx` | Conjugation quiz |
| `src/lib/audio.ts` | Web Speech API + sound effects |

## Routes

| Route | Feature |
|-------|---------|
| `/` | Home dashboard |
| `/learn/[category]` | Flashcards + Quiz |
| `/quiz` | Quick Quiz |
| `/matching` | Matching Game |
| `/listening` | Listening Mode |
| `/typing` | Typing Mode |
| `/sentences` | Sentence Builder |
| `/verbs` | Verb Trainer |
| `/achievements` | Achievements & Stats |

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| Mar 30, 2026 | Built ¡Aprende! with 6 categories, flashcards, quizzes, progress tracking |
| Mar 30, 2026 | Added all remaining features: 6 new categories, 5 game modes, XP/leveling, achievements, audio, themes |
