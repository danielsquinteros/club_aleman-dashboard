import 'dotenv/config';
import { db, pg } from '@/db';
import { users, members } from './schema';
import { hashPassword } from '@/lib/auth';
import { membersList } from './data/members';
import { sql } from 'drizzle-orm';

async function seed() {
	// Create super admin user
	const user = await db
		.insert(users)
		.values({
			email: 'superadmin@clubaleman.cl',
			password: await hashPassword('h0l1h0l1'),
			role: 'super_admin',
		})
		.onConflictDoNothing()
		.returning();

	console.log('Super admin user created', user);
	// Insert members
	const insertedMembers = await db
		.insert(members)
		.values(membersList)
		.onConflictDoNothing()
		.returning();

	console.log(`${insertedMembers.length} members inserted`);

	// Update the sequence for the id column
	const result = await db.execute(sql`
    SELECT setval(pg_get_serial_sequence('members', 'id'), (SELECT MAX(id) FROM members));
  `);

	console.log('Member ID sequence updated');

	await pg.end();
}

seed().catch(console.error);
