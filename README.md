# CinConecta - Gestão de Estoque para ONGs


## 📌 Sobre o Projeto  

O **CinConecta** é um sistema de gestão de estoque descomplicado, desenvolvido por alunos de Sistemas de Informação do CIN-UFPE. Criado para ajudar ONGs necessitadas, o projeto foi baseado em pesquisas de campo na cidade de Recife - PE.  

A plataforma é um **MVP funcional**, com backend e frontend totalmente integrados, e foi desenvolvida utilizando **React.js**, **Node.js** e **MongoDB**.  

## 🚀 Funcionalidades  

- **Login Seguro:** Acesso por credenciais do governo, com opção para armazenar email, nome da ONG e identificador.  
- **Dashboard de Análises:** Exibe entradas e saídas mensais de produtos e dinheiro, além de gráficos de itens por categoria.  
- **Gestão de Estoque:** Cadastro, edição e exclusão de itens com nome, descrição, quantidade, validade (se aplicável), código de barras e categoria.  
- **Histórico de Auditoria:** Registro completo de todas as ações do usuário, como adição/exclusão de itens e logins, com data e horário.  
- **Filtros Avançados:** Possibilidade de buscar movimentações no histórico por período e tipo de ação.  

## 🛠️ Tecnologias Utilizadas  

- **Frontend:** React.js  
- **Backend:** Node.js + Express  
- **Banco de Dados:** MongoDB  
- **Gerenciamento de Estado:** (Se usarem Redux, Context API, etc., podemos adicionar aqui)  
- **Estilização:** (Se usarem Tailwind, Material UI, etc., podemos adicionar aqui)  

## 📂 Estrutura do Projeto  

```plaintext
cinconecta/
│-- frontend/        # Código do React.js  
│-- backend/         # Código do Node.js + Express  
│-- docs/            # Documentação e arquivos auxiliares  
│-- README.md        # Este arquivo  
```  

## 🏗️ Como Rodar o Projeto  

### 🔧 Pré-requisitos  
Certifique-se de ter instalado:  
- Node.js  
- MongoDB  
- Gerenciador de pacotes (npm)
- .env do projeto  

### 📥 Clonando o Repositório  
```bash
git clone https://github.com/sillyveira/cinconecta.git  
cd cinconecta
git switch dev
```

### 🔨 Configuração do Backend  
```bash
cd backend  
npm install  
npx nodemon server.js  
```

### 🖥️ Configuração do Frontend  
```bash
cd frontend  
npm install  
npm run dev  
```  

Acesse **http://localhost:5173** no navegador.  

## 🤝 Contribuição  

Contribuições são bem-vindas! Se quiser sugerir melhorias ou corrigir bugs:  
1. Faça um fork do repositório  
2. Crie uma nova branch (`git checkout -b minha-mudanca`)  
3. Faça suas alterações e commit (`git commit -m "Descrição da mudança"`)  
4. Envie um PR  

## 📜 Licença  

Por enquanto estamos decidindo a licença.
