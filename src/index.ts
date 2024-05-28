import { Hono } from "hono"
import article from "./routes/article_client"
import search from "./routes/search_client"
import type { Env } from "./env"

const app = new Hono<{ Bindings: Env }>()

app.get("/", (c) =>
  c.json({
    message: "Hello, world!",
  }),
)

app.route("/article", article)
app.route("/search", search)

export default app
