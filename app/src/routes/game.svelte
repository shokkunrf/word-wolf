<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import RestartButton from '$lib/components/restartButton.svelte';
	import { location } from '$lib/store/location';

	let num = 0;
	const words = getContext<Writable<string[]>>('words');

	let isDisplayed = false;
	function next() {
		if (confirm('OKを押したら次の人にまわしてね')) {
			isDisplayed = false;
			num++;
			if (num >= $words.length) {
				location.set('result');
			}
		}
	}

	function display() {
		if (confirm('誰も見てない？')) {
			isDisplayed = true;
		}
	}
</script>

<div class="game">
	<div class="contents">
		<div class="number">{num + 1}人目</div>
		{#if isDisplayed}
			<div>{$words[num]}</div>
		{/if}
	</div>

	<div class="button">
		{#if isDisplayed}
			<button on:click={next}>次の人の待機画面へ</button>
		{:else}
			<button on:click={display}>表示する</button>
		{/if}
		<div>
			<RestartButton />
		</div>
	</div>
</div>

<style>
	.game {
		font-size: 2rem;
		text-align: center;
	}
	.contents {
		height: 50vh;
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
