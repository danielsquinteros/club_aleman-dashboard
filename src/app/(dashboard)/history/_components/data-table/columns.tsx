'use client';

import { ColumnDef } from '@tanstack/react-table';
import { HistoryEvent } from '@/db/schema';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';

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
];
