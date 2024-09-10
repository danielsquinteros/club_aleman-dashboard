import { usersDataAccess } from '@/data-access/users';
import { LoginError } from './errors';

export async function signInUseCase(email: string, password: string) {
	const user = await usersDataAccess.getByEmail(email);

	if (!user) {
		throw new LoginError();
	}

	const isPasswordCorrect = await usersDataAccess.verifyPassword(
		email,
		password,
	);

	if (!isPasswordCorrect) {
		throw new LoginError();
	}

	return { id: user.id };
}
