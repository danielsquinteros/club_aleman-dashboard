import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users, NewUser } from '@/db/schema';

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

	getAll: async () => {
		return await db.select().from(users);
	},
	update: async (id: number, user: Partial<NewUser>) => {
		await db.update(users).set(user).where(eq(users.id, id));
	},
	delete: async (id: number) => {
		await db.delete(users).where(eq(users.id, id));
	},
	getById: async (id: number) => {
		const result = await db
			.select()
			.from(users)
			.where(eq(users.id, id))
			.limit(1);
		return result[0] || null;
	},
};
