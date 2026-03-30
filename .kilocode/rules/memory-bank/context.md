# Active Context: ¡Aprende! Spanish Learning App

## Current State

**Status**: Full-featured Spanish learning app with 31 pages, 14 game modes, structured lessons, spaced repetition, leaderboard, dialogues, comprehensions, and full gamification.

## Recently Completed

- [x] 19 vocabulary categories (152 words)
- [x] 14 game modes (Flashcards, Quiz, Matching, Listening, Speaking, Typing, Hangman, Speed Round, Sentence Builder, Grammar Practice, Dialogues, Listening Comprehension, Reading Comprehension, Practice Mistakes)
- [x] Verb conjugation trainer (15 verbs, 4 tenses: present/preterite/imperfect/future, tense selector tabs)
- [x] XP & leveling, daily goals, 27 achievements, streak tracking
- [x] Spaced repetition with /review page
- [x] Audio pronunciation + sound effects
- [x] Grammar Practice (5 interactive drill sets: Articles, Ser/Estar, Por/Para, Adjective Agreement, Question Words)
- [x] Dialogue Simulations (3 interactive conversations: Restaurant, Hotel, Shopping)
- [x] Listening Comprehension (3 audio passages with questions)
- [x] Reading Comprehension (3 text passages with questions)
- [x] Practice Mistakes (/practice-mistakes) - review previously wrong answers
- [x] Toast notifications (achievements, level-ups, streaks)
- [x] Streak freeze, streak repair, double XP, hearts refill (shop consumables)
- [x] Perfect lesson bonus, crown levels (1-5), XP combos
- [x] Settings: sound toggle, theme, text size, speech rate, daily goal, export/import
- [x] Per-word accuracy tracking, wrong answer tracking
- [x] Leaderboard with leagues, Daily Challenge, Onboarding placement test
- [x] Stats page, Profile page, Streak Calendar
- [x] Achievement toasts on unlock
- [x] CSS: slide-in-right, shake, correct-bounce, confetti, combo-pulse, reduced-motion

## Routes (31 pages)

| Route | Feature |
|-------|---------|
| `/` | Dashboard |
| `/lessons` | Lesson Path |
| `/lessons/[lessonId]` | Lesson Play |
| `/learn/[category]` | Flashcards + Quiz |
| `/quiz` | Multiple Choice Quiz |
| `/matching` | Memory Matching |
| `/listening` | Listening Mode |
| `/speaking` | Speech Recognition |
| `/typing` | Typing Mode |
| `/hangman` | Hangman |
| `/speed` | Speed Round |
| `/sentences` | Sentence Builder |
| `/verbs` | Verb Trainer (4 tenses) |
| `/achievements` | Achievements |
| `/rewards` | Rewards Shop |
| `/idioms` | Spanish Idioms |
| `/twisters` | Tongue Twisters |
| `/grammar` | Grammar Tips |
| `/grammar-practice` | Grammar Drills (5 sets) |
| `/dialogues` | Dialogue Simulations (3 scenarios) |
| `/listening-comp` | Listening Comprehension (3 passages) |
| `/reading-comp` | Reading Comprehension (3 passages) |
| `/practice-mistakes` | Practice Mistakes |
| `/review` | Spaced Repetition Review |
| `/settings` | Settings |
| `/stats` | Detailed Statistics |
| `/profile` | User Profile |
| `/leaderboard` | Weekly Leagues |
| `/daily-challenge` | Daily Challenge |
| `/onboarding` | Placement Test |

## Session History

| Date | Changes |
|------|---------|
| Mar 30, 2026 | Built ¡Aprende! with categories, flashcards, quizzes, progress |
| Mar 30, 2026 | Added game modes, XP/leveling, achievements, audio, themes |
| Mar 30, 2026 | Added speech recognition, hangman, speed round, calendar, idioms, twisters, rewards, grammar |
| Mar 30, 2026 | Added Duolingo-style lessons (6→10 units, 18→30 lessons) |
| Mar 30, 2026 | 7 new pages, toasts, streak freeze, crowns, combos, perfect bonus, 6 new vocab categories, 5 new verbs with 4 tenses |
| Mar 30, 2026 | Grammar practice, dialogue simulations, listening/reading comprehension, practice mistakes, tense selector, shop consumables (double XP, streak repair, hearts refill), text size, speech rate, per-word accuracy, achievement toasts |
