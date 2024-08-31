import { AddGalleryImageForm } from '../_components/AddGalleryImageForm';

export default function AddGalleryImagePage() {
	return (
		<div className='space-y-6'>
			<h1 className='text-3xl font-bold'>Add New Gallery Image</h1>
			<div className='max-w-2xl'>
				<AddGalleryImageForm />
			</div>
		</div>
	);
}
