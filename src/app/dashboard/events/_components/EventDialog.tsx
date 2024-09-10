'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { EventForm, EventFormValues } from './EventForm';
import { Event } from '@/db/schema';
import { upsertEventAction } from '../actions';
import { useServerAction } from 'zsa-react';
import { toast } from 'sonner';

interface EventDialogProps {
	isOpen: boolean;
	onClose: () => void;
	initialData?: Event;
}

export function EventDialog({
	isOpen,
	onClose,
	initialData,
}: EventDialogProps) {
	const isEditing = !!initialData;

	const { execute, isPending } = useServerAction(upsertEventAction, {
		onSuccess: () => {
			toast.success(
				isEditing ? 'Event updated successfully' : 'Event added successfully',
			);
			onClose();
		},
		onError: ({ err }) => {
			toast.error(err.message);
		},
	});

	const handleSubmit = (values: EventFormValues) => {
		execute(values);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? 'Edit Event' : 'Add New Event'}
					</DialogTitle>
					<DialogDescription>
						{isEditing
							? 'Edit the details of this event.'
							: 'Fill in the details to add a new event.'}
					</DialogDescription>
				</DialogHeader>
				<EventForm
					initialValues={initialData}
					onSubmit={handleSubmit}
					submitButtonText={isEditing ? 'Update Event' : 'Add Event'}
					isSubmitting={isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
