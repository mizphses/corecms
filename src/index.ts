import { Hono } from "hono"
import type { Context, Next } from "hono"
import { cors } from "hono/cors"
import { jwt } from "hono/jwt"

import type { Env } from "./env"
import authed from "./routes/authed"
import article from "./routes/article"
import users from "./routes/users"
import search from "./routes/search"
import { PrismaD1 } from "@prisma/adapter-d1"
import { PrismaClient } from "@prisma/client/extension"

const app = new Hono<{ Bindings: Env }>()

app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
)

app.use(
  "/authed/*",
  async (
    c: Context<{
      Bindings: Env
    }>,
    next: Next,
  ) => jwt({ secret: c.env.TOKEN_KEY })(c, next),
)

app.get("/", (c) =>
  c.json({
    message: "Hello, world!",
  }),
)

app.route("/article", article)
app.route("/search", search)
app.route("/users", users)
app.route("/authed", authed)

export default app
