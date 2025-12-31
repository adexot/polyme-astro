// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

// Color constants matching the project theme
const colors = {
  positive: '#22d3ee',   // Cyan for positive difference
  negative: '#ef4444',   // Red/Coral for negative difference
  slate: '#1e2022',      // Dark background
  mist: '#4c5f7a',       // Border color
  ash: '#637777',        // Text color (ash)
  bone: '#d6deeb',       // Text color (bone)
  cyan: '#22d3ee',       // Accent color
};

export interface BarChartData {
  /**
   * Category name (e.g., date range)
   */
  name: string;
  /**
   * Difference amount (can be positive or negative)
   */
  difference: number;
}

export interface BarChartProps {
  /**
   * Chart data
   */
  data: BarChartData[];
  /**
   * Chart title
   */
  title?: string;
  /**
   * Chart height
   */
  height?: number;
  /**
   * Show legend
   */
  showLegend?: boolean;
  /**
   * Show grid
   */
  showGrid?: boolean;
}

/**
 * A positive/negative bar chart component using Recharts
 * Shows difference values with positive bars above baseline and negative bars below
 */
export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  height = 350,
  showLegend = true,
  showGrid = true,
}) => {
  // State to track data changes
  const [chartData, setChartData] = useState(data);

  // Update chart data when props change
  useEffect(() => {
    setChartData(data);
  }, [data]);

  // Listen for custom event to update chart data from client-side updates
  useEffect(() => {
    const handleChartUpdate = (event: CustomEvent) => {
      if (event.detail && Array.isArray(event.detail)) {
        setChartData(event.detail);
      }
    };

    window.addEventListener('chart-data-update', handleChartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('chart-data-update', handleChartUpdate as EventListener);
    };
  }, []);

  // Transform data to separate positive and negative values
  const transformedData = chartData.map((item) => {
    return item;
  });

  // Custom tooltip to match project styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Find the data point to get the original difference value
      const dataPoint = transformedData.find((d: any) => d.name === label);
      const difference = dataPoint?.difference ?? 0;

      return (
        <div 
          className="rounded-lg p-3 shadow-lg"
          style={{ 
            backgroundColor: colors.slate, 
            border: `1px solid ${colors.mist}`,
            color: colors.bone 
          }}
        >
          <p 
            className="text-sm font-semibold mb-2"
            style={{ color: colors.cyan }}
          >
            {label}
          </p>
          <p 
            className="text-sm"
            style={{ color: difference >= 0 ? colors.positive : colors.negative }}
          >
            {`Difference: $${difference}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label formatter for Y-axis (handles negative values)
  const formatYAxis = (value: number) => {
    const absValue = Math.abs(value);
    const formatted = absValue >= 1000 ? `$${(absValue / 1000).toFixed(1)}k` : `$${absValue}`;
    return value < 0 ? `-${formatted}` : formatted;
  };

  return (
    <div 
      className="rounded-lg p-6"
      style={{ 
        backgroundColor: colors.slate, 
        border: `1px solid ${colors.mist}` 
      }}
    >
      {title && (
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: colors.cyan }}
        >
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={transformedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="2 2"
              stroke={colors.mist}
              opacity={0.3}
            />
          )}
          <XAxis
            dataKey="name"
            stroke={colors.ash}
            tick={{ fill: colors.ash, fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke={colors.ash}
            tick={{ fill: colors.ash, fontSize: 12 }}
            tickFormatter={formatYAxis}
          />
          <ReferenceLine y={0} stroke={colors.mist} strokeWidth={2} />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend
              wrapperStyle={{ color: colors.bone }}
              iconType="rect"
            />
          )}
          <Bar
            dataKey="difference"
            name="Difference"
            fill={colors.cyan}
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
