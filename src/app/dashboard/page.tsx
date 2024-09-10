import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllMembersUseCase } from '@/use-cases/members';
import { getAllEventsUseCase } from '@/use-cases/events';
import { getAllGalleryImagesUseCase } from '@/use-cases/gallery';
import { getAllHistoryEventsUseCase } from '@/use-cases/history';
import { DashboardCharts } from './_components/DashboardCharts';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';

export default async function DashboardPage() {
	const members = await getAllMembersUseCase();
	const events = await getAllEventsUseCase();
	const galleryImages = await getAllGalleryImagesUseCase();
	const historyEvents = await getAllHistoryEventsUseCase();

	const StatCard = ({ title, value }: { title: string; value: number }) => (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{value}</div>
			</CardContent>
		</Card>
	);

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
			</div>
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<StatCard title='Total Members' value={members.length} />
				<StatCard title='Total Events' value={events.length} />
				<StatCard title='Gallery Images' value={galleryImages.length} />
				<StatCard title='History Events' value={historyEvents.length} />
			</div>
			<Suspense fallback={<ChartsSkeleton />}>
				<DashboardCharts />
			</Suspense>
		</div>
	);
}

function ChartsSkeleton() {
	return (
		<div className='grid gap-4 md:grid-cols-2'>
			<Card>
				<CardHeader>
					<Skeleton className='h-8 w-40' />
				</CardHeader>
				<CardContent>
					<Skeleton className='h-[300px] w-full' />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<Skeleton className='h-8 w-40' />
				</CardHeader>
				<CardContent>
					<Skeleton className='h-[300px] w-full' />
				</CardContent>
			</Card>
		</div>
	);
}
