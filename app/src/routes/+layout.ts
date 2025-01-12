import { WORD_SOURCE_MAP_URL } from '$lib/config/env.js';

export const ssr = false;

export async function load() {
	let a = new Map<string, string>();

	try {
		const res = await fetch(WORD_SOURCE_MAP_URL);
		const b = await res.json();
		a = new Map(Object.entries(b));
	} catch (error) {
		console.error(error);
	}

	a.set('マイワード', '');
	return {
		urls: a
	};
}
