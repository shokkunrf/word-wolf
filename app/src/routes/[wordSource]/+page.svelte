<script lang="ts">
	import { location } from '$lib/store/location';
	import Setting from './setting.svelte';
	import Game from './game.svelte';
	import Result from './result.svelte';
	import WordList from '$lib/components/wordList.svelte';
	import { getWordSource, type WordSource } from '$lib/repositories/wordSource';

	export let data;

	let { wordSource } = data;
	let myWordSourceURL = '';

	async function fetchWordSource() {
		wordSource = await getWordSource(myWordSourceURL);
	}
</script>

<div class="page">
	{#if !wordSource}
		<div class="myWordSource">
			<div>
				<div>ワードソースを読み込む</div>
				<div>
					<input type="text" bind:value={myWordSourceURL} placeholder="https://*" />
				</div>
				<div class="button">
					<button on:click={fetchWordSource} class="icon-button">読み込む</button>
				</div>
			</div>
		</div>
	{:else}
		{#if $location === 'setting'}
			<Setting {wordSource} />
		{:else if $location === 'game'}
			<Game />
		{:else if $location === 'result'}
			<Result />
		{/if}

		<WordList {wordSource} />
	{/if}
</div>

<style lang="scss" scoped>
	.myWordSource {
		display: flex;
		justify-content: center;

		input {
			background-color: #333;
			border-width: 0;
			color: #bbb;
			width: 80vw;
			height: 2.5rem;
		}

		.button {
			display: flex;
			justify-content: center;
			> button {
				background-color: #333;
				border-radius: 0.5rem;
				border-width: 0;
				color: azure;
				font-size: 1.5rem;
				margin: 1rem 0px;
				padding: 0.5rem 1rem;
				width: 80vw;
			}
		}
	}
</style>
