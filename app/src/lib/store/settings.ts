import { get, writable } from 'svelte/store';

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
