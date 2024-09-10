'use server';

import { revalidatePath } from 'next/cache';
import { upsertMemberUseCase, deleteMemberUseCase } from '@/use-cases/members';
import { z } from 'zod';
import { adminAction } from '@/lib/safe-action';
import { memberSchema } from '@/db/schema';

export const upsertMemberAction = adminAction
	.createServerAction()
	.input(memberSchema)
	.handler(async ({ input, ctx: { user } }) => {
		try {
			await upsertMemberUseCase(input);
			revalidatePath('/members');
		} catch (error) {
			console.error('Failed to upsert member:', error);
			throw new Error('Failed to upsert member');
		}
	});

export const deleteMemberAction = adminAction
	.createServerAction()
	.input(z.number())
	.handler(async ({ input: id, ctx: { user } }) => {
		try {
			await deleteMemberUseCase(id);
			revalidatePath('/members');
		} catch (error) {
			console.error('Failed to delete member:', error);
			throw new Error('Failed to delete member');
		}
	});
