import { membersList } from '@/db/data/members';
import { NewMember } from '@/db/schema';

export const members = {
	getAll: async () => {
		// Simulating an API call with a delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return membersList;
	},
	create: async (member: NewMember) => {
		const newMember = {
			id: crypto.randomUUID(),
			...member,
		};

		await new Promise((resolve) => setTimeout(resolve, 500));
		membersList.push(newMember);
	},
};
