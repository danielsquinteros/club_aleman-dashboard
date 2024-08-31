import { membersList } from '@/data/members';
import { NewMember } from '@/db/schema';

export const members = {
	getAll: async () => {
		// Simulating an API call with a delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return membersList;
	},
	getMembers: async () => {
		// Simulating an API call with a delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return membersList.filter((member) => member.role === 'member');
	},
	getDirectors: async () => {
		// Simulating an API call with a delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		return membersList.filter((member) => member.role !== 'member');
	},
	create: async (member: NewMember) => {
		// Simulating an API call with a delay
		const newMember = {
			id: crypto.randomUUID(),
			...member,
		};
		await new Promise((resolve) => setTimeout(resolve, 500));
		membersList.push(newMember);
	},
};
