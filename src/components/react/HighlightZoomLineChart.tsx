// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
  Area,
  AreaChart,
} from 'recharts';
import type { BarChartData } from './BarChart';

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

export interface HighlightZoomLineChartProps {
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
 * A highlight and zoom line chart component using Recharts
 * Shows difference values as a line chart with highlight and zoom capabilities
 * Positive values above baseline, negative values below
 */
export const HighlightZoomLineChart: React.FC<HighlightZoomLineChartProps> = ({
  data,
  title,
  height = 400,
  showLegend = true,
  showGrid = true,
}) => {
  // State to track data changes
  const [chartData, setChartData] = useState(data);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  // Custom tooltip to match project styling
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = chartData.find((d: any) => d.name === label);
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

  // Truncate x-axis label to 10 characters
  const truncateLabel = (label: string) => {
    if (typeof label === 'string' && label.length > 10) {
      return label.substring(0, 10) + '...';
    }
    return label;
  };

  // Custom X-axis tick with tooltip
  const CustomXAxisTick = ({ x, y, payload }: any) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const fullText = payload?.value || '';
    const truncatedText = truncateLabel(fullText);
    const needsTruncation = fullText.length > 10;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill={colors.ash}
          fontSize={12}
          transform="rotate(-45)"
          onMouseEnter={() => needsTruncation && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{ cursor: needsTruncation ? 'help' : 'default' }}
        >
          {truncatedText}
        </text>
        {showTooltip && needsTruncation && (
          <g>
            <rect
              x={-60}
              y={-25}
              width={120}
              height={20}
              fill={colors.slate}
              stroke={colors.mist}
              strokeWidth={1}
              rx={4}
            />
            <text
              x={0}
              y={-10}
              textAnchor="middle"
              fill={colors.bone}
              fontSize={11}
            >
              {fullText}
            </text>
          </g>
        )}
      </g>
    );
  };

  // Custom dot component for highlighting active point
  const CustomDot = (props: any) => {
    const { cx, cy, payload, index } = props;
    const isActive = activeIndex === index;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isActive ? 6 : 4}
        fill={payload.difference >= 0 ? colors.positive : colors.negative}
        stroke={isActive ? colors.cyan : 'none'}
        strokeWidth={isActive ? 2 : 0}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  // Handle mouse enter on line
  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setActiveIndex(null);
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
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 120, // Extra space for x-axis labels (80px) + brush (40px)
          }}
          onMouseLeave={handleMouseLeave}
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
            tick={<CustomXAxisTick />}
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
              iconType="line"
            />
          )}
          {/* Area for positive values */}
          <Area
            type="monotone"
            dataKey="difference"
            stroke={colors.cyan}
            fill={colors.cyan}
            fillOpacity={0.3}
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 8, stroke: colors.cyan, strokeWidth: 2 }}
            onMouseEnter={handleMouseEnter}
          />
          <Brush
            dataKey="name"
            height={30}
            stroke={colors.mist}
            fill={colors.slate}
            tickFormatter={(value) => {
              // Truncate long labels in brush
              if (typeof value === 'string' && value.length > 10) {
                return value.substring(0, 10) + '...';
              }
              return value;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

