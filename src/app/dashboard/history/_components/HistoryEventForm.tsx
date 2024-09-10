'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useServerAction } from 'zsa-react';
import { toast } from 'sonner';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HistoryEvent } from '@/db/schema';
import { Button } from '@/components/ui/button';
import { upsertHistoryEventAction } from '../actions';

const formSchema = z.object({
	id: z.number().optional(),
	year: z.number().int().min(1800).max(new Date().getFullYear()),
	event: z.string().min(2, {
		message: 'Event title must be at least 2 characters.',
	}),
	description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface HistoryEventFormProps {
	initialData?: Partial<HistoryEvent>;
	onSuccess?: () => void;
}

export function HistoryEventForm({
	initialData,
	onSuccess,
}: HistoryEventFormProps) {
	const { execute, isPending } = useServerAction(upsertHistoryEventAction, {
		onSuccess: () => {
			toast.success(
				initialData?.id
					? 'Event updated successfully'
					: 'Event added successfully',
			);
			form.reset();
			onSuccess?.();
		},
		onError: ({ err }) => {
			toast.error(err.message);
		},
	});

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: initialData?.id,
			year: initialData?.year || new Date().getFullYear(),
			event: initialData?.event || '',
			description: initialData?.description || '',
		},
	});

	const handleSubmit = (values: FormValues) => {
		execute(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='year'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
									onChange={(e) => field.onChange(parseInt(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='event'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Event Title</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Event Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isPending}>
					{isPending
						? 'Submitting...'
						: initialData?.id
						? 'Update Event'
						: 'Add Event'}
				</Button>
			</form>
		</Form>
	);
}
