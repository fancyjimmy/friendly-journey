export const PROTOCOL_API = '/api/protocol';
export async function upsertProtocol(
	content: string,
	protocolId: number,
	name: string,
	subjectId: number
) {
	const response = await fetch('/api/protocol', {
		body: JSON.stringify({
			content,
			id: protocolId,
			name: name,
			subjectId: subjectId
		}),
		method: 'POST'
	});

	const json = await response.json();
	return json;
}
