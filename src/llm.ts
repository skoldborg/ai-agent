import type { AIMessage } from '../types'
import { openai } from './ai'

export const runLLM = async ({ messages }: { messages: AIMessage[] }) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1, // Lower temperature for more deterministic output - less crazy
    messages,
  })

  return response.choices[0].message.content
}
