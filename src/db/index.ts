import * as schema from './schema';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let db: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

const connectionString = process.env.DATABASE_URL!;

if (process.env.NODE_ENV === 'production') {
	pg = postgres(connectionString);
	db = drizzle(pg, { schema });
} else {
	if (!(global as any).db!) {
		pg = postgres(connectionString);
		(global as any).db = drizzle(pg, { schema });
	}
	db = (global as any).db;
}

export { db, pg };
