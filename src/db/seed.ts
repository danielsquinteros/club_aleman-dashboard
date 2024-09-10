import 'dotenv/config';
import { db, pg } from '@/db';
import { users } from './schema';
import { hashPassword } from '@/lib/auth';

async function seed() {
	const user = await db
		.insert(users)
		.values({
			email: 'superadmin@clubaleman.cl',
			password: await hashPassword('h0l1h0l1'),
			role: 'super_admin',
		})
		.returning();

	console.log('User created', user);
	await pg.end();
}

seed();
