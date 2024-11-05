'use client';

import { ColumnDef } from '@tanstack/react-table';
import { GalleryImage } from '@/db/schema';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import Image from 'next/image';
import { FC } from 'react';
import {
	useConfirmDialog,
	ConfirmDialog,
} from '@/components/ui/confirm-dialog';
import { Pencil, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { Button } from '@/components/ui/button';
import { GalleryImageDialog } from '../GalleryImageDialog';
import { deleteGalleryImageAction } from '../../actions';
import { useState } from 'react';

export const columns: ColumnDef<GalleryImage>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Title' />
		),
	},
	{
		accessorKey: 'url',
		header: 'Image',
		cell: ({ row }) => (
			<img
				src={row.getValue('url')}
				alt={row.getValue('title')}
				width={100}
				height={100}
				className='object-cover rounded-md'
			/>
		),
	},
	{
		accessorKey: 'description',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Description' />
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
		cell: ({ row }) => <ActionCell image={row.original} />,
	},
];

const ActionCell: FC<{ image: GalleryImage }> = ({ image }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { execute: executeDelete, isPending: isDeleting } = useServerAction(
		deleteGalleryImageAction,
		{
			onSuccess: () => {
				toast.success('Image deleted successfully');
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
		executeDelete(image.id);
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
			<GalleryImageDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				initialData={image}
			/>
			<ConfirmDialog
				isOpen={isConfirmOpen}
				onOpenChange={setIsConfirmOpen}
				title='Delete Image'
				description='Are you sure you want to delete this image? This action cannot be undone.'
				confirmLabel='Delete'
				cancelLabel='Cancel'
				onConfirm={handleDelete}
				onCancel={closeConfirmDialog}
				isDestructive={true}
			/>
		</div>
	);
};
