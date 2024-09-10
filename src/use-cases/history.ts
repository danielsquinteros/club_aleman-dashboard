import { historyDataAccess } from '@/data-access/history';
import { HistoryEvent, NewHistoryEvent } from '@/db/schema';
import { NotFoundError } from './errors';

export async function getAllHistoryEventsUseCase(): Promise<HistoryEvent[]> {
	try {
		return await historyDataAccess.getAll();
	} catch (error) {
		console.error('Error fetching history events:', error);
		throw new Error('Failed to fetch history events');
	}
}

export async function upsertHistoryEventUseCase(
	event: Partial<HistoryEvent> & Pick<HistoryEvent, 'year' | 'event'>,
): Promise<void> {
	try {
		if ('id' in event && event.id) {
			const id = Number(event.id);
			if (isNaN(id)) {
				throw new Error('Invalid ID');
			}
			const existingEvent = await historyDataAccess.getById(id);
			if (!existingEvent) {
				throw new NotFoundError('History');
			}
			await historyDataAccess.update(id, event);
		} else {
			await historyDataAccess.create(event as NewHistoryEvent);
		}
	} catch (error) {
		console.error('Failed to upsert history event:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to upsert history event');
	}
}

export async function getHistoryEventByIdUseCase(
	id: number,
): Promise<HistoryEvent | null> {
	try {
		const event = await historyDataAccess.getById(id);
		return event || null;
	} catch (error) {
		console.error('Error fetching history event:', error);
		throw new Error('Failed to fetch history event');
	}
}

export async function deleteHistoryEventUseCase(id: number): Promise<void> {
	try {
		const existingEvent = await historyDataAccess.getById(id);
		if (!existingEvent) {
			throw new NotFoundError('History');
		}
		await historyDataAccess.delete(id);
	} catch (error) {
		console.error('Failed to delete history event:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to delete history event');
	}
}
