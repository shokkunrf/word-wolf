import { getSources, type Source } from '$lib/repositories/sources';
import { get, readonly, writable } from 'svelte/store';

const initialWolfCount = Number(localStorage.getItem('wolfCount') ?? 1);
export const wolfCount = writable(initialWolfCount);
wolfCount.subscribe((value) => {
	localStorage.setItem('wolfCount', String(value));
});

const initialParticipantCount = Number(localStorage.getItem('participantCount') ?? 4);
export const participantCount = writable(initialParticipantCount);
participantCount.subscribe((value) => {
	localStorage.setItem('participantCount', String(value));

	if (get(wolfCount) >= value) {
		wolfCount.set(value - 1);
	}
});

export const categoryIdx = writable(0);

// derived()でないのは、getSources()が非同期処理を行うため
const wordSourcesStore = writable<Source[]>([]);
export const wordSources = readonly(wordSourcesStore);

const initialWordSourceURLs: string[] = JSON.parse(localStorage.getItem('wordSourceURLs') ?? '[]');
export const wordSourceURLs = writable(initialWordSourceURLs);
wordSourceURLs.subscribe(async (value) => {
	localStorage.setItem('wordSourceURLs', JSON.stringify(value));

	const sources = await getSources(value);
	wordSourcesStore.set(sources);
});
