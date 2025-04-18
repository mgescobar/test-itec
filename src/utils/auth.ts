import { SignJWT, jwtVerify, JWTPayload } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret_key_123')

export async function sign(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(secret)
}

export async function verify(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}
