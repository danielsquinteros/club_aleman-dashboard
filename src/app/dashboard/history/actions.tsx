'use server';

import { revalidatePath } from 'next/cache';
import {
	upsertHistoryEventUseCase,
	deleteHistoryEventUseCase,
} from '@/use-cases/history';
import { z } from 'zod';
import { adminAction } from '@/lib/safe-action';

export const upsertHistoryEventAction = adminAction
	.createServerAction()
	.input(
		z.object({
			id: z.number().optional(),
			year: z.number().int().min(1800).max(new Date().getFullYear()),
			event: z.string().min(2, {
				message: 'Event description must be at least 2 characters.',
			}),
			description: z.string().optional(),
		}),
	)
	.handler(async ({ input, ctx: { user } }) => {
		try {
			await upsertHistoryEventUseCase(input);
			revalidatePath('/history');
		} catch (error) {
			console.error('Failed to upsert history event:', error);
			throw new Error('Failed to upsert history event');
		}
	});

export const deleteHistoryEventAction = adminAction
	.createServerAction()
	.input(z.number())
	.handler(async ({ input: id, ctx: { user } }) => {
		try {
			await deleteHistoryEventUseCase(id);
			revalidatePath('/history');
		} catch (error) {
			console.error('Failed to delete history event:', error);
			throw new Error('Failed to delete history event');
		}
	});
