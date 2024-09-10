import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { historyEvents, NewHistoryEvent } from '@/db/schema';

export const historyDataAccess = {
	getAll: async () => {
		return await db.select().from(historyEvents);
	},
	create: async (event: NewHistoryEvent) => {
		await db.insert(historyEvents).values(event);
	},
	getById: async (id: number) => {
		const result = await db
			.select()
			.from(historyEvents)
			.where(eq(historyEvents.id, Number(id)))
			.limit(1);
		return result[0] || null;
	},
	update: async (id: number, event: Partial<NewHistoryEvent>) => {
		await db.update(historyEvents).set(event).where(eq(historyEvents.id, id));
	},
	delete: async (id: number) => {
		await db.delete(historyEvents).where(eq(historyEvents.id, id));
	},
};
