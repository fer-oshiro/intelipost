import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders an input element', () => {
      render(<Input aria-label="Test input" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      render(<Input aria-label="Test input" className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });
  });

  describe('forwardRef', () => {
    it('forwards ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} aria-label="Test input" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('allows focusing via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} aria-label="Test input" />);
      ref.current?.focus();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });

  describe('event handling', () => {
    it('calls onChange when typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input aria-label="Test input" onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'hello');
      expect(handleChange).toHaveBeenCalledTimes(5);
    });

    it('calls onFocus when focused', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Input aria-label="Test input" onFocus={handleFocus} />);

      await user.click(screen.getByRole('textbox'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur when blurred', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Input aria-label="Test input" onBlur={handleBlur} />);

      await user.click(screen.getByRole('textbox'));
      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('HTML attributes', () => {
    it('supports placeholder attribute', () => {
      render(<Input placeholder="Enter text..." />);
      expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    });

    it('supports disabled attribute', () => {
      render(<Input aria-label="Test input" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('supports name attribute', () => {
      render(<Input aria-label="Test input" name="username" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations with aria-label', async () => {
      const { container } = render(<Input aria-label="Search" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with associated label', async () => {
      const { container } = render(
        <>
          <label htmlFor="test-input">Username</label>
          <Input id="test-input" />
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Input aria-label="Disabled input" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with placeholder', async () => {
      const { container } = render(<Input aria-label="Search" placeholder="Type to search..." />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports aria-describedby for error messages', () => {
      render(
        <>
          <Input aria-label="Email" aria-describedby="email-error" aria-invalid="true" />
          <span id="email-error">Please enter a valid email</span>
        </>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('can be identified by accessible name', () => {
      render(<Input aria-label="Search artists" />);
      expect(screen.getByRole('textbox', { name: /search artists/i })).toBeInTheDocument();
    });
  });
});
