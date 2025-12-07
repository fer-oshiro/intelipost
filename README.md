# Intelipost Frontend Test - Band & Artist Search

Este projeto é a minha solução para o desafio técnico de Frontend da Intelipost, focado na busca de bandas e artistas utilizando as APIs do YouTube e TicketMaster.

> 📄 **Observação:** O enunciado original do teste da Intelipost está disponível para referência em [`README-intelipost.md`](./README-intelipost.md).

## Sumário

- [Intelipost Frontend Test - Band \& Artist Search](#intelipost-frontend-test---band--artist-search)
  - [Sumário](#sumário)
  - [Funcionalidades Implementadas](#funcionalidades-implementadas)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Decisões Técnicas e Justificativas](#decisões-técnicas-e-justificativas)
    - [1. Escolha do Framework (React)](#1-escolha-do-framework-react)
    - [3. Estilização (Sass Modules + BEM)](#3-estilização-sass-modules--bem)
    - [4. Qualidade de Código e Desenvolvimento](#4-qualidade-de-código-e-desenvolvimento)
    - [5. Testes](#5-testes)
    - [6. Acessibilidade (A11y) e Performance](#6-acessibilidade-a11y-e-performance)
    - [7. CI/CD e Deploy](#7-cicd-e-deploy)
    - [8. Estruturas das Pastas](#8-estruturas-das-pastas)
  - [Como Rodar o Projeto](#como-rodar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [Instalação](#instalação)
    - [Executando em Modo Desenvolvimento](#executando-em-modo-desenvolvimento)

## Funcionalidades Implementadas

- [ ] **Busca de Artistas/Bandas:** Campo de busca centralizado que se move para o topo após a primeira pesquisa.
- [ ] **Listagem de Vídeos do YouTube:** Exibição de resultados de vídeos com título, descrição, thumbnail e canal.
- [ ] **Reprodução de Vídeos:** Modal interativo para reprodução de vídeos do YouTube (embed).
- [ ] **Informações do Artista (TicketMaster):** Exibição de dados como nome, imagens e links para redes sociais.
- [ ] **Experiência do Usuário:**
  - [ ] Estados de `loading` e `error` para feedback visual.
  - [ ] Mensagens para "nenhum resultado encontrado".
- [ ] **Responsividade:** Layout adaptável para diferentes tamanhos de tela (Mobile First).
- [ ] **Animações:** Transições e animações CSS sutis para uma experiência fluida.

## Tecnologias Utilizadas

- **Framework/Biblioteca:** `React v19`
- **Linguagem:** `TypeScript`
- **Build Tool:** `Vite`
- **Estilização:** `Sass (SCSS Modules)` com `BEM Naming Convention`
- **Gerenciamento de estado de servidor::** `@tanstack/react-query (React Query)`
- **Testes:** `Vitest` e `@testing-library/react`
- **Qualidade de Código:** `ESLint`, `Prettier`, `Husky`, `lint-staged`
- **CI/CD:** `GitHub Actions` para deploy no `AWS S3` e `CloudFront`
- **Versão do Node.js:** `v20.19.4`
- **Versão do npm:** `v10.8.2`

## Decisões Técnicas e Justificativas

### 1. Escolha do Framework (React)

- **Justificativa:** Embora a Intelipost utilize Vue.js, optei por React por ser a tecnologia com a qual possuo maior proficiência e experiência no desenvolvimento de aplicações complexas. Acredito que os princípios de componentização, gerenciamento de estado e arquitetura de frontend são universais e podem ser aplicados de forma eficaz em qualquer framework, demonstrando minha capacidade de adaptação e aprendizado.

### 3. Estilização (Sass Modules + BEM)

- **Sass Modules:** Utilizado para encapsular estilos em nível de componente, evitando conflitos e facilitando a manutenção.
- **BEM (Block Element Modifier):** Adotado para a convenção de nomenclatura de classes CSS, promovendo clareza, modularidade e escalabilidade dos estilos.
- **Mobile First:** O desenvolvimento do layout foi iniciado com foco em dispositivos móveis, garantindo uma experiência otimizada para telas menores e escalando para desktops.

### 4. Qualidade de Código e Desenvolvimento

- **TypeScript:** Utilizado para adicionar tipagem estática, o que aumenta a robustez do código, facilita a detecção de erros em tempo de desenvolvimento e melhora a legibilidade.
- **ESLint e Prettier:** Configurados para garantir um padrão de código consistente, identificar potenciais problemas e formatar automaticamente o código, reduzindo o atrito em revisões.
- **Husky e lint-staged:** Implementados para automatizar a verificação de lint e formatação no `pre-commit`, assegurando que apenas código de alta qualidade seja commitado.
- **Commits Semânticos:** Utilizei a convenção de commits semânticos (ex: `feat:`, `chore:`, `fix:`) para manter um histórico de Git claro e fácil de navegar.

### 5. Testes

- **Vitest e React Testing Library:** Configurados para testes unitários de componentes e serviços. Isso garante a confiabilidade das funcionalidades e facilita futuras refatorações.
  - _(Se você tiver tempo para escrever testes, mencione o que foi testado: ex: "Testes unitários para os serviços de API e para os componentes SearchBar e VideoCard.")_

### 6. Acessibilidade (A11y) e Performance

- **HTML Semântico:** Priorizei o uso de tags HTML semânticas para melhorar a acessibilidade e o SEO da aplicação.
- **Lighthouse:** Busquei otimizar a aplicação para obter boas pontuações em Performance, Acessibilidade, Boas Práticas e SEO, utilizando o Lighthouse como ferramenta de auditoria.
  - _(Se você integrar Lighthouse CI, mencione: "Integrado com CI/CD para garantir que as métricas de qualidade sejam mantidas.")_

### 7. CI/CD e Deploy

- **GitHub Actions:** Configurado para automatizar o processo de build, testes e deploy.
- **AWS S3 e CloudFront:** A aplicação é automaticamente deployada em um bucket S3 e servida via CloudFront, garantindo alta disponibilidade, performance e HTTPS.

### 8. Estruturas das Pastas

A aplicação foi organizada para ser fácil de escalar e manter, separando responsabilidades por **domínio** e **tipo** de artefato (componentes, páginas, hooks, serviços, estilos, testes, utilitários).

```bash
src/
  components/         # Componentes
    ui/               # Components base
  pages/              # Páginas do app e seus componentes locais
  hooks/              # Hooks reutilizáveis de lógica de estado/comportamento
  services/           # Integrações com APIs externas
    youtube/
    ticketmaster/
  styles/             # Estilos globais da aplicação
  tests/              # Infraestrutura de testes
    mocks/            # Handlers do MSW e outros mocks compartilhados
    setupTests.ts     # Configuração global dos testes
  utils/              # Funções puras e helpers de formatação/conversão
```

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (`v20.19.4` ou superior)
- npm (`v10.8.2` ou superior)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/fer-oshiro/intelipost.git
   cd intelipost
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

### Executando em Modo Desenvolvimento

```bash
npm run dev
```
