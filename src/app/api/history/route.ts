import { NextResponse } from 'next/server';
import { historyDataAccess } from '@/data-access/history';

export async function GET() {
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
