import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';

import './tailwind.css';
import '../src/global.css'; //todo: create file and add tailwind imports @base...

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Atoms', 'Molecules', 'Organisms'],
        method: 'numeric',
      },
    },
  },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

export default preview;
