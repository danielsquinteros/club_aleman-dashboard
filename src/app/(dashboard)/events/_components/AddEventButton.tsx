'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddEventDialog } from './AddEventDialog';

export function AddEventButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>Add Event</Button>
			<AddEventDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
