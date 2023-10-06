import { writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import prisma from '$lib/prisma';

export async function uploadImage(file: string, protocol: number | null, name: string | null) {
	const fileName = uuidv4();
	writeFileSync(`static/dynamic/images/${fileName}.png`, file, { encoding: 'base64' });
	const result = await prisma.image.create({
		data: {
			name: name,
			file: fileName,
			protocolHintId: protocol
		}
	});
	return result;
}
