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
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { User, userRoles, userRolesEnum } from '@/db/schema';

const baseSchema = z.object({
	id: z.number().optional(),
	email: z.string().email(),
	role: z.enum(userRolesEnum.enumValues),
});

const newUserSchema = baseSchema.extend({
	password: z.string().min(8),
});

const editUserSchema = baseSchema.extend({
	password: z.string().optional(),
});

export type UserFormValues = z.infer<typeof newUserSchema>;

interface UserFormProps {
	initialValues?: Partial<User>;
	onSubmit: (values: UserFormValues) => void;
	submitButtonText: string;
	isSubmitting: boolean;
}

export function UserForm({
	initialValues,
	onSubmit,
	submitButtonText,
	isSubmitting,
}: UserFormProps) {
	const isEditing = !!initialValues?.id;
	const schema = isEditing ? editUserSchema : newUserSchema;

	const form = useForm<UserFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			id: initialValues?.id,
			email: initialValues?.email || '',
			role: initialValues?.role || userRolesEnum.enumValues[0],
			password: '',
		},
	});

	const handleSubmit = (values: UserFormValues) => {
		if (isEditing && !values.password) {
			// If editing and no password provided, remove it from the submission
			const { password, ...restValues } = values;
			onSubmit(restValues as UserFormValues);
		} else {
			onSubmit(values);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} type='email' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{isEditing ? 'New Password (optional)' : 'Password'}
							</FormLabel>
							<FormControl>
								<Input {...field} type='password' />
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
									{userRoles.map((role) => (
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
