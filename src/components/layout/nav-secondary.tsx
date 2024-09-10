'use client';

import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react'; // Add these imports
import { Switch } from '@/components/ui/switch'; // Add this import
import { Skeleton } from '@/components/ui/skeleton'; // Add this import
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react'; // Add this import

export function NavSecondary({
	className,
	items,
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
	}[];
} & React.ComponentProps<'ul'>) {
	const pathname = usePathname();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// if (!items?.length) {
	// 	return null;
	// }

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<ul className={cn('grid gap-1', className)}>
			{items.map((item) => (
				<li key={item.title}>
					<Link
						href={item.url}
						className={cn(
							'flex h-8 items-center rounded-md px-3 text-sm hover:bg-accent',
							pathname === item.url && 'bg-accent',
						)}
					>
						<item.icon className='mr-2 h-4 w-4' />
						{item.title}
					</Link>
				</li>
			))}
			{mounted ? (
				<li
					className='flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent cursor-pointer'
					onClick={toggleTheme}
				>
					<div className='flex items-center'>
						{theme === 'dark' ? (
							<Moon className='h-4 w-4 mr-2' />
						) : (
							<Sun className='h-4 w-4 mr-2' />
						)}
						<span className='text-sm'>
							{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
						</span>
					</div>
					<Switch checked={theme === 'dark'} />
				</li>
			) : (
				<li className='flex items-center justify-between px-3 py-2'>
					<div className='flex items-center'>
						<Skeleton className='h-4 w-4 mr-2' />
						<Skeleton className='h-4 w-20' />
					</div>
					<Skeleton className='h-5 w-9' />
				</li>
			)}
		</ul>
	);
}
