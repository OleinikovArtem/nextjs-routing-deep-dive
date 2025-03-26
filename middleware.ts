import { NextRequest, NextResponse } from 'next/server'


export const config = {
  matcher: ['/news']
}

export function middleware(request: NextRequest) {
  // some instructions
  return NextResponse.next()
}
