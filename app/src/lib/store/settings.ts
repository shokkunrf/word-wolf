import * as lzString from 'lz-string';
import { DEFAULT_URL } from '$lib/config/env';
import { getSources, type Source } from '$lib/repositories/sources';
import { derived, get, readonly, writable } from 'svelte/store';

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

// wordSourcesがwordSourceURLsのderived()でないのは、getSources()が非同期のため
const wordSourcesStore = writable<Source[]>([]);
export const wordSources = readonly(wordSourcesStore);

const storageWordSourceURLs = localStorage.getItem('wordSourceURLs');
const initialWordSourceURLs = storageWordSourceURLs
	? (JSON.parse(storageWordSourceURLs) as string[])
	: [DEFAULT_URL];
export const wordSourceURLs = writable(initialWordSourceURLs);
wordSourceURLs.subscribe(async (value) => {
	const sources = await getSources(value);
	wordSourcesStore.set(sources);

	localStorage.setItem('wordSourceURLs', JSON.stringify(value));
});

export const share = derived([wordSourceURLs], ([$wordSourceURLs]) => {
	return lzString.compressToEncodedURIComponent(JSON.stringify($wordSourceURLs));
});
