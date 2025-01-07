export type WordSource = {
	name: string;
	categories: {
		name: string;
		words: string[];
	}[];
};

export async function getWordSource(url: string): Promise<WordSource> {
	let source = {} as WordSource;
	try {
		const response = await fetch(url);
		source = (await response.json()) as WordSource;
		if (!(source.name && source.categories)) {
			throw new Error('Invalid source format');
		}
	} catch (error) {
		console.error(error);
	}
	return source;
}
