// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {
	const subject = await prisma.subject.findFirst({
		where: {
			id: parseInt(params.id)
		}
	});

	const protocols = await prisma.protocol.findMany({
		where: {
			subjectId: subject!.id
		}
	});


	return {
		subject: subject,
		protocols: protocols
	}
}) satisfies PageServerLoad;