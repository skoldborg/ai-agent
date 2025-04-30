# AI Agent

This is a simple AI agent based on OpenAI for experimental purposes. 

The agent is conversational and has a memory (file based for now), meaning it can answer prompts and will remember your conversation.

## Setup

This repo requires **Node.js version 20+**.

```bash
npm install
```

## Running

```bash
npm start "A prompt for the agent"
```

## OpenAI API Key

Create an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys) and save it in a `.env` file:

```
OPENAI_API_KEY='YOUR_API_KEY'
```
