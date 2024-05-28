import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from "@prisma/adapter-d1"
import type { Env } from "../env"

const article = new Hono<{ Bindings: Env }>()

article.get("/", (c) => {
  const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.CORECMS_DB) })
  const articles = prisma.post.findMany({
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
      id: Number.parseInt(id),
    },
  })
  const tags = prisma.tag.findMany({
    where: {
      postId: Number.parseInt(id),
    },
  })
  const categories = prisma.category.findMany({
    where: {
      postId: Number.parseInt(id),
    },
  })
  return c.json({
    id: article.id,
    title: article.title,
    content: article.content,
    author: {
      id: article.author.id,
      name: article.author.name,
    },
    tags: tags.map(
      (tag: {
        id: string
        name: string
      }) => ({
        id: tag.id,
        name: tag.name,
      }),
    ),
    categories: categories.map(
      (category: {
        id: string
        name: string
      }) => ({
        id: category.id,
        name: category.name,
      }),
    ),
    issueAt: article.issueAt,
    updated_at: article.updatedAt,
    openGraph: {
      title: article.openGraph.title,
      description: article.openGraph.description,
      image: article.openGraph.image,
      twitterType: article.openGraph.twitterType,
    },
  })
})

export default article
