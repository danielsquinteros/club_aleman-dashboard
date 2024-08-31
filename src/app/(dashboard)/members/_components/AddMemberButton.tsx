'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddMemberDialog } from './AddMemberDialog';

export function AddMemberButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)}>Add Member</Button>
			<AddMemberDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
