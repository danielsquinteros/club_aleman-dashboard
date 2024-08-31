import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Activity = {
	id: string;
	type: 'member' | 'event' | 'gallery' | 'history';
	description: string;
	date: string;
};

const activities: Activity[] = [
	{
		id: '1',
		type: 'member',
		description: 'New member joined: John Doe',
		date: '2023-05-01',
	},
	{
		id: '2',
		type: 'event',
		description: 'New event created: Summer BBQ',
		date: '2023-05-02',
	},
	{
		id: '3',
		type: 'gallery',
		description: 'New image uploaded: Club Anniversary',
		date: '2023-05-03',
	},
	{
		id: '4',
		type: 'history',
		description: 'Historical event added: Club Foundation',
		date: '2023-05-04',
	},
];

export function RecentActivity() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className='space-y-4'>
					{activities.map((activity) => (
						<li key={activity.id} className='flex items-center'>
							<span className='mr-2 h-2 w-2 rounded-full bg-blue-500'></span>
							<div>
								<p className='text-sm font-medium'>{activity.description}</p>
								<p className='text-xs text-muted-foreground'>{activity.date}</p>
							</div>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
