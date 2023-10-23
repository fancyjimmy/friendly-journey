// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.subject.findMany();
	return {
		subjects: response
	}
}) satisfies PageServerLoad;