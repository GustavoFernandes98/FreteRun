# 🚛 FreteRun

Aplicativo mobile desenvolvido em **React Native com Expo**, especialmente para iPhone, que conecta **clientes e motoristas** para realização de fretes e mudanças de forma digital, segura e eficiente.

---

## 📸 Telas do aplicativo

### Tela 1 — Tela de login
![Tela de Login](./assets/images/tela-login.jpg/)

### Tela 2 — Dashboard do Cliente
![Dashboard do Cliente](./assets/images/tela-cliente-dashboard.png)

### Tela 3 — Chat com Motorista
![Chat com Motorista](./assets/images/tela-chat.png)

---

## ✨ Funcionalidades

### 👤 Login
- Seleção de perfil: **Cliente** ou **Motorista**
- Banco de dados local com 5 usuários
- Chips de atalho para preencher automaticamente
- Validação de e-mail, senha e perfil
- Mensagem de erro amigável

### 📦 Dashboard do Cliente
- Seleção do tipo de frete (Mudança, Carga, Pequenos, Especial)
- Cálculo de valor estimado por tipo de frete
- Campos de origem e destino
- Chat com o motorista
- Histórico de fretes

### 🚛 Tela — Acompanhar Frete
- Rastreamento em tempo real simulado (6 etapas)
- Barra de progresso por etapa
- Card do motorista com nome, veículo, placa e avaliação
- Mapa simulado
- Cancelar frete e avaliar motorista com estrelas

### 🚛 Dashboard do Motorista
- Toggle Online/Offline
- Resumo do dia (corridas, ganhos, avaliação, km)
- Detalhes completos de cada corrida
- Chat com o cliente
- Histórico de ganhos com meta do dia
- Abas: Fretes disponíveis / Ganhos do dia

---

## 👥 Usuários de teste

| Nome | E-mail | Perfil | Senha |
|---|---|---|---|
| João Silva | joao@email.com | Cliente | 123456 |
| Maria Oliveira | maria@email.com | Cliente | 123456 |
| Ana Costa | ana@email.com | Cliente | 123456 |
| Carlos Santos | carlos@email.com | Motorista | 123456 |
| Pedro Alves | pedro@email.com | Motorista | 123456 |

---

## 🚀 Como executar

### Via Expo Snack
1. Acesse https://snack.expo.dev
2. Cole o conteúdo do `App.js`
3. Escaneie o QR Code com o **Expo Go** no iPhone

### Via VS Code
```bash
npm install
npx expo start --tunnel --clear
```

---

## 🗂️ Estrutura do projeto

```
freterun/
├── App.js                          # Código principal
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── eslint.config.js
├── README.md
├── .gitignore
├── assets/
│   └── images/
│       ├── tela-cliente-dashboard.png
│       └── tela-chat.png
├── app/
├── components/
├── constants/
├── hooks/
├── pages/
├── routes/
└── scripts/
```

---

## 🎨 Design

- Tema escuro com fundo `#0A0F1E`
- Cor primária verde `#16A34A`
- Ícones via `@expo/vector-icons` (Ionicons)
- Navegação via `useState`

---

## 👨‍💻 Tecnologias

- React Native
- Expo SDK 54
- TypeScript / JavaScript
- @expo/vector-icons
