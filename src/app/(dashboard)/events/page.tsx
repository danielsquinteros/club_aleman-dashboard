import { getAllEventsUseCase } from '@/use-cases/events';
import { columns } from './_components/data-table/columns';
import { DataTable } from './_components/data-table/data-table';
import { AddEventButton } from './_components/AddEventButton';

export default async function EventsPage() {
	const events = await getAllEventsUseCase();

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>All Events</h1>
				<AddEventButton />
			</div>
			<DataTable columns={columns} data={events} />
		</div>
	);
}
