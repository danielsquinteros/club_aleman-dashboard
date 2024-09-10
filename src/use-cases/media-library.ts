import { mediaItemsDataAccess } from '@/data-access/media-items';
import { NewMediaItem, MediaItem } from '@/db/schema';
import { NotFoundError } from './errors';

export async function getAllMediaItemsUseCase(): Promise<MediaItem[]> {
	try {
		return await mediaItemsDataAccess.getAll();
	} catch (error) {
		console.error('Error fetching media items:', error);
		throw new Error('Failed to fetch media items');
	}
}

export async function addMediaItemUseCase(
	mediaItem: NewMediaItem,
): Promise<void> {
	try {
		await mediaItemsDataAccess.create(mediaItem);
	} catch (error) {
		console.error('Failed to add media item:', error);
		throw new Error('Failed to add media item');
	}
}

export async function updateMediaItemUseCase(
	id: number,
	mediaItem: Partial<NewMediaItem>,
): Promise<void> {
	try {
		const existingItem = await mediaItemsDataAccess.getById(id);
		if (!existingItem) {
			throw new NotFoundError('Media Item');
		}
		await mediaItemsDataAccess.update(id, mediaItem);
	} catch (error) {
		console.error('Failed to update media item:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to update media item');
	}
}

export async function deleteMediaItemUseCase(id: number): Promise<void> {
	try {
		const existingItem = await mediaItemsDataAccess.getById(id);
		if (!existingItem) {
			throw new NotFoundError('Media Item');
		}
		await mediaItemsDataAccess.delete(id);
	} catch (error) {
		console.error('Failed to delete media item:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to delete media item');
	}
}
