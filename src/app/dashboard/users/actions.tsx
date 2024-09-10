'use server';

import { revalidatePath } from 'next/cache';
import { upsertUserUseCase, deleteUserUseCase } from '@/use-cases/users';
import { z } from 'zod';
import { superAdminAction } from '@/lib/safe-action';
import { userSchema } from '@/db/schema';

const upsertUserSchema = userSchema.extend({
	password: z.string().min(8).optional(),
});

export const upsertUserAction = superAdminAction
	.createServerAction()
	.input(upsertUserSchema)
	.handler(async ({ input, ctx: { user } }) => {
		try {
			await upsertUserUseCase(input);
			revalidatePath('/users');
		} catch (error) {
			console.error('Failed to upsert user:', error);
			throw new Error('Failed to upsert user');
		}
	});

export const deleteUserAction = superAdminAction
	.createServerAction()
	.input(z.number())
	.handler(async ({ input: id, ctx: { user } }) => {
		try {
			await deleteUserUseCase(id);
			revalidatePath('/users');
		} catch (error) {
			console.error('Failed to delete user:', error);
			throw new Error('Failed to delete user');
		}
	});
