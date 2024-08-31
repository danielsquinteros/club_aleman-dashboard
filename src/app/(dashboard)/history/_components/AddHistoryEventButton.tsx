'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddHistoryEventDialog } from './AddHistoryEventDialog';

export function AddHistoryEventButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>Add History Event</Button>
			<AddHistoryEventDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
