# Desafio Aarin — Testes E2E com Playwright

Projeto de testes end-to-end para a loja [lojaebac.ebaconline.art.br](http://lojaebac.ebaconline.art.br/), utilizando [Playwright](https://playwright.dev/) com TypeScript.

## Estrutura do projeto

```
tests/
├── e2e/
│   ├── cart.spec.ts       # Testes do carrinho
│   └── product.spec.ts    # Testes de produto
├── pages/
│   ├── cart/              # Page Object do carrinho
│   ├── header/            # Page Object do cabeçalho
│   ├── home/              # Page Object da home
│   └── product/           # Page Object do produto
└── utils/
    └── quantityUtils.ts   # Utilitários de quantidade
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Docker](https://www.docker.com/) (somente para o ambiente Docker)

---

## Ambiente local

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

### 4. Executar um arquivo de testes específico

```bash
# Apenas testes do carrinho
npm run test:cart

# Apenas testes de produto
npm run test:product
```

### 5. Executar um teste específico pelo nome

```bash
npx playwright test --grep "Adicionar produto ao carrinho"
```

### 6. Visualizar o relatório HTML após a execução

```bash
npm run test:report
```

### Scripts disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `npm test` | `playwright test` | Executa todos os testes |
| `npm run test:cart` | `playwright test tests/e2e/cart.spec.ts` | Executa apenas os testes do carrinho |
| `npm run test:product` | `playwright test tests/e2e/product.spec.ts` | Executa apenas os testes de produto |
| `npm run test:report` | `playwright show-report` | Abre o relatório HTML da última execução |

---

## Ambiente Docker

### 1. Construir a imagem

```bash
docker build -t desafio-aarin-tests .
```

### 2. Executar todos os testes

```bash
docker run --rm desafio-aarin-tests
```

### 3. Executar um arquivo de testes específico

```bash
# Apenas testes do carrinho
docker run --rm desafio-aarin-tests npx playwright test tests/e2e/cart.spec.ts

# Apenas testes de produto
docker run --rm desafio-aarin-tests npx playwright test tests/e2e/product.spec.ts
```

### 4. Executar um teste específico pelo nome

```bash
docker run --rm desafio-aarin-tests npx playwright test --grep "Adicionar produto ao carrinho"
```

### 5. Exportar o relatório HTML para a máquina local

```bash
docker run --rm -v $(pwd)/playwright-report:/app/playwright-report desafio-aarin-tests
npx playwright show-report playwright-report
```

---

## Suítes de teste disponíveis

| Suíte | Arquivo | Casos de teste |
|---|---|---|
| Produto | `tests/e2e/product.spec.ts` | Adicionar ao carrinho, quantidade 0, quantidade acima do estoque, sem tamanho, sem cor |
| Carrinho | `tests/e2e/cart.spec.ts` | Remover produto, zerar quantidade, quantidade acima do estoque, cupom inexistente, cupom vazio |
