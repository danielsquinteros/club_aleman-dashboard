import { NextResponse } from 'next/server';
import { membersDataAccess } from '@/data-access/members';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const members = await membersDataAccess.getAll();
		return NextResponse.json(members);
	} catch (error) {
		console.error('Error fetching members:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
