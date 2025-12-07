import { env } from '@/utils/envs';

export interface TicketMasterSuggestion {
  name: string;
  type: string;
  id: string;
  url?: string;
  images?: Array<{
    url: string;
    width: number;
    height: number;
  }>;
}

export interface TicketMasterSpellcheckSuggestion {
  suggestion: string;
  score: number;
}

export interface TicketMasterSuggestResponse {
  _embedded?: {
    attractions?: TicketMasterSuggestion[];
  };
  spellcheck?: {
    suggestions: TicketMasterSpellcheckSuggestion[];
  };
}

export async function fetchTicketMasterSuggestions(keyword: string): Promise<{
  attractions: TicketMasterSuggestion[];
  suggestions: TicketMasterSpellcheckSuggestion[];
}> {
  if (!keyword.trim()) {
    return { attractions: [], suggestions: [] };
  }

  const params = new URLSearchParams({
    apikey: env.TICKETMASTER_API_KEY,
    keyword: keyword.trim(),
    includeSpellcheck: 'yes',
    page: '4',
  });

  const response = await fetch(`${env.TICKETMASTER_API_URL}attractions?${params}`);
  if (!response.ok) {
    throw new Error(`TicketMaster API error: ${response.status}`);
  }

  const data: TicketMasterSuggestResponse = await response.json();

  const attractions = data._embedded?.attractions || [];
  const suggestions = data.spellcheck?.suggestions || [];

  return { attractions: attractions, suggestions };
}
