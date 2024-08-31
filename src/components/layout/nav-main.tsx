'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, type LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

type NavItem = {
	title: string;
	url: string;
	icon: LucideIcon;
	items?: Omit<NavItem, 'icon' | 'items'>[];
};

export function NavMain({
	className,
	items,
}: {
	items: NavItem[];
} & React.ComponentProps<'ul'>) {
	const pathname = usePathname();
	const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

	useEffect(() => {
		// Initialize open state based on pathname
		const initialOpenState = items.reduce((acc, item) => {
			acc[item.title] = pathname.startsWith(item.url);
			return acc;
		}, {} as Record<string, boolean>);
		setOpenItems(initialOpenState);
	}, [pathname, items]);

	const toggleItem = (title: string) => {
		setOpenItems((prev) => ({ ...prev, [title]: !prev[title] }));
	};

	return (
		<ul
			className={cn(
				'grid gap-1 transition-all duration-300 ease-in-out',
				className,
			)}
		>
			{items.map((item) => (
				<Collapsible
					key={item.title}
					open={openItems[item.title]}
					onOpenChange={() => toggleItem(item.title)}
				>
					<li>
						<div className='relative flex items-center'>
							<Link
								href={item.url}
								className={cn(
									'flex h-8 w-full items-center rounded-md px-3 text-sm font-medium hover:bg-accent',
									pathname === item.url && 'bg-accent',
								)}
							>
								<item.icon className='mr-2 h-4 w-4' />
								{item.title}
							</Link>
							{item.items && (
								<CollapsibleTrigger asChild>
									<Button
										variant='ghost'
										size='sm'
										className='absolute right-0 h-8 w-8 p-0'
									>
										{openItems[item.title] ? (
											<ChevronDown className='h-4 w-4 transition-all duration-300 ease-in-out' />
										) : (
											<ChevronRight className='h-4 w-4 transition-all duration-300 ease-in-out' />
										)}
										<span className='sr-only'>Toggle</span>
									</Button>
								</CollapsibleTrigger>
							)}
						</div>
						{item.items && (
							<CollapsibleContent className='transition-all duration-300 ease-in-out'>
								<ul className='mt-1 grid gap-1 pl-6'>
									{item.items.map((subItem) => (
										<li key={subItem.title}>
											<Link
												href={subItem.url}
												className={cn(
													'flex h-8 items-center rounded-md px-3 text-sm hover:bg-accent',
													pathname === subItem.url && 'bg-accent',
												)}
											>
												{subItem.title}
											</Link>
										</li>
									))}
								</ul>
							</CollapsibleContent>
						)}
					</li>
				</Collapsible>
			))}
		</ul>
	);
}
