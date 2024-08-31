'use server';

import { revalidatePath } from 'next/cache';
import { addHistoryEventUseCase } from '@/use-cases/history';
import { HistoryEvent } from '@/db/schema';

export async function addHistoryEvent(values: Omit<HistoryEvent, 'id'>) {
	try {
		await addHistoryEventUseCase(values);
		revalidatePath('/history');
	} catch (error) {
		console.error('Failed to add history event:', error);
		throw new Error('Failed to add history event');
	}
}
