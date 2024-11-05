<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { Location } from '$lib/store/location';
	import Setting from './setting.svelte';
	import Game from './game.svelte';
	import Result from './result.svelte';

	const words = writable<string[]>();
	setContext('words', words);

	const location = setContext('location', writable<Location>('setting'));
</script>

<div class="page">
	{#if $location === 'setting'}
		<Setting />
	{:else if $location === 'game'}
		<Game />
	{:else if $location === 'result'}
		<Result />
	{/if}
</div>

<style>
</style>
