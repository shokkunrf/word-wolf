<script lang="ts">
	import { location } from '$lib/store/location';
	import Setting from './setting.svelte';
	import Game from './game.svelte';
	import Result from './result.svelte';
	import WordList from '$lib/components/wordList.svelte';
</script>

<div class="page">
	{#if $location === 'setting'}
		<Setting />
	{:else if $location === 'game'}
		<Game />
	{:else if $location === 'result'}
		<Result />
	{/if}

	<WordList />
</div>

<style>
</style>
