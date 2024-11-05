import { desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { clubHistory, NewClubHistory } from '@/db/schema';

export const historyDataAccess = {
	get: async () => {
		const result = await db
			.select()
			.from(clubHistory)
			.orderBy(desc(clubHistory.updatedAt));
		return result[0] || null;
	},
	create: async (history: NewClubHistory) => {
		await db.insert(clubHistory).values(history);
	},

	update: async (content: string) => {
		const [history] = await db
			.insert(clubHistory)
			.values({ content })
			.onConflictDoUpdate({
				target: clubHistory.id,
				set: { content, updatedAt: new Date() },
			})
			.returning();
		return history;
	},
	delete: async (id: number) => {
		await db.delete(clubHistory).where(eq(clubHistory.id, id));
	},
};
