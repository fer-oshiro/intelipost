import type React from 'react';

import { Button } from '@/components/ui';
import { ArtistSearchCombobox } from './components/ArtistSearchCombox/ArtistSearchCombox';
import { useSearch } from './hook/useSearchProvider';

function App() {
  const { search } = useSearch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="layout">
      <main className="layout__main">
        <h1>Intelipost</h1>
        <form
          style={{ display: 'flex', gap: 20, justifyContent: 'center' }}
          onSubmit={(e) => {
            handleSubmit(e);
            search();
          }}
        >
          <ArtistSearchCombobox />
          <Button type="submit">Pesquisar</Button>
        </form>
      </main>
      <footer className="layout__footer">
        <p>Teste de Frontend Intelipost • Desenvolvido por Fernanda Oshiro</p>
      </footer>
    </div>
  );
}

export default App;
