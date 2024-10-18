import { NextResponse } from 'next/server';
import { mediaItemsDataAccess } from '@/data-access/media-items';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const images = await mediaItemsDataAccess.getAll();
		return NextResponse.json(images);
	} catch (error) {
		console.error('Error fetching media:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
