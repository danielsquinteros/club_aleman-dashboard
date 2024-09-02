import { history } from '@/data-access/history';
import { HistoryEvent, NewHistoryEvent } from '@/db/schema';

export async function getAllHistoryEventsUseCase(): Promise<HistoryEvent[]> {
	try {
		return await history.getAll();
	} catch (error) {
		console.error('Error fetching history events:', error);
		throw new Error('Failed to fetch history events');
	}
}

export async function addHistoryEventUseCase(
	event: NewHistoryEvent,
): Promise<void> {
	try {
		await history.create(event);
	} catch (error) {
		console.error('Failed to add history event:', error);
		throw new Error('Failed to add history event');
	}
}
