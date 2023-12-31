import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const POST = (async ({ request }) => {
	const { content, name, id } = await request.json();

	const result = await prisma.codeSnippet.create({
		data: {
			id: id,
			content: content,
			name: name
		}
	});

	return json(result, { status: 201 });
}) satisfies RequestHandler;
