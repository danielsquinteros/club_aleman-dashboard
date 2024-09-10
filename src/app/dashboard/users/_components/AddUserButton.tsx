'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserDialog } from './UserDialog';
import { Loader2, Plus } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { upsertUserAction } from '../actions';

export function AddUserButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { isPending } = useServerAction(upsertUserAction);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)} disabled={isPending}>
				{isPending ? (
					<Loader2 className='h-4 w-4 mr-2 animate-spin' />
				) : (
					<Plus className='h-4 w-4 mr-2' />
				)}
				{isPending ? 'Adding...' : 'Add User'}
			</Button>
			<UserDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
