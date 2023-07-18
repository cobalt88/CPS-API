export function timestampUTC() {
	const timestamp = new Date().toISOString();
	return timestamp;
}

export function timestampLocal() {
	const timestamp = new Date().toLocaleString();
	return timestamp;
}
