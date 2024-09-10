import { getAllMediaItemsUseCase } from '@/use-cases/media-library';
import { columns } from './_components/data-table/columns';
import { DataTable } from '@/components/ui/data-table';
import { AddMediaItemButton } from './_components/AddMediaItemButton';

export default async function MediaLibraryPage() {
	const mediaItems = await getAllMediaItemsUseCase();

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Media Library</h1>
				<AddMediaItemButton />
			</div>
			<DataTable columns={columns} data={mediaItems} />
		</div>
	);
}
