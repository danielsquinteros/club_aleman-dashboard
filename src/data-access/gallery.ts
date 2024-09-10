import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { galleryImages, NewGalleryImage, GalleryImage } from '@/db/schema';

export const galleryDataAccess = {
	getAll: async (): Promise<GalleryImage[]> => {
		return await db.select().from(galleryImages);
	},
	create: async (image: NewGalleryImage): Promise<void> => {
		await db.insert(galleryImages).values(image);
	},
	getById: async (id: number): Promise<GalleryImage | undefined> => {
		const result = await db
			.select()
			.from(galleryImages)
			.where(eq(galleryImages.id, id))
			.limit(1);
		return result[0];
	},
	update: async (
		id: number,
		image: Partial<NewGalleryImage>,
	): Promise<void> => {
		await db.update(galleryImages).set(image).where(eq(galleryImages.id, id));
	},
	delete: async (id: number): Promise<void> => {
		await db.delete(galleryImages).where(eq(galleryImages.id, id));
	},
};
