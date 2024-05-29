import { Hono } from "hono"
import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from "@prisma/adapter-d1"
import type { Env } from "../env"
const search = new Hono<{ Bindings: Env }>()

search.get("/:word", async (c) => {
  const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.CORECMS_DB) })
  const word = c.req.param("word")
  const number_of_articles = Number(c.req.query("num")) || 100
  const articles = await prisma.post.findMany({
    where: {
      title: {
        contains: word,
      },
    },
    select: {
      id: true,
      title: true,
      issueAt: true,
      openGraph: {
        select: { description: true, image: true },
      },
    },
    take: number_of_articles,
  })
  return c.json({
    retult: articles,
  })
})

search.get("/tags/:tag", async (c) => {
  const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.CORECMS_DB) })
  const word = c.req.param("tag")
  const number_of_articles = Number(c.req.query("num")) || 100
  const articles = await prisma.tag.findMany({
    where: {
      name: word,
    },
    select: {
      posts: {
        select: {
          id: true,
          title: true,
          issueAt: true,
          openGraph: {
            select: { description: true, image: true },
          },
        },
      },
    },
    take: number_of_articles,
  })

  return c.json({
    retult: articles,
  })
})

search.get("/categories/:category", async (c) => {
  const prisma = new PrismaClient({ adapter: new PrismaD1(c.env.CORECMS_DB) })
  const word = c.req.param("category")
  const number_of_articles = Number(c.req.query("num")) || 100
  const articles = await prisma.category.findMany({
    where: {
      name: word,
    },
    select: {
      posts: {
        select: {
          id: true,
          title: true,
          issueAt: true,
          openGraph: {
            select: { description: true, image: true },
          },
        },
      },
    },
    take: number_of_articles,
  })
  return c.json({
    retult: articles,
  })
})

export default search
