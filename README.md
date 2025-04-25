# Simple Budget Tracker 💰

A minimalistic web app for tracking personal income and expenses.  

Add transactions, visualize spending by category, and stay on top of your budget — all in your browser.

Built with the power of **F#**, **Fable**, and **Elmish**.

👉 [Try it live](https://annapolovkova.github.io/simple-budget-tracker/)

---

## ✨ Motivation

As a university student living abroad, managing my budget can be challenging — especially with varying expenses, irregular income, and no clear way to track it all.  
I wanted a lightweight, privacy-friendly tool that helps me understand where my money goes — without complicated setups or third-party accounts.  

So I built **Simple Budget Tracker** — a focused, browser-based app to stay financially aware and make better spending decisions.

---

## Features

- ✅ Add, view, and manage **income** and **expenses**
- 📊 View **spending distribution** via a pie chart
- 💡 Live-updating **total balance**, color-coded:
  - 🟢 Green if positive
  - 🔴 Red if negative
- 💻 Clean and responsive UI
- ⚡ Single-page app with fast interactions

> ℹ️ To **add an expense**, enter a **negative amount** in the input field.  
> (For example: `-45` for groceries, `+100` for salary.)

---

## 🖼️ Screenshots

### 🖥️ Full Page  
![Full Page](screenshots/full-page.png)

---

### 📋 Transactions Table  
Quick overview of all your finances  
![Table Screenshot](screenshots/table.png)

---

### 📈 Expenses by Category  
Automatically updates with each transaction  
![Pie Chart](screenshots/chart.png)

---

### 💰 Total Balance Display  
Color-coded for easy overview  
![Balance Screenshot](screenshots/total-balance1.png)  
![Balance Screenshot](screenshots/total-balance2.png)

---

## 🛠️ Tech Stack

- **F#** – functional programming on .NET
- **Fable** – F# to JavaScript compiler
- **Elmish** – Elm architecture in F#
- **Feliz** – React bindings for F#
- **Bulma** – CSS framework for modern UI

---

## 📦 Getting Started

```bash
git clone https://github.com/your-username/simple-budget-tracker.git
cd simple-budget-tracker
npm install
npm start
