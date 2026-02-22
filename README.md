
  # 🔥 Roaster – AI-Powered Personalized Roast Engine

## Overview
Roaster is a backend-driven AI application that analyzes user data from Spotify, YouTube, and Chess.com to generate contextual humorous insights using a locally hosted LLM.

The system integrates multiple third-party APIs and performs structured data processing before generating AI responses.

---

## Tech Stack
- Node.js (Backend Service)
- Ollama (Local LLM Inference)
- REST APIs (Spotify, YouTube, Chess.com)
- JSON Data Processing

---

## Architecture
Client → Node.js Backend → API Data Fetching → Data Processing → Ollama LLM → Generated Response

---

## Features
- Multi-source API integration
- Structured JSON data transformation
- Prompt-engineered AI output
- Local LLM deployment (no external AI API dependency)

---

## Setup
1. Install Node.js
2. Install Ollama and download required model
3. Configure environment variables
4. Run backend server
5. Send request to generate roast

---

## Future Improvements
- Rate limiting & authentication
- Response caching
- Model optimization

 

## Running the code

 Run `npm i` to install the dependencies.

 Run `npm run dev` to start the development server.
  
