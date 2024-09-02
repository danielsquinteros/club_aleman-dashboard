import { historyEventsList } from '@/db/data/history';
import { NewHistoryEvent } from '@/db/schema';

export const history = {
	getAll: async () => {
		// Simulating an API call with a delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return historyEventsList;
	},
	create: async (event: NewHistoryEvent) => {
		const newEvent = {
			id: crypto.randomUUID(),
			...event,
		};

		await new Promise((resolve) => setTimeout(resolve, 500));
		historyEventsList.push(newEvent);
	},
};
