import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Home from './Home';
import { describe, expect, it } from 'vitest';

describe('Home page accessibility', () => {
  it('should have no basic accessibility violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
