import { defineCollection, z } from 'astro:content';

const features = defineCollection({

    type: 'data',
    schema: z.array(z.object({
        id: z.string().optional(),
        title: z.string(),
        title_uk: z.string().optional(),
        title_en: z.string().optional(),
        image: z.string(),
        orientation: z.enum(['left', 'right']),
        points: z.array(z.object({
            title: z.string(),
            subtitle: z.string(),
            title_en: z.string().optional(),
            subtitle_en: z.string().optional(),
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
