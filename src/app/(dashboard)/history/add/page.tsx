'use client';

import { useState } from 'react';
import { AddHistoryEventForm } from '../_components/AddHistoryEventForm';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { HistoryEvent } from '@/db/schema';

export default function AddHistoryEventPage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (values: Omit<HistoryEvent, 'id'>) => {
		setIsSubmitting(true);
		try {
			// Here you would typically make an API call to create the history event
			// For now, we'll just simulate an API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast.success('History event added successfully');
			router.push('/history');
		} catch (error) {
			console.error('Failed to add history event:', error);
			toast.error('Failed to add history event');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Add History Event</h1>
			<div className='flex justify-center items-center'>
				<Card className='min-w-[600px]'>
					<CardHeader>
						<CardTitle>Add a new event to the club's history</CardTitle>
						<CardDescription>
							Fill in the form below to add a new event to the club's history.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<AddHistoryEventForm
							onSubmit={handleSubmit}
							submitButtonText={isSubmitting ? 'Adding...' : 'Add Event'}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
