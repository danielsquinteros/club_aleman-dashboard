import { Event } from '@/db/schema';

export const eventsList: Event[] = [
	{
		id: '1',
		title: 'Event 1',
		description: 'Description 1',
		date: '2021-01-01',
		location: 'Location 1',
		status: 'upcoming',
	},
];

export const statuses = [
	{
		label: 'Upcoming',
		value: 'upcoming',
	},
	{
		label: 'Ongoing',
		value: 'ongoing',
	},

	{
		label: 'Completed',
		value: 'completed',
	},
	{
		label: 'Cancelled',
		value: 'cancelled',
	},
];
