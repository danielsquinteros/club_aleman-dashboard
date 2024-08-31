import { members } from '@/data-access/members';
import { Member, MemberRole, NewMember } from '@/db/schema';

export async function getMembersUseCase(): Promise<Member[]> {
	try {
		const allMembers = await members.getAll();
		return allMembers.filter((member) => member.role === 'member');
	} catch (error) {
		console.error('Error fetching members:', error);
		throw new Error('Failed to fetch members');
	}
}

export async function getDirectorsUseCase(): Promise<Member[]> {
	try {
		const allMembers = await members.getAll();
		return allMembers.filter((member) => member.role !== 'member');
	} catch (error) {
		console.error('Error fetching directors:', error);
		throw new Error('Failed to fetch directors');
	}
}

export async function getAllMembersUseCase(): Promise<Member[]> {
	// Fetch your data here
	const rawMembers = await members.getAll();

	// Transform and validate the data
	return rawMembers.map((member) => {
		if (!isValidRole(member.role)) {
			throw new Error(`Invalid role: ${member.role}`);
		}
		return {
			...member,
			role: member.role as MemberRole,
		};
	});
}

export async function addMemberUseCase(member: NewMember) {
	try {
		await members.create(member);
	} catch (error) {
		console.error('Failed to add member:', error);
		throw new Error('Failed to add member');
	}
}

function isValidRole(role: string): role is MemberRole {
	return [
		'member',
		'president',
		'vice_president',
		'secretary',
		'treasurer',
		'board_member',
		'honor_advisor',
		'honor_member',
	].includes(role);
}
