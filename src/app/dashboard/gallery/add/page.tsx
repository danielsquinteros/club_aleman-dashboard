'use client';

import {
	GalleryImageForm,
	GalleryImageFormValues,
} from '../_components/GalleryImageForm';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { upsertGalleryImageAction } from '../actions';
import { useServerAction } from 'zsa-react';

export default function AddGalleryImagePage() {
	const router = useRouter();

	const { execute, isPending } = useServerAction(upsertGalleryImageAction, {
		onSuccess: () => {
			toast.success('Gallery image added successfully');
			router.push('/dashboard/gallery');
		},
		onError: ({ err }) => {
			toast.error(err.message);
		},
	});

	const handleSubmit = (values: GalleryImageFormValues) => {
		execute(values);
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
						<GalleryImageForm
							onSubmit={handleSubmit}
							submitButtonText={isPending ? 'Adding...' : 'Add Image'}
							isSubmitting={isPending}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
