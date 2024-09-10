'use client';

import { ColumnDef } from '@tanstack/react-table';
import { HistoryEvent } from '@/db/schema';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { useState, FC } from 'react';
import { HistoryEventDialog } from '../HistoryEventDialog';
import { useServerAction } from 'zsa-react';
import { deleteHistoryEventAction } from '../../actions';
import { toast } from 'sonner';
import {
	ConfirmDialog,
	useConfirmDialog,
} from '@/components/ui/confirm-dialog';

export const columns: ColumnDef<HistoryEvent>[] = [
	{
		accessorKey: 'year',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Year' />
		),
	},
	{
		accessorKey: 'event',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Event' />
		),
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Description' />
		),
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ActionCell historyEvent={row.original} />,
	},
];

const ActionCell: FC<{ historyEvent: HistoryEvent }> = ({ historyEvent }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { execute: executeDelete, isPending: isDeleting } = useServerAction(
		deleteHistoryEventAction,
		{
			onSuccess: () => {
				toast.success('History event deleted successfully');
			},
			onError: ({ err }) => {
				toast.error(err.message);
			},
		},
	);
	const {
		isOpen: isConfirmOpen,
		setIsOpen: setIsConfirmOpen,
		openDialog: openConfirmDialog,
		closeDialog: closeConfirmDialog,
	} = useConfirmDialog();

	const handleDelete = () => {
		executeDelete(historyEvent.id);
		closeConfirmDialog();
	};

	return (
		<>
			<Button variant='outline' size='sm' onClick={() => setIsDialogOpen(true)}>
				<Pencil className='h-4 w-4 mr-2' />
				Edit
			</Button>
			<Button
				variant='outline'
				size='sm'
				onClick={openConfirmDialog}
				disabled={isDeleting}
			>
				{isDeleting ? (
					<Loader2 className='h-4 w-4 mr-2 animate-spin' />
				) : (
					<Trash2 className='h-4 w-4 mr-2' />
				)}
				{isDeleting ? 'Deleting...' : 'Delete'}
			</Button>
			<HistoryEventDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				initialData={historyEvent}
			/>
			<ConfirmDialog
				isOpen={isConfirmOpen}
				onOpenChange={setIsConfirmOpen}
				title='Delete History Event'
				description='Are you sure you want to delete this history event? This action cannot be undone.'
				confirmLabel='Delete'
				cancelLabel='Cancel'
				onConfirm={handleDelete}
				onCancel={closeConfirmDialog}
				isDestructive={true}
			/>
		</>
	);
};
