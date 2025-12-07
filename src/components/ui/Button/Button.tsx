import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        { [styles['button--disabled']]: disabled },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
