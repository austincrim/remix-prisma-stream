import { Note } from '@prisma/client'
import { ActionFunction, json, LoaderFunction, useLoaderData } from 'remix'
import { prisma } from '~/lib/prisma.server'

export let loader: LoaderFunction = async () => {
  let results = await prisma.note.findMany()

  return json(results)
}

export let action: ActionFunction = async ({ request }) => {
  let form = await request.formData()
  let title = form.get('title')?.toString()
  let content = form.get('content')?.toString()

  if (!title) throw new Error('must provide title!')
  if (!content) throw new Error('must provide content!')

  let created = await prisma.note.create({
    data: {
      title: title,
      content: content
    }
  })

  return json(created, { status: 200 })
}

export default function Index() {
  let notes = useLoaderData<Note[]>()

  return (
    <>
      <main>
        <h1>Jot-A-Thought 🖋️</h1>
        <form method="POST" action="/?index">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required />
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" required></textarea>
          <button type="submit">Jot 🖋️</button>
        </form>
      </main>
      <ul className="note-list">
        {notes.map((p) => (
          <li className="note" key={p.id}>
            <article>
              <a href={`/note/${p.id}`}>{p.title}</a>
            </article>
          </li>
        ))}
      </ul>
    </>
  )
}
