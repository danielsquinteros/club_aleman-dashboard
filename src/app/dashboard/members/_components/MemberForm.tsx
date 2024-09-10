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
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Member, memberRoles, memberRolesEnum } from '@/db/schema';

const formSchema = z.object({
	id: z.number().optional(),
	firstName: z.string().min(2, {
		message: 'First name must be at least 2 characters.',
	}),
	lastName: z.string().min(2, {
		message: 'Last name must be at least 2 characters.',
	}),
	secondSurname: z.string().min(2, {
		message: 'Second surname must be at least 2 characters.',
	}),
	role: z.enum(memberRolesEnum.enumValues),
	phoneNumber: z.string().optional(),
	email: z.string().email().optional().or(z.literal('')),
	address: z.string().optional(),
	joinDate: z.string(),
});

export type MemberFormValues = z.infer<typeof formSchema>;

interface MemberFormProps {
	initialValues?: Partial<Member>;
	onSubmit: (values: MemberFormValues) => void;
	submitButtonText: string;
	isSubmitting: boolean;
}

export function MemberForm({
	initialValues,
	onSubmit,
	submitButtonText,
	isSubmitting,
}: MemberFormProps) {
	const form = useForm<MemberFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: initialValues?.id,
			firstName: initialValues?.firstName || '',
			lastName: initialValues?.lastName || '',
			secondSurname: initialValues?.secondSurname || '',
			role: initialValues?.role || memberRolesEnum.enumValues[0],
			phoneNumber: initialValues?.phoneNumber || '',
			email: initialValues?.email || '',
			address: initialValues?.address || '',
			joinDate:
				initialValues?.joinDate || new Date().toISOString().split('T')[0],
		},
	});

	const handleSubmit = (values: MemberFormValues) => {
		// If email is an empty string, set it to undefined
		if (values.email === '') {
			values.email = undefined;
		}
		onSubmit(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input {...field} />
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
									<Input {...field} />
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
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phoneNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='address'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input {...field} />
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
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a role' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{memberRoles.map((role) => (
											<SelectItem key={role.value} value={role.value}>
												{role.label}
											</SelectItem>
										))}
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
							<FormItem>
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
											disabled={(date) =>
												date > new Date() || date < new Date('1900-01-01')
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
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
