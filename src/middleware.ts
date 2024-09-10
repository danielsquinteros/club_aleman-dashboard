import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	// CORS headers
	response.headers.set(
		'Access-Control-Allow-Origin',
		process.env.FRONTEND_URL || 'http://localhost:5173',
	);
	response.headers.set(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS',
	);
	response.headers.set(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization',
	);
	response.headers.set('Access-Control-Max-Age', '86400');

	// Handle preflight requests
	if (request.method === 'OPTIONS') {
		return new NextResponse(null, { status: 200, headers: response.headers });
	}

	return response;
}

export const config = {
	matcher: '/api/:path*',
};
