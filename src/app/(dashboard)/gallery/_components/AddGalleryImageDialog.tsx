'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { AddGalleryImageForm } from './AddGalleryImageForm';
import { addGalleryImage } from '../actions';
import { NewGalleryImage } from '@/db/schema';

interface AddGalleryImageDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export function AddGalleryImageDialog({
	isOpen,
	onClose,
}: AddGalleryImageDialogProps) {
	const handleSubmit = async (values: NewGalleryImage) => {
		await addGalleryImage(values);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add New Gallery Image</DialogTitle>
					<DialogDescription>
						Fill in the details to add a new gallery image.
					</DialogDescription>
				</DialogHeader>
				<AddGalleryImageForm
					onSubmit={handleSubmit}
					submitButtonText='Add Image'
					onSuccess={onClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
