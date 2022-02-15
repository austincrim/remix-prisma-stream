import { Note } from '@prisma/client'
import { json, LoaderFunction, useLoaderData } from 'remix'
import { prisma } from '~/lib/prisma.server'

export let loader: LoaderFunction = async ({ params }) => {
  let id = params.id

  if (!id) throw new Error('must have a note id')

  let note = await prisma.note.findUnique({ where: { id: parseInt(id) } })

  return json(note)
}

export default function Post() {
  let note = useLoaderData<Note>()

  return (
    <>
      <a href="/">&larr; Go back</a>
      <main>
        <h1>{note.title}</h1>
        <article style={{ marginTop: '4rem' }}>{note.content}</article>
      </main>
    </>
  )
}
