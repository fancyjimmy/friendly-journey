// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const protocols = await prisma.protocol.findMany({
		select: {
			id: true,
			name: true,
			createdAt: true,
			subject: {
				select: {
					name: true
				}
			}
		}
	});

	return {
		protocols: protocols
	};
}) satisfies PageServerLoad;
