# 🚛 FreteRun

Aplicativo mobile desenvolvido em **React Native com Expo**, especialmente para iPhone, que conecta **clientes e motoristas** para realização de fretes e mudanças de forma digital, segura e eficiente.

---

## 📱 Sobre o projeto

O FreteRun utiliza geolocalização, rastreamento em tempo real e pagamento integrado para oferecer uma experiência completa tanto para quem precisa de um frete quanto para quem realiza o serviço.

---

## 🖥️ Telas

### Tela 1 — Login
- Seleção de perfil: **Cliente** ou **Motorista**
- Formulário de e-mail e senha
- Link para cadastro

"./images/WhatsApp Image 2026-05-28 at 20.02.26.jpeg"
"./images/WhatsApp Image 2026-05-28 at 20.03.05.jpeg"

### Tela 2A — Dashboard do Cliente
- Seleção do tipo de frete (Mudança, Carga, Pequenos, Especial)
- Campos de origem e destino
- Botão para solicitar motorista
- Estatísticas rápidas
- Histórico de fretes

### Tela 2B — Dashboard do Motorista
- Toggle Online/Offline
- Resumo do dia (corridas, ganhos, avaliação, km)
- Lista de fretes disponíveis próximos
- Botões Aceitar e Recusar corridas

---

## 🚀 Como executar

### Via Expo Snack (mais fácil)
1. Acesse https://snack.expo.dev
2. Cole o conteúdo do `App.js`
3. Escaneie o QR Code com o Expo Go no iPhone

### Via VS Code
```bash
npm install
npx expo start --tunnel --clear
```

---

## 📋 Pré-requisitos

- Node.js (versão LTS)
- npm
- Expo Go instalado no iPhone (App Store)
- VS Code

---

## 🗂️ Estrutura do projeto

```
FreteRun/
├── App.js                          # Entrada e navegação
├── app.json                        # Config do Expo
├── package.json
├── babel.config.js
└── src/
    └── screens/
        ├── LoginScreen.js          # Tela de login
        ├── ClienteDashboard.js     # Dashboard do cliente
        └── MotoristaDashboard.js   # Dashboard do motorista
```

---

## 🎨 Design

- Tema escuro com fundo `#0A0F1E`
- Cor primária verde `#16A34A`
- Ícones via `@expo/vector-icons` (Ionicons)
- Navegação via `useState` sem dependências nativas

---

## 👨‍💻 Tecnologias

- React Native
- Expo SDK 54
- JavaScript
- @expo/vector-icons