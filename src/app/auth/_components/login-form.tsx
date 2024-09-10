'use client';

import { useRouter } from 'next/navigation';
import { signInAction } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useServerAction } from 'zsa-react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { execute, isPending } = useServerAction(signInAction, {
		onSuccess: () => {
			form.reset();
			router.push('/dashboard');
		},
		onError: ({ err }) => {
			toast.error('Something went wrong', {
				description: err.message,
			});
		},
	});
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: FormValues) => {
		execute(values);
	};

	return (
		<Card className='mx-auto max-w-sm'>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='me@example.com' {...field} />
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
									<div className='flex items-center'>
										<FormLabel>Password</FormLabel>
										{/* <Link
											href='/auth/forgot-password'
											className='ml-auto inline-block text-sm underline'
										>
											Forgot your password?
										</Link> */}
									</div>
									<FormControl>
										<div className='relative'>
											<Input
												type={showPassword ? 'text' : 'password'}
												{...field}
											/>
											<Button
												type='button'
												variant='ghost'
												size='sm'
												className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? (
													<EyeOff className='h-4 w-4' />
												) : (
													<Eye className='h-4 w-4' />
												)}
												<span className='sr-only'>
													{showPassword ? 'Hide password' : 'Show password'}
												</span>
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full' disabled={isPending}>
							{isPending ? 'Logging in...' : 'Login'}
						</Button>
					</form>
				</Form>
				{/* <div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/auth/signup' className='underline'>
						Sign up
					</Link>
				</div> */}
			</CardContent>
		</Card>
	);
}
