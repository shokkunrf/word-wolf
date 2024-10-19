import { get, writable } from 'svelte/store';

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
