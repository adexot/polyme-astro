import type { Preview } from '@storybook/react';
import '../src/styles/global.css';
import '../src/styles/terminal.css';
import '../src/styles/fonts.css';
import '../src/styles/main.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1e2022',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
};

export default preview;

