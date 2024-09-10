'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MediaItem } from '@/db/schema';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { deleteMediaItemAction } from '../../actions';
import { toast } from 'sonner';
import {
	ConfirmDialog,
	useConfirmDialog,
} from '@/components/ui/confirm-dialog';
import { useState, FC } from 'react';
import { MediaItemDialog } from '../MediaItemDialog';
import { Loader2 } from 'lucide-react';
import { parseMediaItemType } from '@/lib/parse-labels';

export const columns: ColumnDef<MediaItem>[] = [
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
		accessorKey: 'url',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Image' />
		),
		cell: ({ row }) => (
			<img
				src={row.getValue('url')}
				alt='Media Item'
				width={100}
				height={100}
			/>
		),
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
		accessorKey: 'type',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Type' />
		),
		cell: ({ row }) => (
			<Badge>{parseMediaItemType(row.getValue('type'))}</Badge>
		),
	},
	{
		accessorKey: 'uploadedAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Uploaded At' />
		),
		cell: ({ row }) => {
			const date = new Date(row.getValue('uploadedAt'));
			return date.toLocaleDateString();
		},
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ActionCell mediaItem={row.original} />,
	},
];

const ActionCell: FC<{ mediaItem: MediaItem }> = ({ mediaItem }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { execute: executeDelete, isPending: isDeleting } = useServerAction(
		deleteMediaItemAction,
		{
			onSuccess: () => {
				toast.success('Media item deleted successfully');
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
		executeDelete(mediaItem.id);
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
			<MediaItemDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				initialData={mediaItem}
			/>
			<ConfirmDialog
				isOpen={isConfirmOpen}
				onOpenChange={setIsConfirmOpen}
				title='Delete Media Item'
				description='Are you sure you want to delete this media item? This action cannot be undone.'
				confirmLabel='Delete'
				cancelLabel='Cancel'
				onConfirm={handleDelete}
				onCancel={closeConfirmDialog}
				isDestructive={true}
			/>
		</>
	);
};
