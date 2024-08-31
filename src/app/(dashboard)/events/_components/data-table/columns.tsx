'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { format, parseISO } from 'date-fns';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { EditEventDialog } from '../EditEventDialog';

export type Event = {
	id: string;
	title: string;
	description: string;
	date: string;
	location: string;
	status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
};

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
		cell: ({ row }) => (
			<Badge variant='outline'>{parseStatus(row.getValue('status'))}</Badge>
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const event = row.original;
			return (
				<EditEventDialog
					event={event}
					onEventUpdated={(updatedEvent) => {
						console.log('Event updated in columns:', updatedEvent);
						// You'll need to implement a way to update the table data here
					}}
					onClose={() => {}}
				/>
			);
		},
	},
];

const parseStatus = (status: string) => {
	switch (status) {
		case 'upcoming':
			return 'Upcoming';
		case 'ongoing':
			return 'Ongoing';
		case 'completed':
			return 'Completed';
		case 'cancelled':
			return 'Cancelled';
		default:
			return 'Unknown';
	}
};
