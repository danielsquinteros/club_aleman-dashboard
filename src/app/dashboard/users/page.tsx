import { getAllUsersUseCase } from '@/use-cases/users';
import { columns } from './_components/data-table/columns';
import { DataTable } from '@/components/ui/data-table';
import { AddUserButton } from './_components/AddUserButton';
import { assertSuperAdmin } from '@/lib/session';

export default async function UsersPage() {
	await assertSuperAdmin();

	const users = await getAllUsersUseCase();

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>User Management</h1>
				<AddUserButton />
			</div>
			<DataTable columns={columns} data={users} />
		</div>
	);
}
