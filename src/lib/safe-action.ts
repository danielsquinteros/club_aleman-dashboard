import { assertAuthenticated } from '@/lib/session';
import { PublicError } from '@/use-cases/errors';
import { createServerActionProcedure } from 'zsa';

function shapeErrors({ err }: any) {
	const isAllowedError = err instanceof PublicError;
	// let's all errors pass through to the UI so debugging locally is easier
	const isDev = process.env.NODE_ENV === 'development';
	if (isAllowedError || isDev) {
		console.error(err);
		return {
			code: err.code ?? 'ERROR',
			message: `${!isAllowedError && isDev ? 'DEV ONLY ENABLED - ' : ''}${
				err.message
			}`,
		};
	} else {
		return {
			code: 'ERROR',
			message: 'Something went wrong',
		};
	}
}

export const authenticatedAction = createServerActionProcedure()
	.experimental_shapeError(shapeErrors)
	.handler(async () => {
		const user = await assertAuthenticated();

		return { user };
	});

export const unauthenticatedAction = createServerActionProcedure()
	.experimental_shapeError(shapeErrors)
	.handler(async () => {
		return {};
	});

export const adminAction = createServerActionProcedure(authenticatedAction)
	.experimental_shapeError(shapeErrors)
	.handler(async ({ ctx: { user } }) => {
		const isAdmin = ['admin', 'super_admin'].includes(user.role);
		if (!isAdmin) {
			throw new PublicError('You are not authorized to access this resource');
		}
		return { user };
	});

export const superAdminAction = createServerActionProcedure(authenticatedAction)
	.experimental_shapeError(shapeErrors)
	.handler(async ({ ctx: { user } }) => {
		const isSuperAdmin = user.role === 'super_admin';
		if (!isSuperAdmin) {
			throw new PublicError('You are not authorized to access this resource');
		}
		return { user };
	});
