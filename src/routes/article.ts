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
      openGraph: {
        select: { description: true, image: true },
      },
    },
    where: {
      approved: true,
      issueAt: {
        lte: new Date(),
      },
    },
  })
  return c.json(articles)
})

article.get("/:id", (c) => {
  const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.CORECMS_DB) })
  const id = c.req.param("id")
  const article = prisma.post.findUnique({
    select: {
      id: true,
      title: true,
      issueAt: true,
      updatedAt: true,
      content: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      openGraph: {
        select: {
          title: true,
          description: true,
          image: true,
          twitterImgType: true,
        },
      },
    },
    where: {
      id: id,
    },
  })
  return c.json(article)
})

export default article
