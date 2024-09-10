import { usersDataAccess } from '@/data-access/users';
import { NewUser, User } from '@/db/schema';
import { NotFoundError } from './errors';
import { hashPassword } from '@/lib/auth';

export async function getUserByEmailUseCase(email: string) {
	try {
		return usersDataAccess.getByEmail(email);
	} catch (error) {
		console.error('Error fetching user:', error);
		throw new Error('Failed to fetch user');
	}
}

type UpsertUserInput = Partial<User> & { password?: string };

export async function upsertUserUseCase(user: UpsertUserInput) {
	try {
		if ('id' in user && user.id) {
			const id = Number(user.id);
			if (isNaN(id)) {
				throw new Error('Invalid ID');
			}
			const existingUser = await usersDataAccess.getById(id);
			if (!existingUser) {
				throw new NotFoundError('User');
			}
			const updateData = { ...user } as Partial<NewUser>;
			if (updateData.password === undefined || updateData.password === '') {
				delete updateData.password;
			} else {
				updateData.password = await hashPassword(updateData.password);
			}
			await usersDataAccess.update(id, updateData);
		} else {
			if (!user.password) {
				throw new Error('Password is required for new users');
			}
			user.password = await hashPassword(user.password);
			await usersDataAccess.create(user as NewUser);
		}
	} catch (error) {
		console.error('Failed to upsert user:', error);
		if (error instanceof NotFoundError) {
			throw error;
		}
		throw new Error('Failed to upsert user');
	}
}

export async function deleteUserUseCase(id: number) {
	try {
		return usersDataAccess.delete(id);
	} catch (error) {
		console.error('Error deleting user:', error);
		throw new Error('Failed to delete user');
	}
}

export async function getAllUsersUseCase() {
	try {
		return usersDataAccess.getAll();
	} catch (error) {
		console.error('Error fetching users:', error);
		throw new Error('Failed to fetch users');
	}
}
