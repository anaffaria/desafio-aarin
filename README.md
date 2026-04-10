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
  
![Evidencia](https://github.com/anaffaria/desafio-aarin/blob/main/report.png)
---
## 📋 Cenários de teste 🔗 [Documentação no Notion](https://nebula-drain-ec6.notion.site/Cen-rios-de-teste-4cc8dcd083678397be9801a8180bf5ef)
![Cenários de Teste](https://github.com/anaffaria/desafio-aarin/blob/main/cenario.png)
---
## 💻 Desafio investigativo
### Cenário
Às vezes, o cliente realiza o pagamento com sucesso, porém o pedido não aparece na tela de **“Meus Pedidos”**.

### Primeira ação
Eu pegaria o id do pedido e pediria para um dev auxilio (ou usaria um SGBD / API interna de consulta, se eu tivesse acesso) para ver se esse pedido no banco de dados existe. 
Por quê?
Preciso saber se o pedido está registrado. Se o pedido está no banco de dados, mas não aparece no site, o problema pode ser no Frontend (exibição). Se o pedido nem existe no banco, o problema pode ter sido em algum momento na integração (o sistema não recebeu o aviso de pagamento). 

### Hipotese
Eu suspeitaria que o problema esteja na conversa entre o banco de dados e o gateway de pagamento.
Por quê?
Muitas vezes, o cliente paga, mas o aviso do gateway enviado de volta para o site falha ou fica preso em uma fila. Como resultado, o banco de dados da aplicação não é atualizado e o pedido não muda de status para o usuário final mesmo o pedido sendo pago. 

### Ações para confirmação
1. Acessaria a ferramenta de logs filtraria por erros 500 ou 400 no horário exato em que o cliente tentou finaliza a compra.
  
2. Apoio do Time - Levaria o ID da transação aos devs e perguntaria: "Recebemos o Webhook desse pagamento? Ele deu algum erro de validação ao tentar criar o pedido no banco?"
   
3. Apoio do Time de Produto - Questionaria se existe alguma regra de negócio nova (ex: pedidos só aparecem na tela após a emissão da Nota Fiscal ou após a aprovação de uma análise de fraude externa, ou só aparece ao ter um status espeficico.

