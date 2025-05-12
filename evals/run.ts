import 'dotenv/config'
import { readdir } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const main = async () => {
  const evalName = process.argv[2]
  const experimentsDir = join(__dirname, 'experiments')

  try {
    if (evalName) {
      const evalPath = join(experimentsDir, `${evalName}.eval.ts`)
      await import(evalPath)
    } else {
      const files = await readdir(experimentsDir)
      const evalFiles = files.filter((file) => file.endsWith('.eval.ts'))

      for (const evalFile of evalFiles) {
        const evalPath = join(experimentsDir, evalFile)
        await import(evalPath)
      }
    }
  } catch (error) {
    console.error(
      `Failed to run eval${evalName ? ` '${evalName}'` : 's'}:`,
      error
    )
    process.exit(1)
  }
}

main()
