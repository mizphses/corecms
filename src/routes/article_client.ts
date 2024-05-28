import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from "@prisma/adapter-d1"
import type { Env } from "../env"

const article = new Hono<{ Bindings: Env }>()

article.get("/", async (c) => {
  const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.CORECMS_DB) })
  const articles = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      issueAt: true,
    },
  })
  return c.json(articles)
})

article.get("/:id", (c) => {
  const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.CORECMS_DB) })
  const id = c.req.param("id")
  const article = prisma.post.findUnique({
    where: {
      id: id,
    },
  })
  return c.json(article)
})

export default article
