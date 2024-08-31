'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddGalleryImageDialog } from './AddGalleryImageDialog';

export function AddGalleryImageButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>Add Gallery Image</Button>
			<AddGalleryImageDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
