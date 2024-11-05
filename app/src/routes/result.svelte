<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Location } from '$lib/store/location';

	const words = getContext<Writable<string>>('words');
	const location = getContext<Writable<Location>>('location');

	let isDisplayed = false;
	function displayResult() {
		if (confirm()) {
			isDisplayed = true;
		}
	}

	function next() {
		location.set('setting');
	}
</script>

<div class="result">
	<div class="contents">
		{#if !isDisplayed}
			議論開始！
		{:else}
			<ul>
				{#each $words as genre, i}
					<li>
						{i + 1}人目: {genre}
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="button">
		{#if !isDisplayed}
			<button on:click={displayResult}>結果を表示する</button>
		{:else}
			<button on:click={next}>タイトルに戻る</button>
		{/if}
	</div>
</div>

<style>
	.result {
		font-size: 2rem;
	}
	.contents {
		display: flex;
		justify-content: center;
		height: 50vh;
	}
	.button {
		display: flex;
		justify-content: center;
	}
	.button > button {
		background-color: #05a;
		border: 0 solid #000;
		border-radius: 0.5rem;
		border-width: 0;
		color: azure;
		font-size: 1.5rem;
		margin: 1rem auto;
		padding: 0.5rem 1rem;
	}
</style>
