import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { events, NewEvent } from '@/db/schema';

export const eventsDataAccess = {
	getAll: async () => {
		return await db.select().from(events);
	},
	create: async (event: NewEvent) => {
		await db.insert(events).values(event);
	},
	getById: async (id: number) => {
		const result = await db
			.select()
			.from(events)
			.where(eq(events.id, Number(id)))
			.limit(1);
		return result[0] || null;
	},
	update: async (id: number, event: Partial<NewEvent>) => {
		await db.update(events).set(event).where(eq(events.id, id));
	},
	delete: async (id: number) => {
		await db.delete(events).where(eq(events.id, id));
	},
};
