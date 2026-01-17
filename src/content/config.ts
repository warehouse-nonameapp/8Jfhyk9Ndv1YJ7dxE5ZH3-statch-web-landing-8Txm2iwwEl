import { defineCollection, z } from 'astro:content';

const features = defineCollection({

    type: 'data',
    schema: z.array(z.object({
        id: z.string().optional(),
        title: z.string(),
        image: z.string(),
        orientation: z.enum(['left', 'right']),
        points: z.array(z.object({
            title: z.string(),
            subtitle: z.string()
        }))
    }))
});

const faq = defineCollection({
    type: 'data',
    schema: z.array(z.object({
        question: z.string(),
        answer: z.string()
    }))
});

export const collections = {
    features,
    faq,
};
