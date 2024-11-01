<script lang="ts">
	import { goto } from '$app/navigation';
	import RestartButton from '$lib/components/restartButton.svelte';
	import { words } from '$lib/store/words';

	let num = 0;

	let isDisplayed = false;
	function next() {
		if (confirm('OKを押したら次の人にまわしてね')) {
			isDisplayed = false;
			num++;
			if (num >= $words.length) {
				goto('/result');
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

<style lang="scss" scoped>
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
