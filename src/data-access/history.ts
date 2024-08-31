import { historyEventsList } from '@/db/data/history';
import { HistoryEvent } from '@/db/schema';

export const history = {
	getAll: async () => {
		// Simulating an API call with a delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return historyEventsList;
	},
	create: async (event: Omit<HistoryEvent, 'id'>) => {
		const newEvent = {
			id: crypto.randomUUID(),
			...event,
		};

		await new Promise((resolve) => setTimeout(resolve, 500));
		historyEventsList.push(newEvent);
	},
};
