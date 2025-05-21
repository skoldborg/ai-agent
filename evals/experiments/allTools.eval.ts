import 'dotenv/config'

import { runLLM } from '../../src/llm'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
import { redditToolDefinition } from '../../src/tools/reddit'
import { runEval } from '../evalTools'
import { ToolCallMatch } from '../scorers'

const createToolCallMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: {
        name: toolName,
        arguments: {},
      },
    },
  ],
})

const allTools = [
  redditToolDefinition,
  dadJokeToolDefinition,
  generateImageToolDefinition,
]

runEval('allTools', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: allTools,
    }),
  data: [
    {
      input: `tell me a dad joke`,
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    {
      input: `generate an image of a sunset`,
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: `what is the most upvoted post on reddit`,
      expected: createToolCallMessage(redditToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
