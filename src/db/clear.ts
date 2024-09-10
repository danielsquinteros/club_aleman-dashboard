import 'dotenv/config';

import { sql } from 'drizzle-orm';
import { db, pg } from './index';
import { userRolesEnum, memberRolesEnum } from './schema';

async function main() {
	const tablesSchema = db._.schema;
	if (!tablesSchema) throw new Error('Schema not loaded');

	// Drop the existing schema
	await db.execute(sql.raw(`DROP SCHEMA IF EXISTS "drizzle" CASCADE;`));
	await db.execute(sql.raw(`DROP SCHEMA public CASCADE;`));

	// Recreate the public schema
	await db.execute(sql.raw(`CREATE SCHEMA public;`));
	await db.execute(sql.raw(`GRANT ALL ON SCHEMA public TO public;`));
	await db.execute(
		sql.raw(`COMMENT ON SCHEMA public IS 'standard public schema';`),
	);

	// Drop enums
	const dropEnumQueries = [
		`DROP TYPE IF EXISTS ${userRolesEnum.enumName};`,
		`DROP TYPE IF EXISTS ${memberRolesEnum.enumName};`,
		`DROP TYPE IF EXISTS role;`,
	];

	for (const query of dropEnumQueries) {
		await db.execute(sql.raw(query));
	}

	console.log('Schema and enums cleared successfully.');
	await pg.end();
}

main().catch((error) => {
	console.error('Error clearing schema:', error);
	process.exit(1);
});
