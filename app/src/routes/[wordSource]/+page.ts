import { DEFAULT_WORD_SOURCE_URL } from '$lib/config/env';
import { getWordSource } from '$lib/repositories/wordSource';

export async function load() {
	if (!DEFAULT_WORD_SOURCE_URL) {
		return null;
	}
	return await getWordSource(DEFAULT_WORD_SOURCE_URL);
}
