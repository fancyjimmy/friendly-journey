import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const POST = (async ({ request }) => {
	const { content, name, id, subjectId } = await request.json();

	const result = await prisma.protocol.upsert({
		where: {
			id: id
		},
		update: {
			id: id,
			content: content,
			name: name
		},
		create: {
			content: content,
			name: name,
			subjectId
		}
	});

	return json(result, { status: 201 });
}) satisfies RequestHandler;
