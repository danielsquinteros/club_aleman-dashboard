'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Event } from '@/db/schema';
import { format, parseISO } from 'date-fns';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { deleteEventAction } from '../../actions';
import { toast } from 'sonner';
import {
	ConfirmDialog,
	useConfirmDialog,
} from '@/components/ui/confirm-dialog';
import { useState } from 'react';
import { EventDialog } from '../EventDialog';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import { parseStatus } from '@/lib/parse-labels';

export const columns: ColumnDef<Event>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Title' />
		),
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Description' />
		),
	},
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Date' />
		),
		cell: ({ row }) => format(parseISO(row.getValue('date')), 'PPP'),
	},
	{
		accessorKey: 'location',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Location' />
		),
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Status' />
		),
		cell: ({ row }) => parseStatus(row.getValue('status')),
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ActionCell event={row.original} />,
	},
];

const ActionCell: FC<{ event: Event }> = ({ event }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { execute: executeDelete, isPending: isDeleting } = useServerAction(
		deleteEventAction,
		{
			onSuccess: () => {
				toast.success('Event deleted successfully');
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
		executeDelete(event.id);
		closeConfirmDialog();
	};

	return (
		<div className='flex gap-2'>
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
			<EventDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				initialData={event}
			/>
			<ConfirmDialog
				isOpen={isConfirmOpen}
				onOpenChange={setIsConfirmOpen}
				title='Delete Event'
				description='Are you sure you want to delete this event? This action cannot be undone.'
				confirmLabel='Delete'
				cancelLabel='Cancel'
				onConfirm={handleDelete}
				onCancel={closeConfirmDialog}
				isDestructive={true}
			/>
		</div>
	);
};
