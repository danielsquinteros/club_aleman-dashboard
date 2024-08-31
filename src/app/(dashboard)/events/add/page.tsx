'use client';

import { useState } from 'react';
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
import { addEventUseCase } from '@/use-cases/events';

export default function AddEventPage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (values: EventFormValues) => {
		setIsSubmitting(true);
		try {
			// await addEventUseCase(values);
			toast.success('Event added successfully');
			router.push('/events');
		} catch (error) {
			console.error('Failed to add event:', error);
			toast.error('Failed to add event');
		} finally {
			setIsSubmitting(false);
		}
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
							submitButtonText={isSubmitting ? 'Adding...' : 'Add Event'}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
