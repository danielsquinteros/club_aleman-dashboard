'use server';

import { revalidatePath } from 'next/cache';
import { addMemberUseCase } from '@/use-cases/members';
import { NewMember } from '@/db/schema';

export async function addMember(values: NewMember) {
	try {
		// Add the new member to the database
		await addMemberUseCase(values);

		// Revalidate the members page to show the new member
		revalidatePath('/members');
	} catch (error) {
		console.error('Failed to add member:', error);
		throw new Error('Failed to add member');
	}
}
