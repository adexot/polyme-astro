# Storybook Setup

This project uses Storybook for visual testing and development of React components.

## Getting Started

### Running Storybook

```bash
pnpm storybook
```

This will start the Storybook development server on `http://localhost:6006`

### Building Storybook

```bash
pnpm build-storybook
```

This creates a static build of Storybook in the `storybook-static` directory.

## Writing Stories

Stories are located in `src/components/react/` and follow the naming pattern `*.stories.tsx`.

### Example Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // component props
  },
};
```

## Available Components

- **Button** - A reusable button component with multiple variants
- **ActivityCard** - A card component displaying activity metrics

## Configuration

- Main config: `.storybook/main.ts`
- Preview config: `.storybook/preview.ts`

The preview includes all project styles (terminal.css, fonts.css, etc.) to ensure components render correctly in Storybook.

