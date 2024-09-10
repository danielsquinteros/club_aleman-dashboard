import { eventsDataAccess } from '@/data-access/events';
import { Event, NewEvent } from '@/db/schema';
import { NotFoundError } from './errors';

export async function getAllEventsUseCase(): Promise<Event[]> {
	try {
		return await eventsDataAccess.getAll();
	} catch (error) {
		console.error('Error fetching events:', error);
		throw new Error('Failed to fetch events');
	}
}

export async function upsertEventUseCase(event: NewEvent): Promise<void> {
	try {
		if ('id' in event && event.id) {
			const id = Number(event.id);
			if (isNaN(id)) {
				throw new Error('Invalid ID');
			}
			const existingEvent = await eventsDataAccess.getById(id);
			if (!existingEvent) {
				throw new NotFoundError('Event');
			}
			await eventsDataAccess.update(id, event);
		} else {
			await eventsDataAccess.create(event);
		}
	} catch (error) {
		console.error('Failed to upsert event:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to upsert event');
	}
}

export async function getEventByIdUseCase(id: number): Promise<Event | null> {
	try {
		const event = await eventsDataAccess.getById(id);
		return event || null;
	} catch (error) {
		console.error('Error fetching event:', error);
		throw new Error('Failed to fetch event');
	}
}

export async function deleteEventUseCase(id: number): Promise<void> {
	try {
		const existingEvent = await eventsDataAccess.getById(id);
		if (!existingEvent) {
			throw new NotFoundError('Event');
		}
		await eventsDataAccess.delete(id);
	} catch (error) {
		console.error('Failed to delete event:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to delete event');
	}
}

// Add other event-related use cases as needed
