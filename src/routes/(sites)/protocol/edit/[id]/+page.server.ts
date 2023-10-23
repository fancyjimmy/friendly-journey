// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const protocol = await prisma.protocol.findUnique({
		where: {
			id: parseInt(params.id)
		},
		include: {
			subject: true,
			codeSnippets: true,
			images: true
		}
	});

	return {
		protocol: protocol
	};
}) satisfies PageServerLoad;
