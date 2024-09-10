'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Event, eventStatuses, eventStatusesEnum } from '@/db/schema';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(2, {
		message: 'Title must be at least 2 characters.',
	}),
	description: z.string().min(2, {
		message: 'Description must be at least 2 characters.',
	}),
	date: z.string(),
	location: z.string().min(2, {
		message: 'Location must be at least 2 characters.',
	}),
	status: z.enum(eventStatusesEnum.enumValues),
});

export type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
	initialValues?: Partial<Event>;
	onSubmit: (values: EventFormValues) => void;
	submitButtonText: string;
	isSubmitting: boolean;
}

export function EventForm({
	initialValues,
	onSubmit,
	submitButtonText,
	isSubmitting,
}: EventFormProps) {
	const form = useForm<EventFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: initialValues?.id,
			title: initialValues?.title || '',
			description: initialValues?.description || '',
			date: initialValues?.date || new Date().toISOString().split('T')[0],
			location: initialValues?.location || '',
			status: initialValues?.status || 'upcoming',
		},
	});

	const handleSubmit = (values: EventFormValues) => {
		onSubmit(values);
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
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem>
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
												format(new Date(field.value), 'PPP')
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
										selected={field.value ? new Date(field.value) : undefined}
										onSelect={(date) =>
											field.onChange(date?.toISOString().split('T')[0] || '')
										}
										disabled={(date) => date < new Date('1900-01-01')}
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
								<Input {...field} />
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
										<SelectValue placeholder='Select a status' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{eventStatuses.map((status) => (
										<SelectItem key={status.value} value={status.value}>
											{status.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isSubmitting} className='w-full'>
					{isSubmitting ? (
						<>
							<Loader2 className='h-4 w-4 mr-2 animate-spin' />
							Submitting...
						</>
					) : (
						submitButtonText
					)}
				</Button>
			</form>
		</Form>
	);
}
