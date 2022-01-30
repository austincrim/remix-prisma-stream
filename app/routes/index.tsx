import { prisma, PrismaClient, Todo } from '@prisma/client'
import { ActionFunction, json, LoaderFunction, useLoaderData } from 'remix'

export let loader: LoaderFunction = async () => {
  const prisma = new PrismaClient()
  let results = await prisma.todo.findMany()

  return json(results)
}

export let action: ActionFunction = async ({ request }) => {
  const prisma = new PrismaClient()
  let title = (await request.formData()).get('title')?.toString()

  await prisma.todo.create({
    data: {
      title,
      completed: false
    }
  })

  return json(null, { status: 200 })
}

export default function Index() {
  let todos = useLoaderData<Todo[]>()
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <form method="POST" action="/?index">
        <label>
          New Todo
          <br />
          <input name="title" type="text" required />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  )
}
