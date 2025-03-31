import React from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primaryBlue' | 'secondaryGray' | 'yellow' | 'white' | 'darkOutline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primaryBlue', // Default variant
  fullWidth = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const variantClass = styles[variant] || styles.primaryBlue;
  const fullWidthClass = fullWidth ? styles.fullWidth : '';

  return (
    <button
      className={`${styles.button} ${variantClass} ${fullWidthClass} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}