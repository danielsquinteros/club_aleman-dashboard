'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { AddHistoryEventForm } from './AddHistoryEventForm';
import { addHistoryEvent } from '../actions';
import { HistoryEvent } from '@/db/schema';

interface AddHistoryEventDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export function AddHistoryEventDialog({
	isOpen,
	onClose,
}: AddHistoryEventDialogProps) {
	const handleSubmit = async (values: Omit<HistoryEvent, 'id'>) => {
		await addHistoryEvent(values);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add New History Event</DialogTitle>
					<DialogDescription>
						Fill in the details to add a new history event.
					</DialogDescription>
				</DialogHeader>
				<AddHistoryEventForm
					onSubmit={handleSubmit}
					submitButtonText='Add Event'
					onSuccess={onClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
