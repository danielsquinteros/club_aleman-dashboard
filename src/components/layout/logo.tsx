'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Logo({
	team,
}: {
	team: {
		name: string;
		logo: React.ElementType;
	};
}) {
	return (
		<Link href='/' className='w-full'>
			<div className='flex items-center gap-2 px-2 py-1.5 text-left text-sm transition-all hover:bg-muted/60 rounded-md'>
				<div className='flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-primary-foreground'>
					<team.logo className='h-3.5 w-3.5 shrink-0' />
				</div>
				<div className='line-clamp-1 flex-1 font-medium '>{team.name}</div>
			</div>
		</Link>
	);
}
