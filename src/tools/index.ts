import { dadJokeToolDefinition } from './dadJoke'
import { generateImageToolDefinition } from './generateImage'
import { movieSearchToolDefinition } from './movieSearch'
import { redditToolDefinition } from './reddit'

export const tools = [
  generateImageToolDefinition,
  redditToolDefinition,
  dadJokeToolDefinition,
  movieSearchToolDefinition,
]
