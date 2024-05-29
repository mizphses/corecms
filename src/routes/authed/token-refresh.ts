import { Hono } from "hono"
import { sha3_512 } from "js-sha3"
import { createId } from "@paralleldrive/cuid2"
import { PrismaD1 } from "@prisma/adapter-d1"
import { PrismaClient } from "@prisma/client"
import { createToken } from "../../scripts/jwt"
import type { Env } from "../../env"

const tokenRefresh = new Hono<{ Bindings: Env }>()

tokenRefresh.post("/", async (c) => {
  const adapter = new PrismaD1(c.env.CORECMS_DB)
  const prisma = new PrismaClient({ adapter })
  const { refreshToken } = await c.req.json()
  const token = await prisma.refreshTokens.findFirst({
    where: {
      token: refreshToken,
    },
  })
  if (!token || !token.validThru || token.validThru < new Date()) {
    return new Response("Invalid Refresh Token", { status: 401 })
  }
  const user = await prisma.user.findFirst({
    where: {
      id: token.userId,
    },
  })
  if (!user) {
    return new Response("Invalid User", { status: 401 })
  }
  const newToken = await prisma.sessionTokens.create({
    data: {
      userId: user.id,
      token: await createToken(
        { email: user.email, uid: user.id, jti: createId() },
        c.env.TOKEN_KEY,
      ),
      validThru: new Date(Date.now() + 1000 * 60 * 60 * 2),
    },
  })
  return c.json({ token: newToken.token })
})

export default tokenRefresh
