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
		if ('id' in history && history.id) {
			const id = Number(history.id);
			if (isNaN(id)) {
				throw new Error('Invalid ID');
			}
			const existingHistory = await historyDataAccess.getById(id);
			if (!existingHistory) {
				throw new NotFoundError('History');
			}
			await historyDataAccess.update(history.content);
		} else {
			await historyDataAccess.create(history as NewClubHistory);
		}
	} catch (error) {
		console.error('Failed to upsert club history:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to upsert club history');
	}
}
