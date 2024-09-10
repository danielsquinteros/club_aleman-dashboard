'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { User } from '@/db/schema';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { deleteUserAction } from '../../actions';
import { toast } from 'sonner';
import {
	ConfirmDialog,
	useConfirmDialog,
} from '@/components/ui/confirm-dialog';
import { useState, FC } from 'react';
import { UserDialog } from '../UserDialog';
import { Loader2 } from 'lucide-react';
import { parseUserRole } from '@/lib/parse-labels';

export const columns: ColumnDef<User>[] = [
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
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email' />
		),
		enableColumnFilter: true,
	},
	{
		accessorKey: 'role',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Role' />
		),
		cell: ({ row }) => (
			<Badge variant='outline'>{parseUserRole(row.getValue('role'))}</Badge>
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
		enableColumnFilter: true,
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ActionCell user={row.original} />,
	},
];

const ActionCell: FC<{ user: User }> = ({ user }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { execute: executeDelete, isPending: isDeleting } = useServerAction(
		deleteUserAction,
		{
			onSuccess: () => {
				toast.success('User deleted successfully');
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
		executeDelete(user.id);
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
			<UserDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				initialData={user}
			/>
			<ConfirmDialog
				isOpen={isConfirmOpen}
				onOpenChange={setIsConfirmOpen}
				title='Delete User'
				description='Are you sure you want to delete this user? This action cannot be undone.'
				confirmLabel='Delete'
				cancelLabel='Cancel'
				onConfirm={handleDelete}
				onCancel={closeConfirmDialog}
				isDestructive={true}
			/>
		</>
	);
};
