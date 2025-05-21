import 'dotenv/config'

import { runLLM } from '../../src/llm'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'
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

runEval('dadJoke', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [dadJokeToolDefinition],
    }),
  data: [
    {
      input: `tell me a dad joke`,
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
