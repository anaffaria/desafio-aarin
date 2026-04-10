# Desafio Aarin — Testes E2E com Playwright
# 1. O Desafio

Você deverá avaliar e automatizar parte do fluxo de compra da aplicação **EBAC Shop**.

- **URL da Aplicação:** http://lojaebac.ebaconline.art.br/
- **Contexto:** Jornada de compra padrão (navegação, seleção, carrinho e checkout).

## Fluxo Obrigatório para Automação

1. Acessar a página inicial.
2. Escolher um produto da vitrine.
3. Adicionar o produto ao carrinho.
4. Acessar a tela de carrinho.
5. Alterar a quantidade do item no carrinho.
6. Seguir para a etapa de checkout.
7. Finalizar o fluxo até onde for tecnicamente possível no ambiente.

# 🧪 Automação de Testes - EBAC Shop

Projeto de automação de testes E2E desenvolvido com **Playwright + TypeScript**, cobrindo os principais fluxos da jornada de compra da aplicação **EBAC Shop**.

---

## 📁 Estrutura do Projeto
```bash
tests/
├── e2e/
│   ├── cart.spec.ts               # Testes do carrinho
│   └── product.spec.ts            # Testes de produto
│
├── pages/
│   ├── cart/
│   │   ├── cart.page.ts           # Ações e métodos da página
│   │   └── cart.elements.ts       # Seletores do carrinho
│   │
│   ├── header/
│   │   ├── header.page.ts         # Ações do cabeçalho
│   │   └── header.elements.ts     # Seletores do cabeçalho
│   │
│   ├── home/
│   │   ├── home.page.ts           # Ações da home 
│   │   └── home.elements.ts       # Seletores da home 
│   │
│   └── product/
│       ├── product.page.ts        # Ações de produto
│       └── product.elements.ts    # Seletores do carrinho
```

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) **v18 ou superior**
- [Docker](https://www.docker.com/) *(opcional, para execução em container)*

---

## 💻 Execução em Ambiente Local

### 1. Instalar dependências

```bash
npm ci
```

### 2. Instalar os navegadores do Playwright

```bash
npx playwright install chromium
```

### 3. Executar todos os testes

```bash
npm test
```

### 4. Executar uma suíte específica

```bash
# Testes do carrinho
npm run test:cart

# Testes de produto
npm run test:product
```

### 5. Executar um teste específico pelo nome

```bash
npx playwright test --grep "Adicionar produto ao carrinho"
```

### 6. Visualizar relatório HTML

```bash
npm run test:report
```

---

## 📜 Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm test` | Executa todos os testes |
| `npm run test:cart` | Executa apenas os testes do carrinho |
| `npm run test:product` | Executa apenas os testes de produto |
| `npm run test:report` | Abre o relatório HTML da última execução |

---

## 🐳 Execução com Docker

### 1. Construir a imagem

```bash
docker build -t desafio-aarin-tests .
```

### 2. Executar todos os testes

```bash
docker run --rm desafio-aarin-tests
```

### 3. Executar uma suíte específica

```bash
# Testes do carrinho
docker run --rm desafio-aarin-tests npx playwright test tests/e2e/cart.spec.ts

# Testes de produto
docker run --rm desafio-aarin-tests npx playwright test tests/e2e/product.spec.ts
```

### 4. Executar um teste específico pelo nome

```bash
docker run --rm desafio-aarin-tests npx playwright test --grep "Adicionar produto ao carrinho"
```

### 5. Exportar relatório HTML para máquina local

```bash
docker run --rm -v $(pwd)/playwright-report:/app/playwright-report desafio-aarin-tests
npx playwright show-report playwright-report
```

---
