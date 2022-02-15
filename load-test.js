import http from 'k6/http'

import { sleep } from 'k6'

export default function () {
  http.post(
    'https://remix-prisma-stream.netlify.app/?index',
    { title: 'note', content: "i'm content!" },
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  )

  sleep(1)
}
