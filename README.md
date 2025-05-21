# AI Agent

This is a simple AI agent based on OpenAI for experimenting with LLM's, system prompts, using tools, running evals, etc. 

The agent is conversational and has a file based memory, meaning it can answer prompts and will remember your conversation.

The agent has tools that allow it to:

* Generate images based on prompts
* Handle queries about movies and movie related data
* Scan the Gunners subreddit (this can be changed to any subreddit in `src/tools/reddit.ts`, just don't change it to Sp*rs or it'll blow up).
* Provide you with some high class dad jokes

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

If you're on Windows you need to do run explicitly run the file of the eval, eg:

```bash
npx tsx evals/experiments/reddit.eval.ts
```

## RAG

The movie search uses a vector DB on Upstash. I use it to experiment with RAG. 
It requires environment variables for a vector DB to function properly. 
Before running it the first time you need to generate the vector data by running:

```bash
npm run ingest
```

This will parse the `imdb_movie_dataset.csv` file in the RAG folder and add it to your DB. Now you can query for stuff about movies!

## OpenAI API Key

The agent requires an OpenAI API key to work. 

Create an [API Key from OpenAI](https://platform.openai.com/settings/organization/api-keys) and save it in a `.env` file:

```
OPENAI_API_KEY='YOUR_API_KEY'
```
