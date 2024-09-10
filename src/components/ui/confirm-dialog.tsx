'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface ConfirmDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm: () => void;
	onCancel?: () => void;
	isDestructive?: boolean;
}

export function ConfirmDialog({
	isOpen,
	onOpenChange,
	title,
	description,
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
	onConfirm,
	onCancel,
	isDestructive = false,
}: ConfirmDialogProps) {
	const handleConfirm = () => {
		onConfirm();
		onOpenChange(false);
	};

	const handleCancel = () => {
		onCancel?.();
		onOpenChange(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant='outline' onClick={handleCancel}>
						{cancelLabel}
					</Button>
					<Button
						variant={isDestructive ? 'destructive' : 'default'}
						onClick={handleConfirm}
					>
						{confirmLabel}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export function useConfirmDialog() {
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = () => setIsOpen(true);
	const closeDialog = () => setIsOpen(false);

	return { isOpen, setIsOpen, openDialog, closeDialog };
}
