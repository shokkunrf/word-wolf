<script lang="ts">
	import { location } from '$lib/store/location';
	import Setting from './setting.svelte';
	import Game from './game.svelte';
	import Result from './result.svelte';
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
