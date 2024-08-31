'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { HistoryEvent } from '@/db/schema';

const formSchema = z.object({
	year: z.number().int().min(1800).max(new Date().getFullYear()),
	event: z.string().min(2, {
		message: 'Event description must be at least 2 characters.',
	}),
});

interface AddHistoryEventFormProps {
	onSubmit: (values: Omit<HistoryEvent, 'id'>) => Promise<void>;
	submitButtonText: string;
	onSuccess?: () => void;
}

export function AddHistoryEventForm({
	onSubmit,
	submitButtonText,
	onSuccess,
}: AddHistoryEventFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			year: new Date().getFullYear(),
			event: '',
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await onSubmit(values);
			toast.success('History event added successfully');
			form.reset();
			onSuccess?.();
		} catch (error) {
			toast.error('Failed to add history event');
		}
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
							<FormLabel>Event Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>{submitButtonText}</Button>
			</form>
		</Form>
	);
}
