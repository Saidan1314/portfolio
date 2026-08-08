import { fileURLToPath, URL } from 'node:url';

/** Content globs anchored to this file, not to the process working directory. */
const fromRoot = (glob) => fileURLToPath(new URL(glob, import.meta.url));

/** @type {import('tailwindcss').Config} */
export default {
  content: [fromRoot('./index.html'), fromRoot('./src/**/*.{ts,tsx}')],
  theme: {
    extend: {
      colors: {
        /** Page black — slightly lifted off pure #000 so the panels read. */
        ink: '#0C0C0C',
        /** Cool off-white used for body copy and outlines on dark panels. */
        mist: '#D7E2EA',
      },
      fontFamily: {
        /** Body / UI typeface. Generates the `.font-inter` utility class. */
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
        /** Typeface of the portfolio sections below the hero. */
        kanit: ['Kanit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        /** Shared cinematic easing for menu + reveal motion. */
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
