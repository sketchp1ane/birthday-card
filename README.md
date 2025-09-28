# Birthday Journey Webcard

A single-page celebration card built with React, Vite, and Tailwind. Visitors unlock the experience through a playful gate, then browse heartfelt sections with floating guidance and gentle ambient effects.

## Features

- **Locked Gate Intro** – Type the secret to reveal the main page with confetti bursts.
- **Hero Celebration Card** – Shows the headline, subline, and toggles a detailed letter panel.
- **Letter Section** – Smoothly expanding container for long-form greetings styled with glassmorphism.
- **Countdown Dashboard** – Flip-card timer, progress meter, and focus chips counting down to exam day.
- **Daily Whisper Carousel** – Rotating affirmations in a stylised quote layout.
- **Floating Companion & JourneyRail** – Right-bottom assistant and fixed left-side navigation that track the viewport.
- **Aurora & Sparkle Layers** – Animated backdrop components that add a soft, dreamy atmosphere.

## Getting Started

> Use Node.js **20.19.0 or newer** (required by Vite 7).

```bash
# install dependencies
npm install

# start dev server (http://localhost:5173)
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

## Content & Theme Configuration

Update `src/config/profile.js` to change:

- `celebrant` – headline, subline, and letter content for the celebration.
- `milestones` – birthday date, exam date, and gate secret.
- `theme` – palette colors and gradient tokens used across components.
- `affirmations` / `floatingNotes` – arrays powering the whisper carousel and floating assistant.

Replace the top-left avatar by adding a new image at `public/avatar.png`.

## Project Structure

```
src/
├─ components/       Page modules such as Gate, HeroCard, JourneyRail, FloatingNotes
├─ config/           Celebration content and visual theme
├─ hooks/            Countdown logic and reduced-motion detection
├─ utils/            Helpers like confetti effects
└─ index.css         Tailwind base directives and custom animations
```

## Housekeeping

- Removed template leftovers (`src/App.css`, `src/assets/react.svg`) and the `dist/` build output to keep the repo focused on the card implementation.
- `.gitignore` already excludes build artifacts and editor clutter.

## Customisation Tips

- Edit the config file to create new occasions without touching component logic.
- JourneyRail highlights sections whose containers share the IDs `hero`, `letter`, `countdown`, and `whisper`—wrap new sections accordingly if you extend the layout.
- Tailwind v4 utilities are available directly in JSX; leverage them to experiment with motion or color tweaks.

Enjoy tailoring the card for the next celebration! 🥳
