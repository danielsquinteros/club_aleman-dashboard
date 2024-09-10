import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '@/db';
import { sessions, UserRole, users } from '@/db/schema';
import { cookies } from 'next/headers';
import { User } from 'lucia';
import { Session } from 'lucia';
import { UserId as CustomUserId } from '@/db/schema';
const adapter = new DrizzlePostgreSQLAdapter(db, sessions as any, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			email: attributes.email,
			role: attributes.role,
		};
	},
});

export const validateRequest = async (): Promise<
	{ user: User; session: Session } | { user: null; session: null }
> => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return {
			user: null,
			session: null,
		};
	}

	const result = await lucia.validateSession(sessionId);

	// next.js throws when you attempt to set cookie when rendering page
	try {
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
		if (!result.session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
		}
	} catch {}
	return result;
};

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			id: CustomUserId;
			role: UserRole;
			email: string;
		};
		UserId: CustomUserId;
	}
}
