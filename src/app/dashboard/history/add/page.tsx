'use client';

import { useRouter } from 'next/navigation';
import { HistoryEventForm } from '../_components/HistoryEventForm';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function AddEventPage() {
	const router = useRouter();

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Add New History Event</h1>
			<div className='flex'>
				<Card className='w-full max-w-2xl'>
					<CardHeader>
						<CardTitle>Add a new event to the club history</CardTitle>
						<CardDescription>
							Fill in the form below to add a new event to the club history.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<HistoryEventForm
							onSuccess={() => {
								router.push('/dashboard/history');
							}}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
