const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'ems-blue': '#184689',
        'ems-blue-light': '#123156',
        'ems-red': '#c0392b',
        'ems-yellow': '#F1C410',
        'ems-yellow-light': '#F4B743',
      },
    },
  },
  plugins: [],
};
