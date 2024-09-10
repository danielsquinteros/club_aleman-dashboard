'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MemberDialog } from './MemberDialog';
import { Loader2, Plus } from 'lucide-react';
import { useServerAction } from 'zsa-react';
import { upsertMemberAction } from '../actions';

export function AddMemberButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { isPending } = useServerAction(upsertMemberAction);

	return (
		<>
			<Button onClick={() => setIsDialogOpen(true)} disabled={isPending}>
				{isPending ? (
					<Loader2 className='h-4 w-4 mr-2 animate-spin' />
				) : (
					<Plus className='h-4 w-4 mr-2' />
				)}
				{isPending ? 'Adding...' : 'Add Member'}
			</Button>
			<MemberDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			/>
		</>
	);
}
