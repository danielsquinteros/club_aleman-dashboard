import { NextResponse } from 'next/server';
import { galleryDataAccess } from '@/data-access/gallery';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const images = await galleryDataAccess.getAll();
		return NextResponse.json(images);
	} catch (error) {
		console.error('Error fetching gallery images:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
