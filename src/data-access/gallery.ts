import { galleryImagesList } from '@/data/gallery';
import { NewGalleryImage } from '@/db/schema';

export const gallery = {
	getAll: async () => {
		// Simulating an API call with a delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return galleryImagesList;
	},
	create: async (image: NewGalleryImage) => {
		const newImage = {
			id: crypto.randomUUID(),
			...image,
			uploadedAt: new Date().toISOString(),
		};

		await new Promise((resolve) => setTimeout(resolve, 500));
		galleryImagesList.push(newImage);
	},
};
