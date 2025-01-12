import { getWordSource } from '$lib/repositories/wordSource';

export async function load({ params, parent }) {
	const { urls } = await parent();
	const url = urls.get(params.wordSource);

	if (url) {
		return {
			wordSource: await getWordSource(url)
		};
	}
	return {
		wordSource: null
	};
}
