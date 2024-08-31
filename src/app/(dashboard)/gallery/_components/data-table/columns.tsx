'use client';

import { ColumnDef } from '@tanstack/react-table';
import { GalleryImage } from '@/db/schema';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import Image from 'next/image';

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
			<Image
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
];
