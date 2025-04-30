import 'dotenv/config'
import { z } from 'zod'
import { runAgent } from './src/agent'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weatherTool = {
  name: 'get_weather',
  parameters: z.object({}),
}

const response = await runAgent({ userMessage, tools: [weatherTool] })

console.log(response)
