import { hash, verify } from '@node-rs/argon2';

export async function hashPassword(password: string) {
	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	return passwordHash;
}

export async function verifyPassword(passwordHash: string, password: string) {
	return await verify(passwordHash, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});
}
