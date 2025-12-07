import type { TicketMasterSuggestion } from '@/services/ticketmaster';
import { createContext } from 'react';

interface SearchContextProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  ticketSuggestions?: TicketMasterSuggestion[];
  setTicketSuggestions: (data: TicketMasterSuggestion[] | undefined) => void;
  search: (ticket?: TicketMasterSuggestion) => void;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
}

export const SearchContext = createContext<SearchContextProps | null>(null);
