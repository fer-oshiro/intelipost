import clsx from 'clsx';

import type {
  TicketMasterSpellcheckSuggestion,
  TicketMasterSuggestion,
} from '@/services/ticketmaster/attractions';
import styles from './SuggestionsDropdown.module.scss';

interface SuggestionsDropdownProps {
  keyword: string;
  attractions: TicketMasterSuggestion[];
  suggestions: TicketMasterSpellcheckSuggestion[];
  isLoading: boolean;
  isError: boolean;
  onSelectAttraction: (attraction: TicketMasterSuggestion) => void;
  onSelectSpellCheckSuggestion?: (suggestion: string) => void;
}

export function SuggestionsDropdown({
  keyword,
  attractions,
  suggestions,
  isLoading,
  isError,
  onSelectAttraction,
  onSelectSpellCheckSuggestion,
}: SuggestionsDropdownProps) {
  const trimmedKeyword = keyword.trim();

  if (!trimmedKeyword || trimmedKeyword.length < 3) {
    return null;
  }

  const hasAttractions = attractions.length > 0;
  const hasSuggestions = suggestions?.length > 0;
  const showEmptyState = !isLoading && !isError && !hasAttractions;
  const showAttractions = !isLoading && !isError && hasAttractions;

  return (
    <div className={styles.dropdown} aria-label="Sugestões de busca">
      {isLoading && (
        <div className={styles.dropdown__message} role="status" aria-live="polite">
          Carregando sugestões…
        </div>
      )}

      {isError && (
        <div
          className={clsx(styles.dropdown__message, styles['dropdown__message--error'])}
          role="alert"
        >
          Não foi possível carregar sugestões no momento.
        </div>
      )}

      {showEmptyState && !hasSuggestions && (
        <div className={styles.dropdown__message}>Nenhuma banda encontrada.</div>
      )}

      {showEmptyState && hasSuggestions && (
        <div className={styles.dropdown__message}>
          Você quis dizer:{' '}
          {suggestions.map((s, index) => (
            <button
              key={s.suggestion}
              type="button"
              className={styles.dropdown__suggestion}
              onClick={() => onSelectSpellCheckSuggestion?.(s.suggestion)}
            >
              {s.suggestion}
              {index < suggestions.length - 1 && ', '}
            </button>
          ))}
        </div>
      )}

      {showAttractions && (
        <ul className={styles.dropdown__list} role="listbox" aria-label="Artistas encontrados">
          {attractions.map((attraction) => (
            <li key={attraction.id} role="presentation" className={styles.dropdown__item}>
              <button
                type="button"
                role="option"
                className={styles.dropdown__button}
                onClick={() => onSelectAttraction(attraction)}
              >
                {attraction.images?.[0] && (
                  <img src={attraction.images[0].url} alt="" className={styles.dropdown__image} />
                )}
                <span className={styles.dropdown__name}>{attraction.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
