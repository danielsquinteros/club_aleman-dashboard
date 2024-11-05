import { getAllMembersUseCase } from '@/use-cases/members';
import { columns } from './_components/data-table/columns';
import { DataTable } from './_components/data-table/data-table';
import { AddMemberButton } from './_components/AddMemberButton';

export default async function MembersPage() {
	const members = await getAllMembersUseCase();

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Club Members</h1>
				<AddMemberButton />
			</div>
			<DataTable columns={columns} data={members} />
		</div>
	);
}
