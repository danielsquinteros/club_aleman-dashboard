'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { MemberForm, MemberFormValues } from './MemberForm';
import { toast } from 'sonner';
import { Member, MemberRole } from '@/db/schema';
import { format, parseISO } from 'date-fns';

interface EditMemberDialogProps {
	member: Member;
	onMemberUpdated: (updatedMember: Member) => void;
	onClose: () => void; // Add this line
}

export function EditMemberDialog({
	member,
	onMemberUpdated,
	onClose, // Add this line
}: EditMemberDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	console.log('Member data in EditMemberDialog:', member); // Add this line

	const handleSubmit = async (values: MemberFormValues) => {
		try {
			console.log('Submitted values in EditMemberDialog:', values);

			const updatedMember: Member = {
				...member,
				...values,
				joinDate: format(values.joinDate, 'yyyy-MM-dd'),
				role: values.role as MemberRole,
			};

			console.log('Updated member in EditMemberDialog:', updatedMember);

			onMemberUpdated(updatedMember);
			setIsOpen(false);
			toast.success('Member updated successfully');
		} catch (error) {
			console.error('Failed to update member:', error);
			toast.error('Failed to update member');
		}
	};

	const handleClose = () => {
		// Any cleanup logic if needed
		setIsOpen(false);
		onClose(); // Call the onClose prop when closing the dialog
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					onClick={() => setIsOpen(true)}
					className='flex items-center gap-2'
				>
					<Pencil className='h-4 w-4' />
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit Member</DialogTitle>
					<DialogDescription>Edit the member details below.</DialogDescription>
				</DialogHeader>
				<MemberForm
					initialValues={{
						...member,
						joinDate: parseISO(member.joinDate), // Convert string to Date
					}}
					onSubmit={handleSubmit}
					submitButtonText='Update Member'
				/>
			</DialogContent>
		</Dialog>
	);
}
