import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchTicketMasterSuggestions } from '@/services/ticketmaster';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
}

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
