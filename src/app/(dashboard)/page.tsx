import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Dashboard</h1>
			</div>
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Users</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>1,234</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Events</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>56</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Active Members
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>789</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Revenue</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>$12,345</div>
					</CardContent>
				</Card>
			</div>
			<Card className='col-span-4'>
				<CardHeader>
					<CardTitle>Overview</CardTitle>
				</CardHeader>
				<CardContent></CardContent>
			</Card>
		</div>
	);
}
