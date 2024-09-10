'use client';

import { EventForm, EventFormValues } from '../_components/EventForm';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { upsertEventAction } from '../actions';
import { useServerAction } from 'zsa-react';

export default function AddEventPage() {
	const router = useRouter();

	const { execute, isPending } = useServerAction(upsertEventAction, {
		onSuccess: () => {
			toast.success('Event added successfully');
			router.push('/dashboard/events');
		},
		onError: ({ err }) => {
			toast.error(err.message);
		},
	});

	const handleSubmit = (values: EventFormValues) => {
		execute(values);
	};

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Add New Event</h1>
			<div className='flex justify-center items-center'>
				<Card className='min-w-[600px]'>
					<CardHeader>
						<CardTitle>Add a new event to the club</CardTitle>
						<CardDescription>
							Fill in the form below to add a new event to the club.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<EventForm
							onSubmit={handleSubmit}
							submitButtonText='Add Event'
							isSubmitting={isPending}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
