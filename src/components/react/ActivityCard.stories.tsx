import type { Meta, StoryObj } from '@storybook/react';
import { ActivityCard } from './ActivityCard';

const meta: Meta<typeof ActivityCard> = {
  title: 'Components/ActivityCard',
  component: ActivityCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buyCount: {
      control: { type: 'number', min: 0 },
    },
    buyTotal: {
      control: { type: 'number', min: 0 },
    },
    redeemCount: {
      control: { type: 'number', min: 0 },
    },
    redeemTotal: {
      control: { type: 'number', min: 0 },
    },
    difference: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityCard>;

export const Default: Story = {
  args: {
    title: 'Activity Summary',
    buyCount: 25,
    buyTotal: 1250.50,
    redeemCount: 18,
    redeemTotal: 980.25,
    difference: -270.25,
    dateRange: 'Jan 1, 2025 - Jan 2, 2025',
  },
};

export const PositiveDifference: Story = {
  args: {
    title: 'Activity Summary',
    buyCount: 15,
    buyTotal: 750.00,
    redeemCount: 20,
    redeemTotal: 1200.00,
    difference: 450.00,
    dateRange: 'Jan 2, 2025 - Jan 3, 2025',
  },
};

export const ZeroDifference: Story = {
  args: {
    title: 'Activity Summary',
    buyCount: 10,
    buyTotal: 500.00,
    redeemCount: 10,
    redeemTotal: 500.00,
    difference: 0,
    dateRange: 'Jan 3, 2025 - Jan 4, 2025',
  },
};

export const LargeNumbers: Story = {
  args: {
    title: 'Activity Summary',
    buyCount: 150,
    buyTotal: 125000.75,
    redeemCount: 120,
    redeemTotal: 98000.50,
    difference: -27000.25,
    dateRange: 'Dec 1, 2024 - Dec 2, 2024',
  },
};

export const WithoutDateRange: Story = {
  args: {
    title: 'Custom Activity Summary',
    buyCount: 30,
    buyTotal: 2500.00,
    redeemCount: 25,
    redeemTotal: 2000.00,
    difference: -500.00,
  },
};
