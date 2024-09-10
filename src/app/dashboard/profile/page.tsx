'use client';

import { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
	const [mounted, setMounted] = useState(false);
	const [name, setName] = useState('Admin User');
	const [email, setEmail] = useState('admin@clubaleman.cl');
	const [avatarUrl, setAvatarUrl] = useState('/avatars/admin.jpg');

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSave = () => {
		// Here you would typically save these settings to your backend
		toast.success('Profile updated successfully');
	};

	const renderInput = (
		label: string,
		value: string,
		onChange: (value: string) => void,
	) => (
		<div className='space-y-2'>
			<Label htmlFor={label}>{label}</Label>
			{mounted ? (
				<Input
					id={label}
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			) : (
				<Skeleton className='w-full h-10' />
			)}
		</div>
	);

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Profile</h1>
			<Card>
				<CardHeader>
					<CardTitle>Your Information</CardTitle>
					<CardDescription>
						Manage your personal information and account settings.
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center space-x-4'>
						{mounted ? (
							<Avatar className='w-20 h-20'>
								<AvatarImage src={avatarUrl} alt={name} />
								<AvatarFallback>{name.charAt(0)}</AvatarFallback>
							</Avatar>
						) : (
							<Skeleton className='w-20 h-20 rounded-full' />
						)}
						<Button variant='outline'>Change Avatar</Button>
					</div>
					{renderInput('Name', name, setName)}
					{renderInput('Email', email, setEmail)}
				</CardContent>
			</Card>
			<div className='flex justify-end'>
				<Button onClick={handleSave} disabled={!mounted}>
					Save Changes
				</Button>
			</div>
		</div>
	);
}
