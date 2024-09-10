'use server';

import { revalidatePath } from 'next/cache';
import {
	addGalleryImageUseCase,
	updateGalleryImageUseCase,
	deleteGalleryImageUseCase,
} from '@/use-cases/gallery';
import { z } from 'zod';
import { adminAction } from '@/lib/safe-action';
import { NewGalleryImage, GalleryImage } from '@/db/schema';

const galleryImageSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(2),
	url: z.string().url(),
	description: z.string().optional().nullable(),
	uploadedAt: z.string().optional(),
});

export const upsertGalleryImageAction = adminAction
	.createServerAction()
	.input(galleryImageSchema)
	.handler(async ({ input, ctx: { user } }) => {
		try {
			if (input.id) {
				await updateGalleryImageUseCase(input.id, input);
			} else {
				await addGalleryImageUseCase(input);
			}
			revalidatePath('/gallery');
		} catch (error) {
			console.error('Failed to upsert gallery image:', error);
			throw new Error('Failed to upsert gallery image');
		}
	});

export const deleteGalleryImageAction = adminAction
	.createServerAction()
	.input(z.number())
	.handler(async ({ input: id, ctx: { user } }) => {
		try {
			await deleteGalleryImageUseCase(id);
			revalidatePath('/gallery');
		} catch (error) {
			console.error('Failed to delete gallery image:', error);
			throw new Error('Failed to delete gallery image');
		}
	});
