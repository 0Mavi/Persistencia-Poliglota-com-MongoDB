# 📌 Persistência Poliglota com MongoDB e SQLite

Este projeto foi desenvolvido como trabalho acadêmico, demonstrando o uso de **persistência poliglota** em aplicações web.  
Ele integra **SQLite** e **MongoDB**, utilizando um backend em **Node.js/Express** e um frontend em **React** com **React-Leaflet** para exibição de mapas interativos.

---

## 🚀 Tecnologias Utilizadas
### Backend
- **Node.js** + **Express**
- **SQLite** (armazenamento de cidades)
- **MongoDB / MongoDB Atlas** (armazenamento de locais)
- **Axios** para consumo de APIs externas
- **Geolib** para cálculos geográficos

### Frontend
- **React + Vite**
- **React Router DOM** (navegação entre páginas)
- **Tailwind CSS** + **DaisyUI** (design moderno)
- **Lucide React** (ícones)
- **React Leaflet** (mapas interativos)

---

## 📂 Estrutura do Projeto
```
/projeto
│
├── backend/                  # API Node.js + Express
│   ├── data/                 # base de dados SQLite
│   │   └── cidades.db
│   ├── src/
│   │   ├── index.js          # ponto de entrada do servidor
│   │   ├── routes/           # rotas de cidades, locais e geolocalização
│   │   │   ├── cidades.js
│   │   │   ├── locais.js
│   │   │   └── geo.js
│   │   ├── db_sqlite.js      # configuração do SQLite
│   │   ├── db_mongo.js       # conexão com MongoDB
│   │   └── models/           # schemas do MongoDB
│   ├── .env                  # variáveis de ambiente
│   └── package.json
│
├── frontend/                 # Interface em React
│   ├── public/
│   ├── src/
│   │   ├── assets/           # ícones/imagens
│   │   ├── pages/            # telas principais
│   │   │   ├── Home.jsx
│   │   │   ├── CadastroCidade.jsx
│   │   │   ├── CadastroLocal.jsx
│   │   │   └── Consulta.jsx
│   │   ├── App.jsx           # configuração das rotas
│   │   ├── main.jsx          # ponto de entrada do React
│   │   └── index.css         # estilos globais
│   ├── index.html
│   └── package.json
│
├── package.json              # scripts para rodar backend + frontend juntos
├── README.md                 # documentação do projeto
└── .gitignore

```

---

## ⚙️ Configuração do Ambiente

### 🔹 Pré-requisitos
- [Node.js](https://nodejs.org/) (>= 18.x)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- **MongoDB**
  - Local: instale [MongoDB Community](https://www.mongodb.com/try/download/community)  
  - Ou use o **MongoDB Atlas** (recomendado para praticidade)  
- **SQLite** (já embutido, não precisa instalar cliente separado)

---

### 🔹 Configuração do Backend
1. Acesse a pasta do backend:
   ```bash
   cd backend
   npm install
   ```

2. Crie um arquivo `.env` com:
   ```env
   PORT=4000
   # Se for usar MongoDB local:
   MONGO_URI=mongodb://127.0.0.1:27017/poliglota

   # Se for usar MongoDB Atlas (via site), use sua URL:
   # MONGO_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@SEU_CLUSTER.mongodb.net/poliglota?retryWrites=true&w=majority

   SQLITE_PATH=./db/database.sqlite
   ```

   ⚠️ Se usar Atlas:
   - Libere o acesso do seu IP ou `0.0.0.0/0` no painel de **Network Access**.  
   - Se sua senha tiver caracteres especiais (`@`, `#`, `!`, etc.), use **escape**.  
     Exemplo: `Meu@123` → `Meu%40123`.

3. Rode o servidor:
   ```bash
   npm run dev
   ```
   O backend estará disponível em `http://localhost:4000`.

---

### 🔹 Configuração do Frontend
1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   npm install
   ```

2. Crie um arquivo `.env`:
   ```env
   VITE_API_URL=http://localhost:4000
   ```

3. Rode a aplicação:
   ```bash
   npm run dev
   ```
   O frontend abrirá em `http://localhost:5173`.

---

## 📌 Funcionalidades

### ✅ Cidades (SQLite)
- **Cadastrar cidade** (`nome`, `estado`)
- **Listar cidades cadastradas**

### ✅ Locais (MongoDB)
- **Cadastrar local** (`nome_local`, `cidade`, `descricao`)
- **Coordenadas automáticas** via [Nominatim OpenStreetMap](https://nominatim.org)
- **Listar locais cadastrados**
- **Filtrar locais por cidade**
- **Zoom automático** no mapa para cidade selecionada

### ✅ Frontend
- **Home** com atalhos para todas as funcionalidades
- **Cadastro de Cidade** em card estilizado (DaisyUI)
- **Cadastro de Local** com busca automática de coordenadas
- **Consulta** com:
  - Lista de cidades cadastradas em um `select`
  - Mapa interativo (React-Leaflet)
  - Marcadores para cada local
  - Zoom automático para a cidade selecionada

---

## 🛠️ Scripts úteis
- Rodar apenas backend:
  ```bash
  cd backend
  npm run dev
  ```
- Rodar apenas frontend:
  ```bash
  cd frontend
  npm run dev
  ```

---

## 👩‍💻 Grupo
- Maria Vitória Berto de Souza
- Pedro Henrique Figueiredo Firmino
