import type OpenAI from 'openai'
import { dadJokeTool, dadJokeToolDefinition } from './tools/dadJoke'
import {
  generateImageTool,
  generateImageToolDefinition,
} from './tools/generateImage'
import { movieSearchTool, movieSearchToolDefinition } from './tools/movieSearch'
import { redditTool, redditToolDefinition } from './tools/reddit'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case redditToolDefinition.name:
      return redditTool(input)

    case dadJokeToolDefinition.name:
      return dadJokeTool(input)

    case generateImageToolDefinition.name:
      return generateImageTool(input)

    case movieSearchToolDefinition.name:
      return movieSearchTool(input)

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`
  }
}
