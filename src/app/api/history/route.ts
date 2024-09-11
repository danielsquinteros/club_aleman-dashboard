import { NextResponse } from 'next/server';
import { historyDataAccess } from '@/data-access/history';
import { noStore } from '@/lib/no-store';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
	noStore();
	try {
		const events = await historyDataAccess.getAll();
		return NextResponse.json(events);
	} catch (error) {
		console.error('Error fetching history events:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
