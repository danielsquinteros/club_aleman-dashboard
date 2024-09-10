import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users, NewUser } from '@/db/schema';
import { verifyPassword } from '@/lib/auth';
export const usersDataAccess = {
	getByEmail: async (email: string) => {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.email, email.toLowerCase()))
			.limit(1);
		return result[0] || null;
	},
	create: async (user: NewUser) => {
		await db.insert(users).values(user);
	},
	verifyPassword: async (email: string, password: string) => {
		const user = await usersDataAccess.getByEmail(email);

		if (!user) {
			return false;
		}

		if (!user.password) {
			return false;
		}

		return await verifyPassword(user.password, password);
	},
};
