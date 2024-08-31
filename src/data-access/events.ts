import { eventsList } from '@/db/data/events';
import { NewEvent } from '@/db/schema';

export const events = {
	getAll: async () => {
		await new Promise((resolve) => setTimeout(resolve, 500));
		return eventsList;
	},
	create: async (event: NewEvent) => {
		const newEvent = {
			id: crypto.randomUUID(),
			...event,
			createdAt: new Date().toISOString(),
		};

		await new Promise((resolve) => setTimeout(resolve, 500));
		eventsList.push(newEvent);
	},
};
