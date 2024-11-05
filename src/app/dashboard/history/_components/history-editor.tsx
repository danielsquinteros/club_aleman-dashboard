'use client';

import { TiptapEditor } from '@/components/ui/tiptap-editor';
import { useServerAction } from 'zsa-react';
import { updateHistoryAction } from '../actions';
import { toast } from 'sonner';
import { useCallback, useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';

interface HistoryEditorProps {
	initialContent: string;
}

export function HistoryEditor({ initialContent }: HistoryEditorProps) {
	const [content, setContent] = useState(initialContent);
	const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	const { execute } = useServerAction(updateHistoryAction, {
		onSuccess: () => {
			toast.success('History saved successfully');
			setIsSaving(false);
		},
		onError: ({ err }) => {
			toast.error(err.message);
			setIsSaving(false);
		},
	});

	const debouncedSave = useDebouncedCallback((content: string) => {
		if (isAutoSaveEnabled) {
			setIsSaving(true);
			execute(content);
		}
	}, 1000);

	const handleChange = useCallback(
		(newContent: string) => {
			setContent(newContent);
			debouncedSave(newContent);
		},
		[debouncedSave],
	);

	const handleManualSave = () => {
		setIsSaving(true);
		execute(content);
	};

	return (
		<Card>
			<CardContent className='pt-6'>
				<TiptapEditor content={content} onChange={handleChange} />
			</CardContent>
			<CardFooter className='flex justify-between items-center border-t pt-4'>
				<div className='flex items-center space-x-2'>
					<Switch
						id='auto-save'
						checked={isAutoSaveEnabled}
						onCheckedChange={setIsAutoSaveEnabled}
					/>
					<Label htmlFor='auto-save'>Auto-save</Label>
				</div>
				<Button onClick={handleManualSave} disabled={isSaving} size='lg'>
					{isSaving ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Saving...
						</>
					) : (
						<>
							<Save className='mr-2 h-4 w-4' />
							Save
						</>
					)}
				</Button>
			</CardFooter>
		</Card>
	);
}
