import { getClubHistoryUseCase } from '@/use-cases/history';
import { HistoryEditor } from './_components/history-editor';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

const EMPTY_HISTORY = `<h2>Club History</h2>
<p>Start writing the club's history here...</p>`;

function EditorSkeleton() {
	return (
		<div className='space-y-4'>
			{/* Toolbar Skeleton */}
			<div className='border rounded-lg p-2 space-x-2 flex flex-wrap gap-2'>
				{[...Array(8)].map((_, i) => (
					<Skeleton key={i} className='h-8 w-8' />
				))}
			</div>

			{/* Editor Content Skeleton */}
			<div className='border rounded-lg p-4 min-h-[300px] space-y-3'>
				<Skeleton className='h-4 w-[90%]' />
				<Skeleton className='h-4 w-[80%]' />
				<Skeleton className='h-4 w-[85%]' />
				<Skeleton className='h-4 w-[75%]' />
				<Skeleton className='h-4 w-[88%]' />
			</div>
		</div>
	);
}

async function HistoryContent() {
	const history = await getClubHistoryUseCase();
	const content = history?.content;

	// Check if content is empty or just contains an empty paragraph
	const isEmpty = !content || content === '<p></p>' || content.trim() === '';

	return <HistoryEditor initialContent={isEmpty ? EMPTY_HISTORY : content} />;
}

export default function HistoryPage() {
	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Club History</h1>
			</div>
			<Suspense fallback={<EditorSkeleton />}>
				<HistoryContent />
			</Suspense>
		</div>
	);
}
