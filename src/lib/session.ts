import 'server-only';
import { AuthenticationError, AuthorizationError } from '@/use-cases/errors';
import { lucia, validateRequest } from '@/auth';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { UserId } from 'lucia';

export const getCurrentUser = cache(async () => {
	const session = await validateRequest();
	if (!session.user) {
		return undefined;
	}
	return session.user;
});

export const assertAuthenticated = async () => {
	const user = await getCurrentUser();
	if (!user) {
		throw new AuthenticationError();
	}
	return user;
};

export const assertAdmin = async () => {
	const user = await assertAuthenticated();
	if (user.role !== 'admin') {
		throw new AuthorizationError();
	}
	return user;
};

export const assertSuperAdmin = async () => {
	const user = await assertAuthenticated();
	if (user.role !== 'super_admin') {
		throw new AuthorizationError();
	}
	return user;
};

export async function setSession(userId: UserId) {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
}
