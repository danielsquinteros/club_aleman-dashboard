'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { toast } from 'sonner';

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Title must be at least 2 characters.',
	}),
	description: z.string().min(10, {
		message: 'Description must be at least 10 characters.',
	}),
	date: z.date({
		required_error: 'A date is required.',
	}),
	location: z.string().min(2, {
		message: 'Location must be at least 2 characters.',
	}),
	status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']),
});

export type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
	initialValues?: Partial<EventFormValues>;
	onSubmit: (values: EventFormValues) => Promise<void>;
	submitButtonText: string;
	onSuccess?: () => void;
}

export function EventForm({
	initialValues,
	onSubmit,
	submitButtonText,
	onSuccess,
}: EventFormProps) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<EventFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialValues || {
			title: '',
			description: '',
			date: new Date(),
			location: '',
			status: 'upcoming',
		},
	});

	const handleSubmit = (values: EventFormValues) => {
		startTransition(async () => {
			try {
				await onSubmit(values);
				toast.success('Event submitted successfully');
				form.reset();
				onSuccess?.();
			} catch (error) {
				toast.error('Failed to submit event');
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Event title' {...field} />
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
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input placeholder='Event description' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={'outline'}
											className={cn(
												'w-full pl-3 text-left font-normal',
												!field.value && 'text-muted-foreground',
											)}
										>
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date < new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Location</FormLabel>
							<FormControl>
								<Input placeholder='Event location' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='status'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select event status' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='upcoming'>Upcoming</SelectItem>
									<SelectItem value='ongoing'>Ongoing</SelectItem>
									<SelectItem value='completed'>Completed</SelectItem>
									<SelectItem value='cancelled'>Cancelled</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full' disabled={isPending}>
					{isPending ? 'Submitting...' : submitButtonText}
				</Button>
			</form>
		</Form>
	);
}
