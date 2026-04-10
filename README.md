# 🧪 Desafio Aarin — Testes E2E com Playwright

Automação E2E do fluxo de compra da **EBAC Shop**, utilizando **Playwright + TypeScript**.

🔗 Aplicação: http://lojaebac.ebaconline.art.br/

---
## 📁 Estrutura do projeto
```bash
tests/
├── e2e/
│   ├── cart.spec.ts
│   └── product.spec.ts
│
├── pages/
│   ├── cart/
│   ├── header/
│   ├── home/
│   └── product/
```

> Estrutura baseada em **Page Object Model (POM)** com separação entre ações e seletores.
---

## ⚙️ Pré-requisitos

- Node.js 18+
- Docker (opcional)
---

## 💻 Execução local
```bash
npm ci
npx playwright install chromium
npm test
```
### Executar suíte específica
```bash
npm run test:cart
npm run test:product
```
### Executar teste por nome
```bash
npx playwright test --grep "Adicionar produto ao carrinho"
```
### Relatório
```bash
npm run test:report
```
---
## 🐳 Docker
```bash
docker build -t desafio-aarin-tests .
docker run --rm desafio-aarin-tests
```
---

## 📋 Fluxo automatizado
- Acesso à página inicial
- Seleção de produto
- Adição ao carrinho
- Alteração de quantidade
- Checkout 
---
![Evidencia](https://github.com/anaffaria/desafio-aarin/main/report.png)

## 📋 Cenários de teste

🔗 [Documentação no Notion](https://nebula-drain-ec6.notion.site/Cen-rios-de-teste-4cc8dcd083678397be9801a8180bf5ef)

![Cenários de Teste](https://github.com/anaffaria/desafio-aarin/main/cenario.png)
