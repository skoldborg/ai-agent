import { JSONFilePreset } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid'
import type { AIMessage } from '../types'

export type MessageWithMetaData = AIMessage & {
  id: string
  createdAt: string
}

type Data = {
  messages: MessageWithMetaData[]
}

export const addMetaData = (message: AIMessage): MessageWithMetaData => {
  return {
    ...message,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  }
}

export const removeMetaData = (message: MessageWithMetaData): AIMessage => {
  const { id, createdAt, ...rest } = message
  return rest
}

const defaultData: Data = { messages: [] }

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData)
  return db
}

export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetaData))
  await db.write()
}

export const getMessages = async () => {
  const db = await getDb()
  return db.data.messages.map(removeMetaData)
}
