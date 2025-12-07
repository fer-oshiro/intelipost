import { Button } from '@/components';

function Home() {
  return (
    <div className="layout">
      <main className="layout__main">
        <h1>Intelipost</h1>
        <Button>Pesquisar</Button>
      </main>
      <footer className="layout__footer">
        <p>Teste de Frontend Intelipost • Desenvolvido por Fernanda Oshiro</p>
      </footer>
    </div>
  );
}

export default Home;
