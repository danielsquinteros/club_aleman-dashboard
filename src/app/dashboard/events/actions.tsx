'use server';

import { revalidatePath } from 'next/cache';
import { upsertEventUseCase, deleteEventUseCase } from '@/use-cases/events';
import { z } from 'zod';
import { adminAction } from '@/lib/safe-action';
import { eventSchema } from '@/db/schema';

export const upsertEventAction = adminAction
	.createServerAction()
	.input(eventSchema)
	.handler(async ({ input, ctx: { user } }) => {
		try {
			await upsertEventUseCase(input);
			revalidatePath('/events');
		} catch (error) {
			console.error('Failed to upsert event:', error);
			throw new Error('Failed to upsert event');
		}
	});

export const deleteEventAction = adminAction
	.createServerAction()
	.input(z.number())
	.handler(async ({ input: id, ctx: { user } }) => {
		try {
			await deleteEventUseCase(id);
			revalidatePath('/events');
		} catch (error) {
			console.error('Failed to delete event:', error);
			throw new Error('Failed to delete event');
		}
	});
