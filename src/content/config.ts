import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    author: z.string(),
    image: z.string().optional(),
    excerpt: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};