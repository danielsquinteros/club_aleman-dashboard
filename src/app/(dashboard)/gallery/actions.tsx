'use server';

import { revalidatePath } from 'next/cache';
import { addGalleryImageUseCase } from '@/use-cases/gallery';
import { NewGalleryImage } from '@/db/schema';

export async function addGalleryImage(values: NewGalleryImage) {
	try {
		await addGalleryImageUseCase(values);
		revalidatePath('/gallery');
	} catch (error) {
		console.error('Failed to add gallery image:', error);
		throw new Error('Failed to add gallery image');
	}
}
