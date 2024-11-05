'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GalleryImageDialog } from './GalleryImageDialog';
import { Plus } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { upsertGalleryImageAction } from '../actions';

export function AddGalleryImageButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { isPending } = useServerAction(upsertGalleryImageAction);
	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>
				{isPending ? (
					<Loader2 className='h-4 w-4 mr-2 animate-spin' />
				) : (
					<Plus className='h-4 w-4 mr-2' />
				)}
				{isPending ? 'Adding...' : 'Add Image'}
			</Button>
			<GalleryImageDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
