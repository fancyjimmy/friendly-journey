import { json, type RequestHandler } from '@sveltejs/kit';
import { uploadImage } from '$lib/db/prisma';

export const POST = (async ({ request, cookies }) => {
	const { file, protocol, name } = await request.json();
	uploadImage(file, protocol, name);

	return json({}, { status: 201 });
}) satisfies RequestHandler;
