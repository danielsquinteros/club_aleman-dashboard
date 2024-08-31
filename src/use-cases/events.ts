import { events } from '@/data-access/events';
import { Event, NewEvent } from '@/db/schema';

export async function getAllEventsUseCase(): Promise<Event[]> {
	try {
		return await events.getAll();
	} catch (error) {
		console.error('Error fetching events:', error);
		throw new Error('Failed to fetch events');
	}
}

export async function addEventUseCase(event: NewEvent): Promise<void> {
	try {
		await events.create(event);
	} catch (error) {
		console.error('Failed to add event:', error);
		throw new Error('Failed to add event');
	}
}

// Add other event-related use cases as needed
