import { historyDataAccess } from '@/data-access/history';
import { ClubHistory, NewClubHistory } from '@/db/schema';
import { NotFoundError } from './errors';

export async function getClubHistoryUseCase(): Promise<
	ClubHistory | undefined
> {
	try {
		return await historyDataAccess.get();
	} catch (error) {
		console.error('Error fetching club history:', error);
		throw new Error('Failed to fetch club history');
	}
}

export async function upsertClubHistoryUseCase(
	history: Partial<ClubHistory> & Pick<ClubHistory, 'content'>,
): Promise<void> {
	try {
		await historyDataAccess.create(history as NewClubHistory);
	} catch (error) {
		console.error('Failed to upsert club history:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to upsert club history');
	}
}
