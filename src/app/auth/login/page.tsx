import { getCurrentUser } from '@/lib/session';
import { LoginForm } from '../_components/login-form';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
	const user = await getCurrentUser();
	if (user) {
		return redirect('/dashboard');
	}
	return (
		<div className='flex h-screen w-full items-center justify-center px-4'>
			<LoginForm />
		</div>
	);
}
