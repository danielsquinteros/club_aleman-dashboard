'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { EventForm, EventFormValues } from './EventForm';
import { addEvent } from '../actions';
import { NewEvent } from '@/db/schema';

interface AddEventDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export function AddEventDialog({ isOpen, onClose }: AddEventDialogProps) {
	const handleSubmit = async (values: EventFormValues) => {
		const newEvent: NewEvent = {
			...values,
			date: values.date.toISOString().split('T')[0], // Convert Date to string
		};
		await addEvent(newEvent);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add New Event</DialogTitle>
					<DialogDescription>
						Fill in the details to add a new event.
					</DialogDescription>
				</DialogHeader>
				<EventForm
					onSubmit={handleSubmit}
					submitButtonText='Add Event'
					onSuccess={onClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
