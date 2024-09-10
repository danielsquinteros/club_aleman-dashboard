'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { MediaItemForm, MediaItemFormValues } from './MediaItemForm';
import { MediaItem } from '@/db/schema';
import { upsertMediaItemAction } from '../actions';
import { useServerAction } from 'zsa-react';
import { toast } from 'sonner';

interface MediaItemDialogProps {
	isOpen: boolean;
	onClose: () => void;
	initialData?: MediaItem;
}

export function MediaItemDialog({
	isOpen,
	onClose,
	initialData,
}: MediaItemDialogProps) {
	const isEditing = !!initialData;

	const { execute, isPending } = useServerAction(upsertMediaItemAction, {
		onSuccess: () => {
			toast.success(
				isEditing
					? 'Media item updated successfully'
					: 'Media item added successfully',
			);
			onClose();
		},
		onError: ({ err }) => {
			toast.error(err.message);
		},
	});

	const handleSubmit = (values: MediaItemFormValues) => {
		execute(values);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? 'Edit Media Item' : 'Add New Media Item'}
					</DialogTitle>
					<DialogDescription>
						{isEditing
							? 'Edit the details of this media item.'
							: 'Fill in the details to add a new media item.'}
					</DialogDescription>
				</DialogHeader>
				<MediaItemForm
					initialValues={initialData}
					onSubmit={handleSubmit}
					submitButtonText={isEditing ? 'Update Media Item' : 'Add Media Item'}
					isSubmitting={isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
