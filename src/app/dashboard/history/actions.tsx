'use server';

import { revalidatePath } from 'next/cache';
import { upsertClubHistoryUseCase } from '@/use-cases/history';
import { z } from 'zod';
import { adminAction } from '@/lib/safe-action';

export const updateHistoryAction = adminAction
	.createServerAction()
	.input(z.string())
	.handler(async ({ input: content, ctx: { user } }) => {
		try {
			await upsertClubHistoryUseCase({ content });
			revalidatePath('/history');
		} catch (error) {
			console.error('Failed to update history:', error);
			throw new Error('Failed to update history');
		}
	});
