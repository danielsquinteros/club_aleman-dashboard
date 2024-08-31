'use client';

import { useState } from 'react';
import { MemberForm, MemberFormValues } from '../_components/MemberForm';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function AddMemberPage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (values: MemberFormValues) => {
		setIsSubmitting(true);
		try {
			// Here you would typically make an API call to create the member
			// For now, we'll just simulate an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success('Member added successfully');
			router.push('/members');
		} catch (error) {
			console.error('Failed to add member:', error);
			toast.error('Failed to add member');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Add Member</h1>
			<div className='flex justify-center items-center'>
				<Card className='min-w-[600px]'>
					<CardHeader>
						<CardTitle>Add a new member to the club</CardTitle>
						<CardDescription>
							Fill in the form below to add a new member to the club.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<MemberForm
							onSubmit={handleSubmit}
							submitButtonText={isSubmitting ? 'Adding...' : 'Add Member'}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
