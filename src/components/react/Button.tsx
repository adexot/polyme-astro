import React from 'react';

export interface ButtonProps {
  /**
   * Button label
   */
  label: string;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'danger';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Is button disabled?
   */
  disabled?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * A reusable button component with multiple variants and sizes
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[var(--color-cyan)] text-[var(--color-slate)] hover:bg-[var(--color-cyan)]/80 focus:ring-[var(--color-cyan)]',
    secondary: 'bg-[var(--color-slate)] border border-[var(--color-mist)] text-[var(--color-bone)] hover:bg-[var(--color-charcoal)]/50 focus:ring-[var(--color-mist)]',
    danger: 'bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral)]/80 focus:ring-[var(--color-coral)]',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

