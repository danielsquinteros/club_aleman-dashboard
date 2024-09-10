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
import { GalleryImage } from '@/db/schema';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(2, {
		message: 'Title must be at least 2 characters.',
	}),
	url: z.string().url({
		message: 'Please enter a valid URL.',
	}),
	description: z.string().optional(),
	uploadedAt: z.string().optional(),
});

export type GalleryImageFormValues = z.infer<typeof formSchema>;

interface GalleryImageFormProps {
	initialValues?: GalleryImage;
	onSubmit: (values: GalleryImageFormValues) => void;
	submitButtonText: string;
	isSubmitting: boolean;
}

export function GalleryImageForm({
	initialValues,
	onSubmit,
	submitButtonText,
	isSubmitting,
}: GalleryImageFormProps) {
	const form = useForm<GalleryImageFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: initialValues?.id,
			title: initialValues?.title || '',
			url: initialValues?.url || '',
			description: initialValues?.description || '',
			uploadedAt: initialValues?.uploadedAt || new Date().toISOString(),
		},
	});

	const handleSubmit = (values: GalleryImageFormValues) => {
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
