export function randInt(min: number, max: number) {
	const range = max - min;
	return Math.round(Math.random() * range + min);
}
