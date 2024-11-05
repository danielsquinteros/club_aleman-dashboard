'use client';

import { useState } from 'react';
import { MemberForm } from '../_components/MemberForm';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { upsertMemberAction } from '../actions';
import { useServerAction } from 'zsa-react';

export default function AddMemberPage() {
	const router = useRouter();

	const { execute, isPending } = useServerAction(upsertMemberAction, {
		onSuccess: () => {
			toast.success('Member added successfully');
			router.push('/dashboard/members');
		},
		onError: ({ err }) => {
			toast.error(err.message);
		},
	});

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Add Member</h1>
			<div className='flex'>
				<Card className='w-full max-w-3xl'>
					<CardHeader>
						<CardTitle>Add a new member to the club</CardTitle>
						<CardDescription>
							Fill in the form below to add a new member to the club.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<MemberForm
							onSubmit={execute}
							submitButtonText='Add Member'
							isSubmitting={isPending}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
