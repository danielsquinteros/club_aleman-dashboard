'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { GalleryImageForm, GalleryImageFormValues } from './GalleryImageForm';
import { GalleryImage } from '@/db/schema';
import { upsertGalleryImageAction } from '../actions';
import { useServerAction } from 'zsa-react';
import { toast } from 'sonner';

interface GalleryImageDialogProps {
	isOpen: boolean;
	onClose: () => void;
	initialData?: GalleryImage;
}

export function GalleryImageDialog({
	isOpen,
	onClose,
	initialData,
}: GalleryImageDialogProps) {
	const isEditing = !!initialData;

	const { execute, isPending } = useServerAction(upsertGalleryImageAction, {
		onSuccess: () => {
			toast.success(
				isEditing
					? 'Gallery image updated successfully'
					: 'Gallery image added successfully',
			);
			onClose();
		},
		onError: ({ err }) => {
			toast.error(err.message);
		},
	});

	const handleSubmit = (values: GalleryImageFormValues) => {
		execute(values);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? 'Edit Gallery Image' : 'Add New Gallery Image'}
					</DialogTitle>
					<DialogDescription>
						{isEditing
							? 'Edit the details of this gallery image.'
							: 'Fill in the details to add a new gallery image.'}
					</DialogDescription>
				</DialogHeader>
				<GalleryImageForm
					initialValues={initialData}
					onSubmit={handleSubmit}
					submitButtonText={isEditing ? 'Update Image' : 'Add Image'}
					isSubmitting={isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
