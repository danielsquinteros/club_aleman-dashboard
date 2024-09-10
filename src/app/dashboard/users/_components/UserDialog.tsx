'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { UserForm, UserFormValues } from './UserForm';
import { User } from '@/db/schema';
import { upsertUserAction } from '../actions';
import { useServerAction } from 'zsa-react';
import { toast } from 'sonner';

interface UserDialogProps {
	isOpen: boolean;
	onClose: () => void;
	initialData?: User;
}

export function UserDialog({ isOpen, onClose, initialData }: UserDialogProps) {
	const isEditing = !!initialData;

	const { execute, isPending } = useServerAction(upsertUserAction, {
		onSuccess: () => {
			toast.success(
				isEditing ? 'User updated successfully' : 'User added successfully',
			);
			onClose();
		},
		onError: ({ err }) => {
			toast.error(err.message);
		},
	});

	const handleSubmit = (values: UserFormValues) => {
		if (isEditing && !values.password) {
			// If editing and no password provided, remove it from the submission
			const { password, ...restValues } = values;
			execute(restValues);
		} else {
			execute(values);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
					<DialogDescription>
						{isEditing
							? 'Edit the details of this user.'
							: 'Fill in the details to add a new user.'}
					</DialogDescription>
				</DialogHeader>
				<UserForm
					initialValues={initialData}
					onSubmit={handleSubmit}
					submitButtonText={isEditing ? 'Update User' : 'Add User'}
					isSubmitting={isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
