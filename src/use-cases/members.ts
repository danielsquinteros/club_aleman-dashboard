import { membersDataAccess } from '@/data-access/members';
import { Member, NewMember } from '@/db/schema';
import { NotFoundError } from './errors';

export async function getAllMembersUseCase(): Promise<Member[]> {
	try {
		return await membersDataAccess.getAll();
	} catch (error) {
		console.error('Error fetching members:', error);
		throw new Error('Failed to fetch members');
	}
}

export async function upsertMemberUseCase(member: NewMember): Promise<void> {
	try {
		if ('id' in member && member.id) {
			const id = Number(member.id);
			if (isNaN(id)) {
				throw new Error('Invalid ID');
			}
			const existingMember = await membersDataAccess.getById(id);
			if (!existingMember) {
				throw new NotFoundError('Member');
			}
			await membersDataAccess.update(id, member);
		} else {
			await membersDataAccess.create(member);
		}
	} catch (error) {
		console.error('Failed to upsert member:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to upsert member');
	}
}

export async function getMemberByIdUseCase(id: number): Promise<Member | null> {
	try {
		const member = await membersDataAccess.getById(id);
		return member || null;
	} catch (error) {
		console.error('Error fetching member:', error);
		throw new Error('Failed to fetch member');
	}
}

export async function deleteMemberUseCase(id: number): Promise<void> {
	try {
		const existingMember = await membersDataAccess.getById(id);
		if (!existingMember) {
			throw new NotFoundError('Member');
		}
		await membersDataAccess.delete(id);
	} catch (error) {
		console.error('Failed to delete member:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to delete member');
	}
}
