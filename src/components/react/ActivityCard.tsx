import React from 'react';

export interface ActivityCardProps {
  /**
   * Activity title
   */
  title: string;
  /**
   * Buy count
   */
  buyCount: number;
  /**
   * Buy total amount
   */
  buyTotal: number;
  /**
   * Redeem count
   */
  redeemCount: number;
  /**
   * Redeem total amount
   */
  redeemTotal: number;
  /**
   * Difference amount
   */
  difference: number;
  /**
   * Date range label
   */
  dateRange?: string;
}

/**
 * A card component displaying activity metrics for a time bucket
 */
export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  buyCount,
  buyTotal,
  redeemCount,
  redeemTotal,
  difference,
  dateRange,
}) => {
  return (
    <div className="bg-[var(--color-slate)] border border-[var(--color-mist)] rounded-lg p-4">
      {dateRange && (
        <div className="text-sm font-semibold text-[var(--color-cyan)] mb-2 border-b border-[var(--color-mist)] pb-2">
          {dateRange}
        </div>
      )}
      {title && !dateRange && (
        <div className="text-sm font-semibold text-[var(--color-cyan)] mb-2 border-b border-[var(--color-mist)] pb-2">
          {title}
        </div>
      )}
      
      <div className="space-y-1">
        {/* BUY Metrics */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--color-ash)] uppercase tracking-wider">
            BUY
          </span>
          <div className="text-right">
            <div className="text-sm font-semibold text-[var(--color-bone)]">
              {buyCount} trades
            </div>
            <div className="text-sm text-[var(--color-coral)]">
              ${buyTotal.toLocaleString()}
            </div>
          </div>
        </div>
        
        {/* REDEEM Metrics */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--color-ash)] uppercase tracking-wider">
            REDEEM
          </span>
          <div className="text-right">
            <div className="text-sm font-semibold text-[var(--color-bone)]">
              {redeemCount} trades
            </div>
            <div className="text-sm text-[var(--color-cyan)]">
              ${redeemTotal.toLocaleString()}
            </div>
          </div>
        </div>
        
        {/* Difference */}
        <div className="flex justify-between items-center pt-2 border-t border-[var(--color-mist)]">
          <span className="text-sm text-[var(--color-ash)] uppercase tracking-wider">
            Difference
          </span>
          <div className="text-right">
            <div className="text-sm font-semibold text-[var(--color-bone)]">
              {buyCount - redeemCount}
            </div>
            <div
              className={`text-sm font-semibold ${
                difference >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              ${difference.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

