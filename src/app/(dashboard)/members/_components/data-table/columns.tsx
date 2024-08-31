'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MemberRole } from '@/db/schema';
import { EditMemberDialog } from '../EditMemberDialog';
import { format, parseISO } from 'date-fns';
import { DataTableColumnHeader } from './data-table-column-header';

export type Member = {
	id: string;
	firstName: string;
	lastName: string;
	secondSurname: string;
	role: MemberRole;
	joinDate: string;
	avatarUrl?: string;
};

export const columns: ColumnDef<Member>[] = [
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
		accessorKey: 'firstName',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='First Name' />
		),
	},
	{
		accessorKey: 'lastName',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Last Name' />
		),
	},
	{
		accessorKey: 'secondSurname',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Second Surname' />
		),
	},
	{
		accessorKey: 'role',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Role' />
		),
		cell: ({ row }) => (
			<Badge variant='outline'>{parseRole(row.getValue('role'))}</Badge>
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: 'joinDate',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Join Date' />
		),
		cell: ({ row }) => format(parseISO(row.getValue('joinDate')), 'PPP'),
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const member = row.original;
			return (
				<EditMemberDialog
					member={member}
					onMemberUpdated={(updatedMember) => {
						console.log('Member updated in columns:', updatedMember);
						// You'll need to implement a way to update the table data here
					}}
					onClose={() => {}}
				/>
			);
		},
	},
];

const parseRole = (role: MemberRole) => {
	const roles: Record<MemberRole, string> = {
		member: 'Member',
		president: 'President',
		vice_president: 'Vice President',
		secretary: 'Secretary',
		treasurer: 'Treasurer',
		board_member: 'Board Member',
		honor_advisor: 'Honor Advisor',
		honor_member: 'Honor Member',
	};
	return roles[role];
};
