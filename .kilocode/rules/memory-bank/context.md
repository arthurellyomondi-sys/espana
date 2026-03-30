# Active Context: ¡Aprende! Spanish Learning App

## Current State

**Status**: Feature-rich Spanish learning app with 27 pages, 9 game modes, structured lessons, spaced repetition, leaderboard, and full gamification.

## Recently Completed

- [x] 19 vocabulary categories (152 words): added Professions, Home & Furniture, Emotions, School & Office, Sports & Hobbies, Transportation
- [x] 9 game modes (Flashcards, Quiz, Matching, Listening, Speaking, Typing, Hangman, Speed Round, Sentence Builder)
- [x] Verb conjugation trainer (15 verbs: 10 original + saber, conocer, decir, venir, dar) with 4 tenses: present, preterite, imperfect, future
- [x] XP & leveling system, daily goals, 27 achievements, streak tracking
- [x] Spaced repetition system (word strength 0-5, review scheduling) with /review page
- [x] Audio pronunciation (Web Speech API) + sound effects (Web Audio API)
- [x] Conversation phrases (5 scenarios)
- [x] Cultural notes (6 countries)
- [x] Word/Idiom/Tongue Twister of the Day
- [x] Tongue Twisters section (10 twisters)
- [x] Spanish Idioms section (14 idioms)
- [x] Grammar Tips (8 lessons)
- [x] Streak Calendar (28-day heatmap)
- [x] Rewards Shop (13 items: themes, avatars, badges, streak freeze)
- [x] Speech Recognition pronunciation practice
- [x] Light/dark theme toggle
- [x] Duolingo-style structured lessons (10 units, 30 lessons)
- [x] Toast notification system (achievement unlocks, level-ups, streak milestones)
- [x] Settings page (sound toggle, theme, daily goal, export/import)
- [x] Spaced repetition Review page (/review)
- [x] Stats page with XP history charts, game mode stats, category mastery (/stats)
- [x] Profile page with avatar, badges, achievements showcase (/profile)
- [x] Leaderboard with league system (/leaderboard)
- [x] Daily Challenge with bonus XP (/daily-challenge)
- [x] Onboarding placement test (/onboarding)
- [x] Streak freeze mechanic (auto-used when missing a day, purchasable in shop)
- [x] Perfect lesson bonus (+10 XP for 5 hearts remaining)
- [x] Crown levels per lesson (1-5 mastery levels)
- [x] XP combo tracking for consecutive correct answers
- [x] Export/Import progress (JSON)
- [x] CSS: slide-in-right, shake, correct-bounce, confetti, combo-pulse, reduced-motion support
- [x] Achievements page updated with 27 total achievements
- [x] Grammar Practice page (/grammar-practice) with 5 practice sets (Articles, Ser vs Estar, Por vs Para, Adjective Agreement, Question Words), multiple choice and fill-in-the-blank, progress bar, feedback, +15 XP

## Routes (27 pages)

| Route | Feature |
|-------|---------|
| `/` | Dashboard |
| `/lessons` | Lesson Path (Duolingo-style) |
| `/lessons/[lessonId]` | Lesson Play (exercise flow) |
| `/learn/[category]` | Flashcards + Quiz |
| `/quiz` | Multiple Choice Quiz |
| `/matching` | Memory Matching |
| `/listening` | Listening Mode |
| `/speaking` | Speech Recognition |
| `/typing` | Typing Mode |
| `/hangman` | Hangman |
| `/speed` | Speed Round (60s) |
| `/sentences` | Sentence Builder |
| `/verbs` | Verb Trainer (4 tenses) |
| `/achievements` | Achievements |
| `/rewards` | Rewards Shop |
| `/idioms` | Spanish Idioms |
| `/twisters` | Tongue Twisters |
| `/grammar` | Grammar Tips |
| `/review` | Spaced Repetition Review |
| `/settings` | Settings (sound, theme, goal, data) |
| `/stats` | Detailed Statistics |
| `/profile` | User Profile |
| `/leaderboard` | Weekly Leagues |
| `/daily-challenge` | Daily Challenge (+50 XP) |
| `/onboarding` | Placement Test |
| `/grammar-practice` | Grammar Practice (5 sets, MC + fill-in-blank) |

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| Mar 30, 2026 | Built ¡Aprende! with 6 categories, flashcards, quizzes, progress tracking |
| Mar 30, 2026 | Added 6 categories, 5 game modes, XP/leveling, achievements, audio, themes |
| Mar 30, 2026 | Added speech recognition, hangman, speed round, calendar, idioms, twisters, rewards, grammar |
| Mar 30, 2026 | Added Duolingo-style structured lessons (6 units, 18 lessons) |
| Mar 30, 2026 | Massive feature expansion: 7 new pages, toast system, streak freeze, crowns, combos, perfect bonus, 6 new vocab categories, 5 new verbs with 4 tenses, expanded to 10 units/30 lessons, 27 achievements, leaderboard, daily challenge, onboarding, CSS animations |
| Mar 30, 2026 | Added Grammar Practice page (/grammar-practice) with 5 interactive practice sets |
