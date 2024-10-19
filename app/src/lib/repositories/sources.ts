export type Source = {
	name: string;
	categories: {
		name: string;
		words: string[];
	}[];
};

export async function getSources(urls: string[]): Promise<Source[]> {
	const sources: Source[] = [];
	for (const url of urls) {
		try {
			const response = await fetch(url);
			const source = (await response.json()) as Source;
			if (!(source.name && source.categories)) {
				continue;
			}
			sources.push(source);
		} catch (error) {
			console.error(error);
		}
	}
	return sources;
}
