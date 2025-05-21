import { z } from 'zod'
import type { ToolFn } from '../../types'
import { queryMovies } from '../rag/query'

export const movieSearchToolDefinition = {
  name: 'movie_search',
  parameters: z.object({
    query: z.string().describe('a query used for vector search on movies'),
  }),
  description:
    'Use this tool to search for movies or answer questions about movies and their metadata, like score, rating, revenue, director, actors, and more.',
}

type Args = z.infer<typeof movieSearchToolDefinition.parameters>

export const movieSearchTool: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { query } = toolArgs
  let results
  try {
    results = await queryMovies(query)
  } catch (error) {
    console.error('Error in movie search:', error)
    // Allow the AI to handle the error gracefully
    return 'Error: Could not query the db to get movie data.'
  }

  const formattedResults = results.map((result) => {
    const { data, metadata } = result
    return { ...metadata, description: data }
  })

  // Return results formatted as JSON so the AI can parse it
  return JSON.stringify(formattedResults, null, 2)
}
