import { asc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { members, NewMember } from '@/db/schema';

export const membersDataAccess = {
	getAll: async () => {
		return await db.select().from(members).orderBy(asc(members.id));
	},
	create: async (member: NewMember) => {
		await db.insert(members).values(member);
	},
	getById: async (id: number) => {
		const result = await db
			.select()
			.from(members)
			.where(eq(members.id, Number(id)))
			.limit(1);
		return result[0] || null;
	},
	update: async (id: number, member: Partial<NewMember>) => {
		await db.update(members).set(member).where(eq(members.id, id));
	},
	delete: async (id: number) => {
		await db.delete(members).where(eq(members.id, id));
	},
};
