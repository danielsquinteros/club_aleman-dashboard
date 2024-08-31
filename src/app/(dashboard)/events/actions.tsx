'use server';

import { revalidatePath } from 'next/cache';
import { addEventUseCase } from '@/use-cases/events';
import { NewEvent } from '@/db/schema';

export async function addEvent(values: NewEvent) {
	try {
		await addEventUseCase(values);
		revalidatePath('/events');
	} catch (error) {
		console.error('Failed to add event:', error);
		throw new Error('Failed to add event');
	}
}
