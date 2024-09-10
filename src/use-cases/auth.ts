import { usersDataAccess } from '@/data-access/users';
import { LoginError } from './errors';
import { verifyPassword } from '@/lib/auth';

export async function signInUseCase(email: string, password: string) {
	const user = await usersDataAccess.getByEmail(email);

	if (!user) {
		throw new LoginError();
	}

	const isPasswordCorrect = await verifyPassword(user.password, password);

	if (!isPasswordCorrect) {
		throw new LoginError();
	}

	return { id: user.id };
}
