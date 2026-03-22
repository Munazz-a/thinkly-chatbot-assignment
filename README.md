# Placement Prep AI 🎯

An AI-powered chatbot designed to help students prepare for technical and HR interviews through structured answers, mock interviews, and actionable feedback.

---

## 🔍 Why I Built This

Interview preparation is often scattered across platforms — DSA practice, HR prep, resume feedback — all in different places.

I wanted to create a **focused, single-purpose AI assistant** that feels like a **personal interview coach**, not just a generic chatbot.

The goal was to:

* Provide **structured, high-quality answers**
* Simulate **real interview scenarios**
* Deliver a **clean, distraction-free user experience**

---

## ✨ Features

### 🧠 Smart Interview Coach

* Answers DSA, HR, DBMS, and interview-related questions
* Structured responses:

  * Explanation
  * Key Points
  * Example Answer
  * Final Tip

---

### 🎤 Mock Interview Mode

* Starts a realistic HR interview
* Asks **one question at a time**
* Evaluates user responses
* Provides:

  * Strengths
  * Weaknesses
  * Improved Answer
  * Next Question

---

### 💡 Follow-up Suggestions

* Every response includes **2 relevant follow-up questions**
* Encourages deeper learning and exploration

---

### 🎨 Thoughtful UI/UX

* ChatGPT-inspired layout
* Centered, focused conversation design
* Clear visual hierarchy
* Copy-to-clipboard for responses
* Smooth scrolling and loading states

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* FastAPI
* Groq API (LLM - LLaMA 3.1)

### Deployment

* Frontend → Vercel
* Backend → Render

---

## 🧩 Architecture

Frontend (React) → API calls → FastAPI backend → Groq LLM → Response

---

## ⚙️ Key Design Decisions

* **Prompt Engineering over RAG**
  Focused on controlling behaviour and response quality instead of adding unnecessary complexity.

* **Strict Response Structure**
  Ensures consistency and readability for interview preparation.

* **Minimal Dependencies**
  Avoided heavy ML pipelines for faster deployment and reliability.

---

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Site-ThinklyChatbot-blue?style=for-the-badge)](https://thinkly-chatbot-assignment.vercel.app/)

---

## 📂 Repository Structure

```
Client/        → React frontend  
AI-Services/   → FastAPI backend  
```

---

## 📌 Future Improvements

* Stateful mock interviews (track conversation context)
* Answer scoring system
* Personalised learning paths
* Resume-based question generation

---

## 🎥 Loom Walkthrough

👉 [Add your Loom link here]

---

## 🙌 Final Note

This project focuses on **experience over complexity** — designing an AI tool that feels purposeful, guided, and actually useful for interview preparation.


