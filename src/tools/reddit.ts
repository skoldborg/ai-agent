import fetch from 'node-fetch'
import { z } from 'zod'
import type { ToolFn } from '../../types'

export const redditToolDefinition = {
  name: 'reddit',
  parameters: z.object({}),
  description: `use this to get posts from reddit.`,
}

type Args = z.infer<typeof redditToolDefinition.parameters>

export const redditTool: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { data } = await fetch('https://www.reddit.com/r/Gunners/.json', {
    headers: { Accept: 'application/json' },
  }).then((res) => res.json())

  const relevantInfo = data.children.map((post: any) => ({
    title: post.data.title,
    url: post.data.url,
    subreddit: post.data.subreddit_name_prefixed,
    author: post.data.author,
    upvotes: post.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}
