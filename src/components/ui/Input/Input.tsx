import * as React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return <input ref={ref} className={clsx(styles.input, className)} {...props} />;
});
Input.displayName = 'Input';
