'use server';

import { revalidatePath } from 'next/cache';
import {
	addMediaItemUseCase,
	updateMediaItemUseCase,
	deleteMediaItemUseCase,
} from '@/use-cases/media-library';
import { z } from 'zod';
import { authenticatedAction } from '@/lib/safe-action';
import { mediaItemSchema } from '@/db/schema';

export const upsertMediaItemAction = authenticatedAction
	.createServerAction()
	.input(mediaItemSchema)
	.handler(async ({ input, ctx: { user } }) => {
		try {
			if ('id' in input && input.id) {
				await updateMediaItemUseCase(input.id, input);
			} else {
				await addMediaItemUseCase(input);
			}
			revalidatePath('/media-library');
		} catch (error) {
			console.error('Failed to upsert media item:', error);
			throw new Error('Failed to upsert media item');
		}
	});

export const deleteMediaItemAction = authenticatedAction
	.createServerAction()
	.input(z.number())
	.handler(async ({ input: id, ctx: { user } }) => {
		try {
			await deleteMediaItemUseCase(id);
			revalidatePath('/media-library');
		} catch (error) {
			console.error('Failed to delete media item:', error);
			throw new Error('Failed to delete media item');
		}
	});
