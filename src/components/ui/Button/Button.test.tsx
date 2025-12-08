import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders with primary variant by default', () => {
      render(<Button>Primary</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is enabled by default', () => {
      render(<Button>Enabled</Button>);
      expect(screen.getByRole('button')).toBeEnabled();
    });
  });

  describe('custom className', () => {
    it('accepts custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('event handling', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents click interaction when disabled via pointer-events', () => {
      const handleClick = vi.fn();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveStyle({ pointerEvents: 'none' });
    });
  });

  describe('HTML attributes', () => {
    it('supports type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('supports aria-label attribute', () => {
      render(<Button aria-label="Close dialog">X</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close dialog');
    });

    it('supports data-testid attribute', () => {
      render(<Button data-testid="submit-btn">Submit</Button>);
      expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
    });
  });
});
