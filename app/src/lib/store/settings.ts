import { DEFAULT_URL } from '$lib/config/env';
import { getSources, type Source } from '$lib/repositories/sources';
import { get, readonly, writable } from 'svelte/store';

const initialWolfCount = Number(localStorage.getItem('wolfCount') ?? 1);
export const wolfCount = writable(initialWolfCount);
wolfCount.subscribe((value) => {
	if (value < 1) {
		wolfCount.set(1);
		return;
	}

	localStorage.setItem('wolfCount', String(value));
});

const initialParticipantCount = Number(localStorage.getItem('participantCount') ?? 4);
export const participantCount = writable(initialParticipantCount);
participantCount.subscribe((value) => {
	if (value < 2) {
		participantCount.set(2);
		return;
	}
	if (get(wolfCount) >= value) {
		wolfCount.set(value - 1);
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
