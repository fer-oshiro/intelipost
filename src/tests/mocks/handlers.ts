import { env } from '@/utils/envs';
import { http } from 'msw';

export const handlers = [
  http.get(`${env.API_BASE_URL}/artists`, () => {
    return new Response(
      JSON.stringify([
        { id: '1', name: 'Artist One' },
        { id: '2', name: 'Artist Two' },
      ]),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }),
];
