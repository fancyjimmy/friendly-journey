import { json, type RequestHandler } from '@sveltejs/kit';
import { uploadImage } from '$lib/db/prisma';
import prisma from '$lib/prisma';

export const POST = (async ({ request, cookies }) => {
	const { content, name, protocolHintId } = await request.json();

	const result = await prisma.codeSnippet.create({
		data: {
			content: content,
			name: name,
			protocolHintId: protocolHintId
		}
	});

	return json({}, { status: 201 });
}) satisfies RequestHandler;
