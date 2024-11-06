import { DEFAULT_URL } from '$lib/config/env';
import { getSources, type Source } from '$lib/repositories/sources';
import lzString from 'lz-string';
import { derived, get, readonly, writable } from 'svelte/store';
import { building } from '$app/environment';

let initialWolfCount = 1;
let initialParticipantCount = 4;
let initialWordSourceURLs = [DEFAULT_URL];
if (!building) {
	initialWolfCount = Number(localStorage.getItem('wolfCount') ?? 1);
	initialParticipantCount = Number(localStorage.getItem('participantCount') ?? 4);
	const storageWordSourceURLs = localStorage.getItem('wordSourceURLs');
	if (storageWordSourceURLs) {
		initialWordSourceURLs = JSON.parse(storageWordSourceURLs) as string[];
	}
}

export const wolfCount = writable(initialWolfCount);

export const participantCount = writable(initialParticipantCount);
participantCount.subscribe((value) => {
	if (get(wolfCount) >= value) {
		wolfCount.set(value - 1);
	}
});

export const categoryIdx = writable(0);

// derived()でないのは、getSources()が非同期処理を行うため
const wordSourcesStore = writable<Source[]>([]);
export const wordSources = readonly(wordSourcesStore);

export const wordSourceURLs = writable(initialWordSourceURLs);
wordSourceURLs.subscribe(async (value) => {
	const sources = await getSources(value);
	wordSourcesStore.set(sources);
});

export const share = derived([wordSourceURLs], ([$wordSourceURLs]) => {
	return lzString.compressToEncodedURIComponent(JSON.stringify($wordSourceURLs));
});

if (!building) {
	wolfCount.subscribe((value) => {
		localStorage.setItem('wolfCount', String(value));
	});

	participantCount.subscribe((value) => {
		localStorage.setItem('participantCount', String(value));
	});

	wordSourceURLs.subscribe(async (value) => {
		localStorage.setItem('wordSourceURLs', JSON.stringify(value));
	});
}
