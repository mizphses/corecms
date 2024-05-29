import { Hono } from "hono"
import type { Context, Next } from "hono"
import type { Env } from "../../env"
import { PrismaD1 } from "@prisma/adapter-d1"
import { PrismaClient } from "@prisma/client/extension"
import tokenRefresh from "./token-refresh"

const authed = new Hono<{ Bindings: Env }>()

authed.get("/", (c) =>
  c.json({
    message: "Hello, world!",
  }),
)

authed.get("/", (c) =>
  c.json({
    message: "Hello, world!",
  }),
)

authed.route("/refresh", tokenRefresh)

export default authed
