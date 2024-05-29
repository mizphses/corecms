import { SignJWT, jwtVerify } from "jose"

type sessionPayload = {
  email: string
  uid: string
  jti: string
}

type refreshPayload = {
  email: string
  uid: string
  jti: string
}

export const createToken = async (payload: sessionPayload, secret: string) => {
  const jwt = new SignJWT(payload)
  const signKey = new TextEncoder().encode(secret)

  return jwt
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("https://corecmsadmin.mizphses.com")
    .setAudience("https://corecmsadmin.mizphses.com")
    .setExpirationTime("2h")
    .sign(signKey)
}

export const verifyToken = async (token: string, secret: string) => {
  const verifyKey = new TextEncoder().encode(secret)
  const { payload } = await jwtVerify(token, verifyKey, {
    algorithms: ["HS256"],
    issuer: "https://corecmsadmin.miz.cab",
    audience: "https://corecmsadmin.miz.cab",
  })

  return payload as sessionPayload
}

export const createRefreshToken = async (
  payload: refreshPayload,
  secret: string,
) => {
  const jwt = new SignJWT(payload)
  const signKey = new TextEncoder().encode(secret)

  return jwt
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("https://corecmsadmin.miz.cab")
    .setAudience("https://corecmsadmin.miz.cab")
    .setExpirationTime("7d")
    .sign(signKey)
}

export const verifyRefreshToken = async (token: string, secret: string) => {
  const verifyKey = new TextEncoder().encode(secret)
  const { payload } = await jwtVerify(token, verifyKey, {
    algorithms: ["HS256"],
    issuer: "https://corecmsadmin.miz.cab",
    audience: "https://corecmsadmin.miz.cab",
  })

  return payload as refreshPayload
}
