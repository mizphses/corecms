import { Hono } from "hono"
import { sha3_512 } from "js-sha3"
import { createId } from "@paralleldrive/cuid2"
import { PrismaD1 } from "@prisma/adapter-d1"
import { PrismaClient } from "@prisma/client"
import {
  createRefreshToken,
  createToken,
  verifyRefreshToken,
} from "../scripts/jwt"
import type { Env } from "../env"

const users = new Hono<{ Bindings: Env }>()

users.post("/new", async (c) => {
  const adapter = new PrismaD1(c.env.CORECMS_DB)
  const prisma = new PrismaClient({ adapter })

  const { email, password, name } = await c.req.json()
  const user = await prisma.user.create({
    data: {
      email,
      password: sha3_512(password + c.env.SALT),
      name,
    },
  })
  if (!user) {
    return new Response("Failed to create user", { status: 500 })
  }
  return c.json({ email: user.email })
})

users.post("/login", async (c) => {
  const adapter = new PrismaD1(c.env.CORECMS_DB)
  const prisma = new PrismaClient({ adapter })
  const { email, password } = await c.req.json()
  const user = await prisma.user.findFirst({
    where: {
      email,
      password: sha3_512(password + c.env.SALT),
    },
  })
  if (!user) {
    return new Response("Invalid Login Credentials", { status: 401 })
  }

  const token = await prisma.sessionTokens.create({
    data: {
      userId: user.id,
      token: await createToken(
        { email: user.email, uid: user.id, jti: createId() },
        c.env.TOKEN_KEY,
      ),
      validThru: new Date(Date.now() + 1000 * 60 * 60 * 2),
    },
  })
  const refreshToken = await prisma.refreshTokens.create({
    data: {
      userId: user.id,
      token: await createRefreshToken(
        { email: user.email, uid: user.id, jti: token.token },
        c.env.TOKEN_KEY,
      ),
      validThru: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  })
  const content = {
    token: token.token,
    refreshToken: refreshToken.token,
  }
  return c.json(content)
})

export default users
