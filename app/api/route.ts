import { NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  console.log('request', request)
  // return Response.json()
  return new Response('Hello, Next.js!')
}
