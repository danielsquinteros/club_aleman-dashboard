'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EventDialog } from './EventDialog';
import { Loader2, Plus } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { upsertEventAction } from '../actions';

export function AddEventButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { isPending } = useServerAction(upsertEventAction);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)} disabled={isPending}>
				{isPending ? (
					<Loader2 className='h-4 w-4 mr-2 animate-spin' />
				) : (
					<Plus className='h-4 w-4 mr-2' />
				)}
				{isPending ? 'Adding...' : 'Add Event'}
			</Button>
			<EventDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
