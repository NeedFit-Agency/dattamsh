import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'reset' | 'listen';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: IconDefinition;
  text?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  icon,
  text,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    disabled ? styles['button--disabled'] : '',
    className,
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    if (children) {
      return children;
    }
    
    if (icon && text) {
      return (
        <>
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </>
      );
    }
    
    if (icon) {
      return <FontAwesomeIcon icon={icon} />;
    }
    
    if (text) {
      return <span>{text}</span>;
    }
    
    return null;
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {renderContent()}
    </button>
  );
};

export default Button;