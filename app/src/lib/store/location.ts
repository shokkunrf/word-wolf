import { writable } from 'svelte/store';

export const location = writable<'setting' | 'game' | 'result'>('setting');
