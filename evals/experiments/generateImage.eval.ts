import { runLLM } from '../../src/llm'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
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

runEval('generateImage', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [generateImageToolDefinition],
    }),
  data: [
    {
      input: `generate an image of a sunset`,
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
