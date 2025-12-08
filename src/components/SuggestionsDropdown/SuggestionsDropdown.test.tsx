import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';

import type {
  TicketMasterSpellcheckSuggestion,
  TicketMasterSuggestion,
} from '@/services/ticketmaster/attractions';
import { SuggestionsDropdown } from './SuggestionsDropdown';

const mockAttraction: TicketMasterSuggestion = {
  id: '1',
  name: 'Metallica',
  type: 'attraction',
  images: [{ url: 'https://example.com/metallica.jpg', width: 100, height: 100 }],
};

const mockAttractionWithoutImage: TicketMasterSuggestion = {
  id: '2',
  name: 'Iron Maiden',
  type: 'attraction',
};

const mockSpellcheckSuggestion: TicketMasterSpellcheckSuggestion = {
  suggestion: 'metallica',
  score: 0.9,
};

const defaultProps = {
  keyword: 'metal',
  attractions: [] as TicketMasterSuggestion[],
  suggestions: [] as TicketMasterSpellcheckSuggestion[],
  isLoading: false,
  isError: false,
  onSelectAttraction: vi.fn(),
  onSelectSpellCheckSuggestion: vi.fn(),
};

describe('SuggestionsDropdown', () => {
  describe('visibility', () => {
    it('returns null when keyword is empty', () => {
      const { container } = render(<SuggestionsDropdown {...defaultProps} keyword="" />);
      expect(container).toBeEmptyDOMElement();
    });

    it('returns null when keyword is only whitespace', () => {
      const { container } = render(<SuggestionsDropdown {...defaultProps} keyword="   " />);
      expect(container).toBeEmptyDOMElement();
    });

    it('returns null when keyword has less than 3 characters', () => {
      const { container } = render(<SuggestionsDropdown {...defaultProps} keyword="ab" />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders when keyword has 3 or more characters', () => {
      render(<SuggestionsDropdown {...defaultProps} keyword="abc" />);
      expect(screen.getByLabelText('Sugestões de busca')).toBeInTheDocument();
    });

    it('trims keyword before checking length', () => {
      const { container } = render(<SuggestionsDropdown {...defaultProps} keyword="  ab  " />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('loading state', () => {
    it('displays loading message when isLoading is true', () => {
      render(<SuggestionsDropdown {...defaultProps} isLoading={true} />);
      expect(screen.getByText('Carregando sugestões…')).toBeInTheDocument();
    });

    it('has status role for loading message', () => {
      render(<SuggestionsDropdown {...defaultProps} isLoading={true} />);
      expect(screen.getByRole('status')).toHaveTextContent('Carregando sugestões…');
    });
  });

  describe('error state', () => {
    it('displays error message when isError is true', () => {
      render(<SuggestionsDropdown {...defaultProps} isError={true} />);
      expect(
        screen.getByText('Não foi possível carregar sugestões no momento.')
      ).toBeInTheDocument();
    });

    it('has alert role for error message', () => {
      render(<SuggestionsDropdown {...defaultProps} isError={true} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('displays empty message when no attractions and no suggestions', () => {
      render(<SuggestionsDropdown {...defaultProps} attractions={[]} suggestions={[]} />);
      expect(screen.getByText('Nenhuma banda encontrada.')).toBeInTheDocument();
    });

    it('does not show empty message when loading', () => {
      render(<SuggestionsDropdown {...defaultProps} isLoading={true} attractions={[]} />);
      expect(screen.queryByText('Nenhuma banda encontrada.')).not.toBeInTheDocument();
    });

    it('does not show empty message when error', () => {
      render(<SuggestionsDropdown {...defaultProps} isError={true} attractions={[]} />);
      expect(screen.queryByText('Nenhuma banda encontrada.')).not.toBeInTheDocument();
    });
  });

  describe('spellcheck suggestions', () => {
    it('displays spellcheck suggestions when no attractions found', () => {
      render(
        <SuggestionsDropdown
          {...defaultProps}
          attractions={[]}
          suggestions={[mockSpellcheckSuggestion]}
        />
      );
      expect(screen.getByText('Você quis dizer:')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /metallica/i })).toBeInTheDocument();
    });

    it('displays multiple spellcheck suggestions separated by comma', () => {
      const multipleSuggestions = [
        { suggestion: 'metallica', score: 0.9 },
        { suggestion: 'metalica', score: 0.8 },
      ];
      render(
        <SuggestionsDropdown {...defaultProps} attractions={[]} suggestions={multipleSuggestions} />
      );
      expect(screen.getByRole('button', { name: /metallica,/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /metalica$/i })).toBeInTheDocument();
    });

    it('calls onSelectSpellCheckSuggestion when clicking a suggestion', async () => {
      const user = userEvent.setup();
      const onSelectSpellCheckSuggestion = vi.fn();
      render(
        <SuggestionsDropdown
          {...defaultProps}
          attractions={[]}
          suggestions={[mockSpellcheckSuggestion]}
          onSelectSpellCheckSuggestion={onSelectSpellCheckSuggestion}
        />
      );

      await user.click(screen.getByRole('button', { name: /metallica/i }));
      expect(onSelectSpellCheckSuggestion).toHaveBeenCalledWith('metallica');
    });

    it('does not show spellcheck when attractions exist', () => {
      render(
        <SuggestionsDropdown
          {...defaultProps}
          attractions={[mockAttraction]}
          suggestions={[mockSpellcheckSuggestion]}
        />
      );
      expect(screen.queryByText('Você quis dizer:')).not.toBeInTheDocument();
    });
  });

  describe('attractions list', () => {
    it('displays attractions when available', () => {
      render(<SuggestionsDropdown {...defaultProps} attractions={[mockAttraction]} />);
      expect(screen.getByRole('option', { name: /metallica/i })).toBeInTheDocument();
    });

    it('displays multiple attractions', () => {
      render(
        <SuggestionsDropdown
          {...defaultProps}
          attractions={[mockAttraction, mockAttractionWithoutImage]}
        />
      );
      expect(screen.getByRole('option', { name: /metallica/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /iron maiden/i })).toBeInTheDocument();
    });

    it('displays attraction image when available', () => {
      const { container } = render(
        <SuggestionsDropdown {...defaultProps} attractions={[mockAttraction]} />
      );
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'https://example.com/metallica.jpg');
    });

    it('does not display image when not available', () => {
      const { container } = render(
        <SuggestionsDropdown {...defaultProps} attractions={[mockAttractionWithoutImage]} />
      );
      expect(container.querySelector('img')).not.toBeInTheDocument();
    });

    it('calls onSelectAttraction when clicking an attraction', async () => {
      const user = userEvent.setup();
      const onSelectAttraction = vi.fn();
      render(
        <SuggestionsDropdown
          {...defaultProps}
          attractions={[mockAttraction]}
          onSelectAttraction={onSelectAttraction}
        />
      );

      await user.click(screen.getByRole('option', { name: /metallica/i }));
      expect(onSelectAttraction).toHaveBeenCalledWith(mockAttraction);
    });

    it('does not show attractions when loading', () => {
      render(
        <SuggestionsDropdown {...defaultProps} isLoading={true} attractions={[mockAttraction]} />
      );
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });

    it('does not show attractions when error', () => {
      render(
        <SuggestionsDropdown {...defaultProps} isError={true} attractions={[mockAttraction]} />
      );
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no violations in loading state', async () => {
      const { container } = render(<SuggestionsDropdown {...defaultProps} isLoading={true} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations in error state', async () => {
      const { container } = render(<SuggestionsDropdown {...defaultProps} isError={true} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations in empty state', async () => {
      const { container } = render(<SuggestionsDropdown {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with attractions', async () => {
      const { container } = render(
        <SuggestionsDropdown {...defaultProps} attractions={[mockAttraction]} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with spellcheck suggestions', async () => {
      const { container } = render(
        <SuggestionsDropdown
          {...defaultProps}
          attractions={[]}
          suggestions={[mockSpellcheckSuggestion]}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has listbox role on attractions list', () => {
      render(<SuggestionsDropdown {...defaultProps} attractions={[mockAttraction]} />);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('has accessible label on attractions list', () => {
      render(<SuggestionsDropdown {...defaultProps} attractions={[mockAttraction]} />);
      expect(screen.getByRole('listbox')).toHaveAccessibleName('Artistas encontrados');
    });

    it('has option role on attraction buttons', () => {
      render(<SuggestionsDropdown {...defaultProps} attractions={[mockAttraction]} />);
      expect(screen.getByRole('option')).toBeInTheDocument();
    });

    it('images are decorative with empty alt', () => {
      const { container } = render(
        <SuggestionsDropdown {...defaultProps} attractions={[mockAttraction]} />
      );
      const img = container.querySelector('img');
      expect(img).toHaveAttribute('alt', '');
    });
  });
});
