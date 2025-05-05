import { z } from 'zod'
import type { ToolFn } from '../../types'
import { openai } from '../ai'

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z.object({
    prompt: z.string().describe('The prompt to generate an image from.'),
  }),
  description: `use this to generate an image from a prompt.`,
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImageTool: ToolFn<Args, string> = async ({ toolArgs }) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    n: 1, // how many images to generate
    size: '512x512', // size of the image
  })

  return response.data[0].url!
}
