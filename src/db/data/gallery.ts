import { GalleryImage } from '@/db/schema';

export const galleryImagesList: GalleryImage[] = [
	{
		id: '1',
		url: '/images/gallery/image1.jpg',
		title: 'Club Entrance',
		description: 'The main entrance of Club Aleman',
		uploadedAt: '2024-03-15T10:00:00Z',
	},
	{
		id: '2',
		url: '/images/gallery/image2.jpg',
		title: 'Annual Gathering',
		description: 'Members at the annual gathering',
		uploadedAt: '2024-03-16T14:30:00Z',
	},
	// Add more sample images as needed
];
