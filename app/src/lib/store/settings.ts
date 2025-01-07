import { DEFAULT_WORD_SOURCE_URL } from '$lib/config/env';
import { getWordSource, type WordSource } from '$lib/repositories/wordSource';
import { get, readonly, writable } from 'svelte/store';

const initialWolfCount = Number(localStorage.getItem('wolfCount') ?? 1);
export const wolfCount = writable<number | null>(initialWolfCount);
const initialParticipantCount = Number(localStorage.getItem('participantCount') ?? 4);
export const participantCount = writable<number | null>(initialParticipantCount);

wolfCount.subscribe((value) => {
	if (value !== null) {
		if (value < 1) {
			wolfCount.set(1);
		}
		const count = get(participantCount);
		if (count && count <= value) {
			participantCount.set(value + 1);
		}
	}
	localStorage.setItem('wolfCount', String(value));
});

participantCount.subscribe((value) => {
	if (value !== null) {
		if (value < 2) {
			participantCount.set(2);
		}
		const count = get(wolfCount);
		if (count && count >= value) {
			wolfCount.set(value - 1);
		}
	}
	localStorage.setItem('participantCount', String(value));
});

export const categoryIdx = writable(0);

// wordSourceがwordSourceURLのderived()でないのは、getWordSource()が非同期のため
const wordSourceStore = writable<WordSource | null>(null);
export const wordSource = readonly(wordSourceStore);

export const useUserDataSource = !DEFAULT_WORD_SOURCE_URL;

const initialWordSourceURL =
	DEFAULT_WORD_SOURCE_URL ?? localStorage.getItem('myWordSourceURL') ?? '';
export const wordSourceURL = writable(initialWordSourceURL);
wordSourceURL.subscribe(async (value) => {
	if (value === '') {
		return;
	}
	const source = await getWordSource(value);
	wordSourceStore.set(source);

	localStorage.setItem('myWordSourceURL', value);
});
