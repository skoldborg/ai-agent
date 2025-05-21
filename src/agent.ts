import { runLLM } from './llm'
import { addMessages, getMessages, saveToolResponse } from './memory'
import { runTool } from './toolRunner'
import { logMessage, showLoader } from './ui'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  // Add the user message to memory
  await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('🤔')

  while (true) {
    // Get message history from memory - including the user current message
    const history = await getMessages()
    // Run the LLM with the message history and tools
    const response = await runLLM({ messages: history, tools })

    // Add the LLM response to memory
    await addMessages([response])

    // Break loop if the response is a final answer
    if (response.content) {
      loader.stop()
      logMessage(response)

      // Add the final answer to memory
      return getMessages()
    }

    // If the response has tool calls, run the first one, loop until done
    if (response.tool_calls) {
      const toolCall = response.tool_calls[0]
      logMessage(response)
      loader.update(`executing: ${toolCall.function.name}`)

      const toolResponse = await runTool(toolCall, userMessage)
      await saveToolResponse(toolCall.id, toolResponse)
      loader.update(`done: ${toolCall.function.name}`)
    }
  }
}
