'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const memberData = [
	{ name: 'Jan', total: 100 },
	{ name: 'Feb', total: 120 },
	{ name: 'Mar', total: 150 },
	{ name: 'Apr', total: 180 },
	{ name: 'May', total: 220 },
	{ name: 'Jun', total: 250 },
];

const eventData = [
	{ name: 'Jan', total: 5 },
	{ name: 'Feb', total: 8 },
	{ name: 'Mar', total: 12 },
	{ name: 'Apr', total: 15 },
	{ name: 'May', total: 20 },
	{ name: 'Jun', total: 25 },
];

export function DashboardCharts() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const ChartSkeleton = () => (
		<div className='space-y-2'>
			<Skeleton className='h-8 w-40' />
			<Skeleton className='h-[300px] w-full' />
		</div>
	);

	return (
		<div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
			<Card>
				<CardHeader>
					<CardTitle>Member Growth</CardTitle>
				</CardHeader>
				<CardContent>
					{!mounted ? (
						<ChartSkeleton />
					) : (
						<ChartContainer config={{}} className='h-[300px] w-full'>
							<LineChart data={memberData}>
								<ChartTooltip content={<ChartTooltipContent />} />
								<CartesianGrid vertical={false} />
								<XAxis dataKey='name' />
								<YAxis />
								<Line type='monotone' dataKey='total' stroke='#8884d8' />
							</LineChart>
						</ChartContainer>
					)}
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Events per Month</CardTitle>
				</CardHeader>
				<CardContent>
					{!mounted ? (
						<ChartSkeleton />
					) : (
						<ChartContainer config={{}} className='h-[300px] w-full'>
							<BarChart data={eventData}>
								<ChartTooltip content={<ChartTooltipContent />} />
								<CartesianGrid vertical={false} />
								<XAxis dataKey='name' />
								<YAxis />
								<Bar dataKey='total' fill='#8884d8' />
							</BarChart>
						</ChartContainer>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
