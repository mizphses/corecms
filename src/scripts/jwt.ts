import { SignJWT, jwtVerify } from "jose"

type payload = {
  email: string
}

export const createToken = async (payload: payload, secret: string) => {
  const jwt = new SignJWT(payload)
  const signKey = new TextEncoder().encode(secret)

  return jwt
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("https://planet.mizphses.com")
    .setAudience("https://planet.mizphses.com")
    .setExpirationTime("2h")
    .sign(signKey)
}

export const verifyToken = async (token: string, secret: string) => {
  const verifyKey = new TextEncoder().encode(secret)
  const { payload } = await jwtVerify(token, verifyKey, {
    algorithms: ["HS256"],
    issuer: "https://planet.mizphses.com",
    audience: "https://planet.mizphses.com",
  })

  return payload as payload
}

export const createRefreshToken = async (payload: payload, secret: string) => {
  const jwt = new SignJWT(payload)
  const signKey = new TextEncoder().encode(secret)

  return jwt
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("https://planet.mizphses.com")
    .setAudience("https://planet.mizphses.com")
    .setExpirationTime("7d")
    .sign(signKey)
}

export const verifyRefreshToken = async (token: string, secret: string) => {
  const verifyKey = new TextEncoder().encode(secret)
  const { payload } = await jwtVerify(token, verifyKey, {
    algorithms: ["HS256"],
    issuer: "https://planet.mizphses.com",
    audience: "https://planet.mizphses.com",
  })

  return payload
}
