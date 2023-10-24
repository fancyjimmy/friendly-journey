// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { PageServerLoad } from '../../../../../.svelte-kit/types/src/routes';

export const load = (async ({ params }) => {
	const id = parseInt(params.id);
	if (!id) return;

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
		protocolId: protocol?.id,
		protocol: protocol
	};
}) satisfies PageServerLoad;
