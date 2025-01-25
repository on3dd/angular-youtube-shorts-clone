import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      aspectRatio: {
        shorts: '9 / 16',
      },
      backgroundImage: {
        'clip-overlay': 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 70%, rgba(255,255,255,0) 100%)',
      },
    },
  },
  plugins: [],
};
