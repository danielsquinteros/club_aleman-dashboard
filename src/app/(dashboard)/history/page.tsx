import { getAllHistoryEventsUseCase } from '@/use-cases/history';
import { columns } from './_components/data-table/columns';
import { DataTable } from '@/components/ui/data-table';
import { AddHistoryEventButton } from './_components/AddHistoryEventButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function HistoryPage() {
	const historyEvents = await getAllHistoryEventsUseCase();

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Club History</h1>
				<div className='space-x-2'>
					<AddHistoryEventButton />
					{/* <Button asChild>
						<Link href='/history/add'>Add Event (Full Page)</Link>
					</Button> */}
				</div>
			</div>
			<DataTable columns={columns} data={historyEvents} />
		</div>
	);
}
