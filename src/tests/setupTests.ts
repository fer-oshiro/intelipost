import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { server } from './mocks/server';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
