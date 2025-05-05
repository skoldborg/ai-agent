import { zodFunction } from 'openai/helpers/zod'
import type { AIMessage } from '../types'
import { openai } from './ai'
import { systemPrompt } from './systemPrompt'

export const runLLM = async ({
  messages,
  tools,
}: {
  messages: AIMessage[]
  tools: any[]
}) => {
  const formattedTools = tools.map(zodFunction)

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1, // Lower temperature for more deterministic output - less crazy
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    tools: formattedTools,
    tool_choice: 'auto', // Automatically choose the best tool for the job
    parallel_tool_calls: false, // Don't run tools in parallel
  })

  return response.choices[0].message
}
