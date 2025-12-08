import { useSearch } from '@/hook/useSearchProvider';
import { useTicketMasterSuggestions } from '@/hook/useTicketMasterSuggestions';
import type { TicketMasterSuggestion } from '@/services/ticketmaster/attractions';
import { SuggestionsDropdown } from '../SuggestionsDropdown/SuggestionsDropdown';
import { Input } from '../ui';
import styles from './ArtistSearchCombox.module.scss';
import { useEffect } from 'react';

export function ArtistSearchCombobox() {
  const {
    search,
    setSearchValue,
    searchValue,
    showSuggestions,
    setShowSuggestions,
    setTicketSuggestions,
  } = useSearch();
  const { data, isLoading, isError } = useTicketMasterSuggestions(searchValue);

  useEffect(() => {
    if (data?.attractions) {
      setTicketSuggestions(data.attractions);
    }
  }, [data?.attractions]);

  function handleSelect(attraction: TicketMasterSuggestion) {
    search(attraction);
    setSearchValue(attraction.name);
  }

  return (
    <div className={styles.combobox}>
      <Input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setShowSuggestions(true);
        }}
        placeholder="Buscar artistas, bandas..."
      />

      {showSuggestions && (
        <SuggestionsDropdown
          keyword={searchValue}
          attractions={data?.attractions || []}
          suggestions={data?.suggestions || []}
          isLoading={isLoading}
          isError={isError}
          onSelectAttraction={handleSelect}
          onSelectSpellCheckSuggestion={(suggestion) => setSearchValue(suggestion)}
        />
      )}
    </div>
  );
}
