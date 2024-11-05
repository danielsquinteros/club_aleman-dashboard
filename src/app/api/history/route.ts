import { NextResponse } from 'next/server';
import { historyDataAccess } from '@/data-access/history';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const history = await historyDataAccess.get();
		return NextResponse.json(history);
	} catch (error) {
		console.error('Error fetching history events:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
