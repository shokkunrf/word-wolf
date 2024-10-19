import { readonly, writable } from 'svelte/store';

function getRandomIndex(ary: ArrayLike<any>): number {
	return Math.floor(Math.random() * ary.length);
}

function getTargetWords(sourceWords: string[]): [string, string] {
	if (sourceWords.length < 2) {
		throw new Error('sourceWords must have at least 2 words');
	}
	const word1 = sourceWords[getRandomIndex(sourceWords)];
	const filteredWords = sourceWords.filter((word) => word !== word1);
	const word2 = filteredWords[getRandomIndex(filteredWords)];
	return [word1, word2];
}

function getAllPlayersCards(
	wolfWord: string,
	villagerWord: string,
	wolfCount: number,
	participantCount: number
): string[] {
	if (wolfCount >= participantCount) {
		throw new Error('wolfCount must be less than participantCount');
	}
	const pool = Array<string>(participantCount).fill(villagerWord);

	let i = 0;
	while (i < wolfCount) {
		const idx = getRandomIndex(pool);
		if (pool[idx] !== wolfWord) {
			pool[idx] = wolfWord;
			i++;
		}
	}

	return pool;
}

const wordsStore = writable<string[]>([]);
export const words = readonly(wordsStore);

export function initGame(sourceWords: string[], wolfCount: number, participantCount: number) {
	const [wolfWord, villagerWord] = getTargetWords(sourceWords);
	const cards = getAllPlayersCards(wolfWord, villagerWord, wolfCount, participantCount);
	wordsStore.set(cards);
}
