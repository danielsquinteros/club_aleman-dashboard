import { members } from '@/data-access/members';
import { Member, NewMember } from '@/db/schema';

export async function getAllMembersUseCase(): Promise<Member[]> {
	try {
		return await members.getAll();
	} catch (error) {
		console.error('Error fetching members:', error);
		throw new Error('Failed to fetch members');
	}
}

export async function addMemberUseCase(member: NewMember): Promise<void> {
	try {
		await members.create(member);
	} catch (error) {
		console.error('Failed to add member:', error);
		throw new Error('Failed to add member');
	}
}
