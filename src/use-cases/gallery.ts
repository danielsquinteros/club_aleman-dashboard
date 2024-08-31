import { gallery } from '@/data-access/gallery';
import { GalleryImage, NewGalleryImage } from '@/db/schema';

export async function getAllGalleryImagesUseCase(): Promise<GalleryImage[]> {
	try {
		return await gallery.getAll();
	} catch (error) {
		console.error('Error fetching gallery images:', error);
		throw new Error('Failed to fetch gallery images');
	}
}

export async function addGalleryImageUseCase(
	image: NewGalleryImage,
): Promise<void> {
	try {
		await gallery.create(image);
	} catch (error) {
		console.error('Failed to add gallery image:', error);
		throw new Error('Failed to add gallery image');
	}
}
