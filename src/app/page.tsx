import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function Home() {
	const user = await getCurrentUser();
	if (user) {
		return redirect('/dashboard');
	} else {
		return redirect('/auth/login');
	}
}
