import { fetchTicketMasterSuggestions } from '@/services/ticketmaster';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';

export function useTicketMasterSuggestions(keyword: string) {
  const debouncedKeyword = useDebounce(keyword, 500);

  return useQuery({
    queryKey: ['ticketmaster', 'suggestions', debouncedKeyword],
    queryFn: () => fetchTicketMasterSuggestions(debouncedKeyword),
    enabled: debouncedKeyword.length >= 3,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
