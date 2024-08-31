'use client';

import { useState } from 'react';
import { AddGalleryImageForm } from '../_components/AddGalleryImageForm';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { NewGalleryImage } from '@/db/schema';

export default function AddGalleryImagePage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (values: NewGalleryImage) => {
		setIsSubmitting(true);
		try {
			// Here you would typically make an API call to create the gallery image
			// For now, we'll just simulate an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success('Gallery image added successfully');
			router.push('/gallery');
		} catch (error) {
			console.error('Failed to add gallery image:', error);
			toast.error('Failed to add gallery image');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Add Gallery Image</h1>
			<div className='flex justify-center items-center'>
				<Card className='min-w-[600px]'>
					<CardHeader>
						<CardTitle>Add a new image to the gallery</CardTitle>
						<CardDescription>
							Fill in the form below to add a new image to the gallery.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<AddGalleryImageForm
							onSubmit={handleSubmit}
							submitButtonText={isSubmitting ? 'Adding...' : 'Add Image'}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
