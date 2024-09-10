'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GalleryImageDialog } from './GalleryImageDialog';

export function AddGalleryImageButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>Add Gallery Image</Button>
			<GalleryImageDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
