import type { Actions } from './$types';
// src/routes/+page.server.ts
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	const subjects = await prisma.subject.findMany();
	return {
		subjects: subjects
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const name = form.get('name') as string;
		const subjectId = form.get('subjectId') as string | undefined;
		const content = form.get('content') as string;

		const protocol = await prisma.protocol.create({
			data: { name, subjectId: Number(subjectId), content }
		});

		throw redirect(301, `/protocol/${protocol.id}`);
	}
} satisfies Actions;
