import { galleryDataAccess } from '@/data-access/gallery';
import { GalleryImage, NewGalleryImage } from '@/db/schema';

export async function getAllGalleryImagesUseCase(): Promise<GalleryImage[]> {
	try {
		return await galleryDataAccess.getAll();
	} catch (error) {
		console.error('Error fetching gallery images:', error);
		throw new Error('Failed to fetch gallery images');
	}
}

export async function addGalleryImageUseCase(
	image: NewGalleryImage,
): Promise<void> {
	try {
		await galleryDataAccess.create(image);
	} catch (error) {
		console.error('Failed to add gallery image:', error);
		throw new Error('Failed to add gallery image');
	}
}

export async function updateGalleryImageUseCase(
	id: number,
	image: Partial<NewGalleryImage>,
): Promise<void> {
	try {
		await galleryDataAccess.update(id, image);
	} catch (error) {
		console.error('Failed to update gallery image:', error);
		throw new Error('Failed to update gallery image');
	}
}

export async function deleteGalleryImageUseCase(id: number): Promise<void> {
	try {
		await galleryDataAccess.delete(id);
	} catch (error) {
		console.error('Failed to delete gallery image:', error);
		throw new Error('Failed to delete gallery image');
	}
}
