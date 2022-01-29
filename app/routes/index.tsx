import { PrismaClient } from '@prisma/client'
import { json, LoaderFunction } from 'remix'

const prisma = new PrismaClient()

export let loader: LoaderFunction = async () => {
  let results = await prisma.todo.findMany()

  return json(results)
}

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <form>
        <label>
          New Todo
          <br />
          <input type="text" />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
