'use client';

import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

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

	if (!items?.length) {
		return null;
	}

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
		</ul>
	);
}
