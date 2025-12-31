import type { Meta, StoryObj } from '@storybook/react';
import { HighlightZoomLineChart } from './HighlightZoomLineChart';
import type { BarChartData } from './BarChart';

const meta: Meta<typeof HighlightZoomLineChart> = {
  title: 'Components/HighlightZoomLineChart',
  component: HighlightZoomLineChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    showLegend: {
      control: 'boolean',
    },
    showGrid: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HighlightZoomLineChart>;

// Sample data with mixed positive and negative differences
const sampleData: BarChartData[] = [
  { name: 'Jan 1-2', difference: -270.25 },
  { name: 'Jan 2-3', difference: 450.00 },
  { name: 'Jan 3-4', difference: 0 },
  { name: 'Jan 4-5', difference: -500.25 },
  { name: 'Jan 5-6', difference: 400.00 },
];

const largeData: BarChartData[] = [
  { name: 'Dec 1-2', difference: -27000 },
  { name: 'Dec 2-3', difference: -30000 },
  { name: 'Dec 3-4', difference: 12000 },
  { name: 'Dec 4-5', difference: -50000 },
  { name: 'Dec 5-6', difference: 40000 },
  { name: 'Dec 6-7', difference: -20000 },
  { name: 'Dec 7-8', difference: 15000 },
];

const manyDataPoints: BarChartData[] = [
  { name: 'Day 1', difference: -100 },
  { name: 'Day 2', difference: 50 },
  { name: 'Day 3', difference: -50 },
  { name: 'Day 4', difference: 100 },
  { name: 'Day 5', difference: -75 },
  { name: 'Day 6', difference: 150 },
  { name: 'Day 7', difference: -200 },
  { name: 'Day 8', difference: 75 },
  { name: 'Day 9', difference: -125 },
  { name: 'Day 10', difference: 250 },
  { name: 'Day 11', difference: -300 },
  { name: 'Day 12', difference: 180 },
  { name: 'Day 13', difference: -90 },
  { name: 'Day 14', difference: 220 },
];

const smoothData: BarChartData[] = [
  { name: 'Week 1', difference: -200 },
  { name: 'Week 2', difference: -150 },
  { name: 'Week 3', difference: -50 },
  { name: 'Week 4', difference: 100 },
  { name: 'Week 5', difference: 250 },
  { name: 'Week 6', difference: 300 },
  { name: 'Week 7', difference: 200 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    title: 'Activity Difference Over Time (Line)',
    height: 400,
    showLegend: true,
    showGrid: true,
  },
};

export const LargeDataset: Story = {
  args: {
    data: manyDataPoints,
    title: 'Many Data Points with Highlight & Zoom',
    height: 450,
    showLegend: true,
    showGrid: true,
  },
};

export const LargeNumbers: Story = {
  args: {
    data: largeData,
    title: 'Monthly Difference (Large Values)',
    height: 400,
    showLegend: true,
    showGrid: true,
  },
};

export const SmoothTrend: Story = {
  args: {
    data: smoothData,
    title: 'Smooth Trend Line',
    height: 400,
    showLegend: true,
    showGrid: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    data: sampleData,
    height: 400,
    showLegend: true,
    showGrid: true,
  },
};

export const NoLegend: Story = {
  args: {
    data: sampleData,
    title: 'Line Chart (No Legend)',
    height: 400,
    showLegend: false,
    showGrid: true,
  },
};

export const NoGrid: Story = {
  args: {
    data: sampleData,
    title: 'Line Chart (No Grid)',
    height: 400,
    showLegend: true,
    showGrid: false,
  },
};

