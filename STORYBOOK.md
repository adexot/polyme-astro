# Storybook Integration

This project has been successfully integrated with React and Storybook for visual component testing.

## What's Been Added

### React Integration
- ✅ React 19.2.3 and React DOM installed
- ✅ `@astrojs/react` integration added to Astro config
- ✅ React components can now be used in Astro pages using the `client:load` directive

### Storybook Setup
- ✅ Storybook 8.6.14 installed and configured
- ✅ Vite builder configured for React components
- ✅ Project styles (terminal.css, fonts.css, etc.) integrated
- ✅ Storybook scripts added to package.json

### Sample Components

Two React components have been created with full Storybook stories:

1. **Button Component** (`src/components/react/Button.tsx`)
   - Multiple variants: primary, secondary, danger
   - Three sizes: sm, md, lg
   - Disabled state support
   - Fully documented with Storybook stories

2. **ActivityCard Component** (`src/components/react/ActivityCard.tsx`)
   - Displays activity metrics (buy/redeem counts and totals)
   - Shows difference calculations
   - Date range support
   - Multiple story examples including grid layouts

## Usage

### Running Storybook

```bash
pnpm storybook
```

Opens Storybook at `http://localhost:6006`

### Using React Components in Astro

```astro
---
import { Button } from '../components/react/Button';
---

<Button client:load label="Click Me" variant="primary" />
```

### Creating New Stories

1. Create your React component in `src/components/react/`
2. Create a corresponding `.stories.tsx` file
3. Storybook will automatically pick it up

Example:
```tsx
// src/components/react/MyComponent.tsx
export const MyComponent = ({ label }: { label: string }) => {
  return <div>{label}</div>;
};

// src/components/react/MyComponent.stories.tsx
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
    label: 'Hello Storybook',
  },
};
```

## Configuration Files

- `.storybook/main.ts` - Main Storybook configuration
- `.storybook/preview.ts` - Preview configuration with global styles
- `astro.config.mjs` - Updated with React integration

## Next Steps

- Add more React components as needed
- Create stories for all components
- Use Storybook for visual regression testing
- Document component APIs in Storybook

