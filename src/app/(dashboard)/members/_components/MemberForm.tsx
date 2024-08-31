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
	firstName: z.string().min(2, {
		message: 'First name must be at least 2 characters.',
	}),
	lastName: z.string().min(2, {
		message: 'Last name must be at least 2 characters.',
	}),
	secondSurname: z.string().min(2, {
		message: 'Second surname must be at least 2 characters.',
	}),
	role: z.enum([
		'member',
		'board_member',
		'president',
		'vice_president',
		'secretary',
		'treasurer',
		'honor_advisor',
		'honor_member',
	] as const),
	joinDate: z.date({
		required_error: 'A join date is required.',
	}),
});

export type MemberFormValues = z.infer<typeof formSchema>;

interface MemberFormProps {
	initialValues?: Partial<MemberFormValues>;
	onSubmit: (values: MemberFormValues) => Promise<void>;
	submitButtonText: string;
	onSuccess?: () => void;
}

export function MemberForm({
	initialValues,
	onSubmit,
	submitButtonText,
	onSuccess,
}: MemberFormProps) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<MemberFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialValues || {
			firstName: '',
			lastName: '',
			secondSurname: '',
			role: 'member',
			joinDate: new Date(),
		},
	});

	const handleSubmit = (values: MemberFormValues) => {
		startTransition(async () => {
			try {
				await onSubmit(values);
				toast.success('Member added successfully');
				form.reset();
				onSuccess?.();
			} catch (error) {
				toast.error('Failed to add member');
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder='John' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='lastName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input placeholder='Doe' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='secondSurname'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Second Surname</FormLabel>
							<FormControl>
								<Input placeholder='Smith' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='role'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a role' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='member'>Member</SelectItem>
									<SelectItem value='board_member'>Board Member</SelectItem>
									<SelectItem value='president'>President</SelectItem>
									<SelectItem value='vice_president'>Vice President</SelectItem>
									<SelectItem value='secretary'>Secretary</SelectItem>
									<SelectItem value='treasurer'>Treasurer</SelectItem>
									<SelectItem value='honor_advisor'>Honor Advisor</SelectItem>
									<SelectItem value='honor_member'>Honor Member</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='joinDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Join Date</FormLabel>
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
											date > new Date() || date < new Date('1900-01-01')
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>
								The date when the member joined the club.
							</FormDescription>
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
