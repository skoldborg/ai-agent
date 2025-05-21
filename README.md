# AI Agent

This is a simple AI agent based on OpenAI for experimenting with LLM's, using tools, running evals, etc. 

The agent is conversational and has a file based memory, meaning it can answer prompts and will remember your conversation.

The agent has tools that allow it to generate images based on prompts, provide you with some high class dad jokes, or scan the Gunners subreddit (this can be changed to any subreddit in `src/tools/reddit.ts`, just don't change it to Sp*rs or it'll blow up).

## Setup

This repo requires **Node.js version 20+**.

```bash
npm install
```

## Running

```bash
npm start "Generate an image based on a dad joke"
```

## Running evals

```bash
npm run eval $evalName
```

## OpenAI API Key

The agent requires an OpenAI API key to work. 

Create an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys) and save it in a `.env` file:

```
OPENAI_API_KEY='YOUR_API_KEY'
```
