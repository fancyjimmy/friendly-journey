import { json, type RequestHandler } from '@sveltejs/kit';
import { uploadImage } from '$lib/db/prisma';

export const POST = (async ({ request, cookies }) => {
	const { file, protocol, name } = await request.json();
	const result = await uploadImage(file, protocol, name);

	return json(result, { status: 201 });
}) satisfies RequestHandler;
