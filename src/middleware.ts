// middleware.ts

import { NextRequest, NextResponse } from 'next/server'
import { verify } from './utils/auth'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const valid = token && (await verify(token))

  const url = req.nextUrl.clone()

  if (!valid && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
}
