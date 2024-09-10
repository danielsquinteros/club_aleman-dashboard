'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { HistoryEventForm } from './HistoryEventForm';
import { HistoryEvent } from '@/db/schema';

interface HistoryEventDialogProps {
	isOpen: boolean;
	onClose: () => void;
	initialData?: HistoryEvent;
}

export function HistoryEventDialog({
	isOpen,
	onClose,
	initialData,
}: HistoryEventDialogProps) {
	const isEditing = !!initialData;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? 'Edit History Event' : 'Add New History Event'}
					</DialogTitle>
					<DialogDescription>
						{isEditing
							? 'Edit the details of this history event.'
							: 'Fill in the details to add a new history event.'}
					</DialogDescription>
				</DialogHeader>
				<HistoryEventForm initialData={initialData} onSuccess={onClose} />
			</DialogContent>
		</Dialog>
	);
}
