import { getAllMembersUseCase } from '@/use-cases/members';
import { columns } from './_components/data-table/columns';
import { DataTable } from './_components/data-table/data-table';
import { MemberRole } from '@/db/schema';
import { AddMemberButton } from './_components/AddMemberButton';

export default async function MembersPage() {
	const rawMembers = await getAllMembersUseCase();

	const members = rawMembers.map((member) => ({
		...member,
		role: member.role as MemberRole,
	}));

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>All Members</h1>
				<AddMemberButton />
			</div>
			<DataTable columns={columns} data={members} />
		</div>
	);
}
