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
import { Textarea } from '@/components/ui/textarea';
import { NewGalleryImage } from '@/db/schema';
import { toast } from 'sonner';

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Title must be at least 2 characters.',
	}),
	url: z.string().url({
		message: 'Please enter a valid URL.',
	}),
	description: z.string().optional(),
});

interface AddGalleryImageFormProps {
	onSubmit: (values: NewGalleryImage) => Promise<void>;
	submitButtonText: string;
	onSuccess?: () => void;
}

export function AddGalleryImageForm({
	onSubmit,
	submitButtonText,
	onSuccess,
}: AddGalleryImageFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			url: '',
			description: '',
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await onSubmit({ ...values, uploadedAt: new Date() });
			toast.success('Gallery image added successfully');
			form.reset();
			onSuccess?.();
		} catch (error) {
			toast.error('Failed to add gallery image');
		}
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
								<Input placeholder='Enter image title' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='url'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image URL</FormLabel>
							<FormControl>
								<Input placeholder='Enter image URL' {...field} />
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
								<Textarea
									placeholder='Enter image description (optional)'
									{...field}
								/>
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
