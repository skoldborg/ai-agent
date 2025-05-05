import type OpenAI from 'openai'
import { dadJokeTool, dadJokeToolDefinition } from './tools/dadJoke'
import {
  generateImageTool,
  generateImageToolDefinition,
} from './tools/generateImage'
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

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`
  }
}
