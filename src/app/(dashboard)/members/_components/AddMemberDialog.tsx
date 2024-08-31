'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { MemberForm, MemberFormValues } from './MemberForm';
import { addMember } from '../actions';
import { NewMember } from '@/db/schema';

interface AddMemberDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export function AddMemberDialog({ isOpen, onClose }: AddMemberDialogProps) {
	const handleSubmit = async (values: MemberFormValues) => {
		const newMember: NewMember = {
			...values,
			joinDate: values.joinDate.toISOString().split('T')[0], // Convert Date to string
		};
		await addMember(newMember);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add New Member</DialogTitle>
					<DialogDescription>
						Fill in the details to add a new member.
					</DialogDescription>
				</DialogHeader>
				<MemberForm
					onSubmit={handleSubmit}
					submitButtonText='Add Member'
					onSuccess={onClose}
				/>
			</DialogContent>
		</Dialog>
	);
}
