'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { MemberForm, MemberFormValues } from './MemberForm';
import { Member } from '@/db/schema';
import { upsertMemberAction } from '../actions';
import { useServerAction } from 'zsa-react';
import { toast } from 'sonner';

interface MemberDialogProps {
	isOpen: boolean;
	onClose: () => void;
	initialData?: Member;
}

export function MemberDialog({
	isOpen,
	onClose,
	initialData,
}: MemberDialogProps) {
	const isEditing = !!initialData;

	const { execute, isPending } = useServerAction(upsertMemberAction, {
		onSuccess: () => {
			toast.success(
				isEditing ? 'Member updated successfully' : 'Member added successfully',
			);
			onClose();
		},
		onError: ({ err }) => {
			toast.error(err.message);
		},
	});

	const handleSubmit = (values: MemberFormValues) => {
		execute(values);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditing ? 'Edit Member' : 'Add New Member'}
					</DialogTitle>
					<DialogDescription>
						{isEditing
							? 'Edit the details of this member.'
							: 'Fill in the details to add a new member.'}
					</DialogDescription>
				</DialogHeader>
				<MemberForm
					initialValues={initialData}
					onSubmit={handleSubmit}
					submitButtonText={isEditing ? 'Update Member' : 'Add Member'}
					isSubmitting={isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
