import { Index as UpstashIndex } from '@upstash/vector'

// Initialize Upstash Vector client
const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})

type MovieMetadata = {
  title?: string
  year?: number
  genre?: string
  director?: string
  actors?: string
  rating?: number
  votes?: number
  revenue?: number
  metascore?: number
}

export const queryMovies = async (
  query: string,
  filters?: Partial<MovieMetadata>,
  topK: number = 5
) => {
  let filterStr = ''

  if (filters) {
    const filterParts = Object.entries(filters)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${JSON.stringify(value)}`)

    if (filterParts.length > 0) {
      filterStr = filterParts.join(' AND ')
    }
  }

  // Query the vector store
  const results = await index.query({
    data: query,
    topK,
    filter: filterStr || undefined,
    includeMetadata: true,
    includeData: true,
  })

  return results
}
