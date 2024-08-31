'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Bar,
	BarChart,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

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
		<div className='grid gap-4 md:grid-cols-2'>
			<Card>
				<CardHeader>
					<CardTitle>Member Growth</CardTitle>
				</CardHeader>
				<CardContent>
					{!mounted ? (
						<ChartSkeleton />
					) : (
						<ResponsiveContainer width='100%' height={300}>
							<LineChart data={memberData}>
								<XAxis dataKey='name' />
								<YAxis />
								<Line type='monotone' dataKey='total' stroke='#8884d8' />
							</LineChart>
						</ResponsiveContainer>
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
						<ResponsiveContainer width='100%' height={300}>
							<BarChart data={eventData}>
								<XAxis dataKey='name' />
								<YAxis />
								<Bar dataKey='total' fill='#8884d8' />
							</BarChart>
						</ResponsiveContainer>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
