import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import type { TicketMasterSuggestion } from '@/services/ticketmaster/attractions';
import { ArtistSearchCombobox } from './ArtistSearchCombox';

const mockSetSearchValue = vi.fn();
const mockSetShowSuggestions = vi.fn();
const mockSearch = vi.fn();
const mockSetTicketSuggestions = vi.fn();

vi.mock('@/hook/useSearchProvider', () => ({
  useSearch: () => ({
    search: mockSearch,
    setSearchValue: mockSetSearchValue,
    searchValue: 'metal',
    showSuggestions: true,
    setShowSuggestions: mockSetShowSuggestions,
    setTicketSuggestions: mockSetTicketSuggestions,
  }),
}));

const mockAttraction: TicketMasterSuggestion = {
  id: '1',
  name: 'Metallica',
  type: 'attraction',
  images: [{ url: 'https://example.com/metallica.jpg', width: 100, height: 100 }],
};

const mockUseTicketMasterSuggestions = vi.fn();

vi.mock('@/hook/useTicketMasterSuggestions', () => ({
  useTicketMasterSuggestions: () => mockUseTicketMasterSuggestions(),
}));

describe('ArtistSearchCombobox', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTicketMasterSuggestions.mockReturnValue({
      data: { attractions: [], suggestions: [] },
      isLoading: false,
      isError: false,
    });
  });

  describe('rendering', () => {
    it('renders the search input', () => {
      render(<ArtistSearchCombobox />);
      expect(screen.getByPlaceholderText('Buscar artistas, bandas...')).toBeInTheDocument();
    });

    it('renders suggestions dropdown when showSuggestions is true', () => {
      render(<ArtistSearchCombobox />);
      expect(screen.getByLabelText('Sugestões de busca')).toBeInTheDocument();
    });

    it('displays input value from search context', () => {
      render(<ArtistSearchCombobox />);
      expect(screen.getByPlaceholderText('Buscar artistas, bandas...')).toHaveValue('metal');
    });
  });

  describe('input interactions', () => {
    it('calls setSearchValue when typing', async () => {
      const user = userEvent.setup();
      render(<ArtistSearchCombobox />);

      const input = screen.getByPlaceholderText('Buscar artistas, bandas...');
      await user.type(input, 'lica');

      expect(mockSetSearchValue).toHaveBeenCalled();
    });

    it('calls setShowSuggestions(true) when typing', async () => {
      const user = userEvent.setup();
      render(<ArtistSearchCombobox />);

      const input = screen.getByPlaceholderText('Buscar artistas, bandas...');
      await user.type(input, 'a');

      expect(mockSetShowSuggestions).toHaveBeenCalledWith(true);
    });
  });

  describe('attraction selection', () => {
    it('calls search with attraction when selecting', async () => {
      const user = userEvent.setup();
      mockUseTicketMasterSuggestions.mockReturnValue({
        data: { attractions: [mockAttraction], suggestions: [] },
        isLoading: false,
        isError: false,
      });

      render(<ArtistSearchCombobox />);

      await user.click(screen.getByRole('option', { name: /metallica/i }));

      expect(mockSearch).toHaveBeenCalledWith(mockAttraction);
    });

    it('updates search value with attraction name when selecting', async () => {
      const user = userEvent.setup();
      mockUseTicketMasterSuggestions.mockReturnValue({
        data: { attractions: [mockAttraction], suggestions: [] },
        isLoading: false,
        isError: false,
      });

      render(<ArtistSearchCombobox />);

      await user.click(screen.getByRole('option', { name: /metallica/i }));

      expect(mockSetSearchValue).toHaveBeenCalledWith('Metallica');
    });
  });

  describe('spellcheck suggestion selection', () => {
    it('updates search value with spellcheck suggestion when selecting', async () => {
      const user = userEvent.setup();
      mockUseTicketMasterSuggestions.mockReturnValue({
        data: {
          attractions: [],
          suggestions: [{ suggestion: 'metallica', score: 0.9 }],
        },
        isLoading: false,
        isError: false,
      });

      render(<ArtistSearchCombobox />);

      await user.click(screen.getByRole('button', { name: /metallica/i }));

      expect(mockSetSearchValue).toHaveBeenCalledWith('metallica');
    });
  });

  describe('loading state', () => {
    it('displays loading state in dropdown', () => {
      mockUseTicketMasterSuggestions.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      });

      render(<ArtistSearchCombobox />);

      expect(screen.getByRole('status')).toHaveTextContent('Carregando sugestões…');
    });
  });

  describe('error state', () => {
    it('displays error state in dropdown', () => {
      mockUseTicketMasterSuggestions.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      });

      render(<ArtistSearchCombobox />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no violations with empty results', async () => {
      const { container } = render(<ArtistSearchCombobox />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with attractions', async () => {
      mockUseTicketMasterSuggestions.mockReturnValue({
        data: { attractions: [mockAttraction], suggestions: [] },
        isLoading: false,
        isError: false,
      });

      const { container } = render(<ArtistSearchCombobox />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations in loading state', async () => {
      mockUseTicketMasterSuggestions.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      });

      const { container } = render(<ArtistSearchCombobox />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
