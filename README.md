# 🐵 MonkeySwap — Decentralized Exchange on Sui Testnet

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Built with Sui](https://img.shields.io/badge/Built%20on-Sui%20Testnet-blueviolet)](https://docs.sui.io/)
[![Live App](https://img.shields.io/badge/Live%20App-Open%20MonkeySwap-brightgreen)](https://bone-swap.vercel.app/)

**MonkeySwap** is a fast, gas-efficient, and non-custodial decentralized exchange (DEX) built on the **Sui Testnet Blockchain**. It allows users to swap tokens, manage liquidity, and interact with smart contracts in a seamless and user-friendly interface — all powered by the next-gen **Sui Move** language.

---

## 🌐 Live Demo

🔗 **Live App:** [https://bone-swap.vercel.app](https://bone-swap.vercel.app)  
📬 **Email Contact:** [happybiostockcode07040@gmail.com](mailto:happybiostockcode07040@gmail.com)  
👤 **Developer:** [Harpreet Singh on LinkedIn](https://www.linkedin.com/in/harpreet-singh-031528284/)
👤 **Developer:** [Omveer on Github](https://github.com/narukaz)

---

## 📖 Overview

MonkeySwap is a proof-of-concept DEX that showcases the power of **Move smart contracts** on the Sui blockchain. It is designed to be simple, secure, and extensible for developers while remaining intuitive for users.

### ✅ Core Capabilities:
- 🟢 Swap tokens across supported pairs
- 💧 Provide/remove liquidity to pools
- 🧠 Powered by on-chain Sui Move contracts
- 🪙 Live price and slippage estimates
- 🔐 Non-custodial wallet integration
- 🖱 Email copy with clipboard feedback
- 🏠 Redirect to home after a successful swap

---

## 🛠 Features

| Feature                    | Description                              |
| -------------------------- | ---------------------------------------- |
| 🔄 **Token Swapping**       | Swap between tokens using on-chain logic |
| 💧 **Liquidity Management** | Add or remove liquidity from token pools |
| 🔐 **Wallet Integration**   | Compatible with Sui Wallet and Ethos     |
| ⚡ **Fast UX**              | Auto-redirect and transaction feedback   |
| 📎 **Clipboard API**        | Copy support email with success toast    |
| 🎨 **Responsive UI**        | Built using TailwindCSS and Lucide icons |

---

## 🚀 Quick Start

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) >= v16
- [Sui Wallet Extension](https://chrome.google.com/webstore/detail/sui-wallet/)
- Git

### 🌀 Setup


git clone https://github.com/narukaz/Bone_swap.git
cd Bone_swap
npm install
npm run dev


Then open: `http://localhost:5173`

---

## 🔗 Connect Wallet (Testnet)

1. Install [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/)
2. Switch to **Testnet**
3. Connect via the MonkeySwap DApp interface

---

## 🧠 How It Works

1. **Connect Wallet** → The user links their Sui Wallet on testnet.
2. **Select Tokens** → Choose a token to swap from/to.
3. **Estimate Output** → Live preview of output and slippage.
4. **Execute Swap** → The transaction is generated and sent on-chain.
5. **Redirect Home** → On success, users are taken to the homepage with a status message.

---

## 🧱 Tech Stack

| Layer            | Stack                                             |
| ---------------- | ------------------------------------------------- |
| Frontend         | React, TailwindCSS, Vite                          |
| Blockchain       | [Sui](https://docs.sui.io/), Move smart contracts |
| Web3 Integration | `@mysten/sui.js`                                  |
| Wallet           | Sui Wallet, Ethos Wallet                          |
| UI/UX            | Lucide Icons, Toast Notifications                 |
| Deployment       | Vercel                                            |

---

## 🗂 Project Structure

```bash
monkeyswap/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # App-wide context (wallet, swap logic)
│   ├── pages/            # Route-level components (Home, Swap, etc.)
│   ├── utils/            # Helper and Sui-related utilities
│   └── main.jsx          # Entry point
├── move/                 # (Optional) Sui Move smart contracts
├── package.json
└── tailwind.config.js
```

---

## 🧪 Move Smart Contracts

The core swapping and liquidity logic is implemented in **Move**, a safe, resource-based programming language from Sui.

### Functionality Includes:

* ✅ Atomic swaps between Sui-based tokens
* 🧩 Pool creation and updates
* 📊 Real-time state updates for slippage and price

> 📌 Contract publishing details coming soon.

---

## 📸 UI Highlights *(Add screenshots if available)*

* Swap page with real-time feedback
* Liquidity dashboard
* Token selection modal
* Confirmation and error toasts

---

## 🙋‍♂️ About the Developer

**Harpreet Singh** is a blockchain developer exploring next-gen finance on new layer-1 platforms like Sui.
🔗 [LinkedIn Profile](https://www.linkedin.com/in/harpreet-singh-031528284/)
**Omveer**

---

## 📬 Contact & Feedback

* 📧 Email: `happybiostockcode07040@gmail.com`
* 💬 Click **Contact Us** in the footer to copy this address to clipboard.
* 💡 Open to feedback, suggestions, and collaborations!

---

## ✅ Contributing

We welcome community contributions!

1. Fork this repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## ⚖ License

This project is licensed under the [MIT License](LICENSE).

---

> © 2025 MonkeySwap – Built with ❤️ on Sui Testnet.

---
