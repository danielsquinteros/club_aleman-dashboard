'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Member } from '@/db/schema';
import { format, parseISO } from 'date-fns';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { deleteMemberAction } from '../../actions';
import { toast } from 'sonner';
import {
	ConfirmDialog,
	useConfirmDialog,
} from '@/components/ui/confirm-dialog';
import { useState, FC } from 'react';
import { MemberDialog } from '../MemberDialog';
import { Loader2 } from 'lucide-react';
import { parseMemberRole } from '@/lib/parse-labels';

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
		enableColumnFilter: true,
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
			<Badge variant='outline'>{parseMemberRole(row.getValue('role'))}</Badge>
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
		enableColumnFilter: true,
	},
	{
		accessorKey: 'phoneNumber',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Phone Number' />
		),
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email' />
		),
	},
	{
		accessorKey: 'address',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Address' />
		),
	},
	{
		accessorKey: 'joinDate',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Join Date' />
		),
		cell: ({ row }) => format(parseISO(row.getValue('joinDate')), 'PPP'),
	},
	// {
	// 	id: 'globalFilter',
	// 	accessorFn: (row) => {
	// 		return Object.values(row).join(' ').toLowerCase();
	// 	},
	// },
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ActionCell member={row.original} />,
	},
];

const ActionCell: FC<{ member: Member }> = ({ member }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { execute: executeDelete, isPending: isDeleting } = useServerAction(
		deleteMemberAction,
		{
			onSuccess: () => {
				toast.success('Member deleted successfully');
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
		executeDelete(member.id);
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
			<MemberDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				initialData={member}
			/>
			<ConfirmDialog
				isOpen={isConfirmOpen}
				onOpenChange={setIsConfirmOpen}
				title='Delete Member'
				description='Are you sure you want to delete this member? This action cannot be undone.'
				confirmLabel='Delete'
				cancelLabel='Cancel'
				onConfirm={handleDelete}
				onCancel={closeConfirmDialog}
				isDestructive={true}
			/>
		</div>
	);
};
