import { useState, type ReactNode } from 'react';

import { SearchContext } from '@/context/search';
import type { TicketMasterSuggestion } from '@/services/ticketmaster';

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState('');
  const [ticketSuggestions, setTicketSuggestions] = useState<TicketMasterSuggestion[]>();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const search = (ticket?: TicketMasterSuggestion) => {
    console.log('Searching for:', searchValue, ticket, ticketSuggestions);
    setShowSuggestions(false);
    const hasBand =
      ticketSuggestions?.find((t) => t.name.toLowerCase() === searchValue.toLowerCase()) || ticket;

    if (hasBand) {
      console.log('Band found:', hasBand.name);
    } else {
      console.log('No matching band found.');
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        ticketSuggestions,
        setTicketSuggestions,
        search,
        showSuggestions,
        setShowSuggestions,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
