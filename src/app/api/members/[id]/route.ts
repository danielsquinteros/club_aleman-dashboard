import { NextResponse } from 'next/server';
import { membersDataAccess } from '@/data-access/members';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	try {
		const member = await membersDataAccess.getById(Number(params.id));
		if (!member) {
			return NextResponse.json({ error: 'Member not found' }, { status: 404 });
		}
		return NextResponse.json(member);
	} catch (error) {
		console.error('Error fetching member:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
