'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { EventForm, EventFormValues } from './EventForm';
import { Event } from './data-table/columns';
import { toast } from 'sonner';

interface EditEventDialogProps {
	event: Event;
	onEventUpdated: (updatedEvent: Event) => void;
	onClose: () => void;
}

export function EditEventDialog({
	event,
	onEventUpdated,
	onClose,
}: EditEventDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = async (values: EventFormValues) => {
		try {
			// Here you would typically make an API call to update the event
			const updatedEvent: Event = {
				...event,
				...values,
				date: values.date.toISOString().split('T')[0],
			};

			onEventUpdated(updatedEvent);
			setIsOpen(false);
			toast.success('Event updated successfully');
		} catch (error) {
			console.error('Failed to update event:', error);
			toast.error('Failed to update event');
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' size='sm' className='flex items-center gap-2'>
					<Pencil className='h-4 w-4' />
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit Event</DialogTitle>
					<DialogDescription>Edit the event details below.</DialogDescription>
				</DialogHeader>
				<EventForm
					initialValues={{
						...event,
						date: new Date(event.date),
					}}
					onSubmit={handleSubmit}
					submitButtonText='Update Event'
				/>
			</DialogContent>
		</Dialog>
	);
}
