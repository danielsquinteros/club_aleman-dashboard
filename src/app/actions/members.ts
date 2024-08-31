'use server';

import { revalidatePath } from 'next/cache';
import { MemberFormValues } from '../(dashboard)/members/_components/MemberForm';
import { members } from '@/data-access/members';
import { NewMember } from '@/db/schema';

export async function addMember(values: MemberFormValues) {
	try {
		// Convert the Date object to a string in 'YYYY-MM-DD' format
		const newMember: NewMember = {
			...values,
			joinDate: values.joinDate.toISOString().split('T')[0],
		};

		// Add the new member to the database
		await members.create(newMember);

		// Revalidate the members page to show the new member
		revalidatePath('/members');
	} catch (error) {
		console.error('Failed to add member:', error);
		throw new Error('Failed to add member');
	}
}
