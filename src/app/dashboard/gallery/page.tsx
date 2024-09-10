import { getAllGalleryImagesUseCase } from '@/use-cases/gallery';
import { columns } from './_components/data-table/columns';
import { DataTable } from '@/components/ui/data-table';
import { AddGalleryImageButton } from './_components/AddGalleryImageButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function GalleryPage() {
	const galleryImages = await getAllGalleryImagesUseCase();

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Gallery</h1>
				<div className='space-x-2'>
					<AddGalleryImageButton />
					{/* <Button asChild>
						<Link href='/gallery/add'>Add Image (Full Page)</Link>
					</Button> */}
				</div>
			</div>
			<DataTable columns={columns} data={galleryImages} />
		</div>
	);
}
