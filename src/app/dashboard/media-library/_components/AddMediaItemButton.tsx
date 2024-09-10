'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MediaItemDialog } from './MediaItemDialog';
import { Loader2, Plus } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { upsertMediaItemAction } from '../actions';

export function AddMediaItemButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { isPending } = useServerAction(upsertMediaItemAction);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)} disabled={isPending}>
				{isPending ? (
					<Loader2 className='h-4 w-4 mr-2 animate-spin' />
				) : (
					<Plus className='h-4 w-4 mr-2' />
				)}
				{isPending ? 'Adding...' : 'Add Media Item'}
			</Button>
			<MediaItemDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
