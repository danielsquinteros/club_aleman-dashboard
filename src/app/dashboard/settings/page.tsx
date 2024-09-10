'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [language, setLanguage] = useState('en');
	const [timeZone, setTimeZone] = useState('UTC');
	const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
	const [emailFrequency, setEmailFrequency] = useState('weekly');

	// useEffect to handle mounting
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSave = () => {
		// Here you would typically save these settings to your backend
		toast.success('Settings saved successfully');
	};

	const renderSelect = (
		label: string,
		value: string,
		onChange: (value: string) => void,
		options: { value: string; label: string }[],
	) => (
		<div className='flex items-center justify-between'>
			<Label htmlFor={label}>{label}</Label>
			{mounted ? (
				<Select value={value} onValueChange={onChange}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder={`Select ${label.toLowerCase()}`} />
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			) : (
				<Skeleton className='w-[180px] h-10' />
			)}
		</div>
	);

	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Settings</h1>
			<Card>
				<CardHeader>
					<CardTitle>Appearance and Localization</CardTitle>
					<CardDescription>
						Customize how Club Aleman looks and behaves on your device.
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					{renderSelect('Theme', theme || '', setTheme, [
						{ value: 'light', label: 'Light' },
						{ value: 'dark', label: 'Dark' },
						{ value: 'system', label: 'System' },
					])}
					{renderSelect('Language', language, setLanguage, [
						{ value: 'en', label: 'English' },
						{ value: 'es', label: 'Español' },
						{ value: 'de', label: 'Deutsch' },
					])}
				</CardContent>
			</Card>

			<div className='flex justify-end'>
				<Button onClick={handleSave} disabled={!mounted}>
					Save Settings
				</Button>
			</div>
		</div>
	);
}
