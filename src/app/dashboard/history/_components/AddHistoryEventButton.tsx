'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HistoryEventDialog } from './HistoryEventDialog';

export function AddHistoryEventButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>Add Event</Button>
			<HistoryEventDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
