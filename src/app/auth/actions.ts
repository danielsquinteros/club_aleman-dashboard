'use server';

import { lucia, validateRequest } from '@/auth';
import { unauthenticatedAction } from '@/lib/safe-action';
import { setSession } from '@/lib/session';
import { signInUseCase } from '@/use-cases/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const signInAction = unauthenticatedAction
	.createServerAction()
	.input(
		z.object({
			email: z.string().email(),
			password: z.string().min(1, { message: 'Password is required' }),
		}),
	)
	.handler(async ({ input }) => {
		const user = await signInUseCase(input.email, input.password);
		await setSession(user.id);
		redirect('/dashboard');
	});

export async function signOutAction() {
	const { session } = await validateRequest();

	if (!session) {
		redirect('/auth/login');
	}

	await lucia.invalidateSession(session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	redirect('/auth/login');
}

export async function profileAction() {
	const { session } = await validateRequest();

	if (!session) {
		redirect('/auth/login');
	}
	redirect('/dashboard/profile');
}
