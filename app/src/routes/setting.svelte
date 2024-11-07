<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { getCategories } from '$lib/repositories/genres';
	import { location } from '$lib/store/location';

	let wolfCount = 1;
	let participantCount = 4;
	const categories = getCategories();
	const categoryNames = categories.map((c) => c.name);
	categoryNames.unshift('全部');
	let selectedCategory: string;

	const words = getContext<Writable<string[]>>('words');

	function getRandomIndex(ary: ArrayLike<any>): number {
		return Math.floor(Math.random() * ary.length);
	}

	function getRandomGenre(genres: string[]) {
		return genres[getRandomIndex(genres)];
	}

	function submit() {
		const selectedGenres =
			selectedCategory === '全部'
				? categories.flatMap((category) => category.genres)
				: categories.find((category) => category.name === selectedCategory)!.genres;
		const wolfWord = getRandomGenre(selectedGenres);
		const villagerWord = getRandomGenre(selectedGenres.filter((genre) => genre !== wolfWord));

		let pool = Array(participantCount).fill(villagerWord);
		for (let i = 0; i < wolfCount; i++) {
			const idx = getRandomIndex(pool);
			pool = pool.with(idx, wolfWord);
			if (i === pool.filter((p) => p === wolfWord).length) {
				i--;
			}
		}

		words.set(pool);
		location.set('game');
	}
</script>

<div class="setting">
	<div>
		<div class="properties">
			<div class="property">
				<span>人狼:</span>
				<div class="value">
					<input bind:value={wolfCount} type="number" />
					/
					<input bind:value={participantCount} type="number" />
				</div>
			</div>
			<div class="property">
				<span>カテゴリ:</span>
				<div class="value">
					<select bind:value={selectedCategory}>
						{#each categoryNames as categoryName}
							<option value={categoryName}>{categoryName}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<div class="button">
			<button on:click={submit}>はじめる</button>
		</div>
	</div>
</div>

<style>
	.setting {
		font-size: 2rem;
		display: flex;
		justify-content: center;
	}
	.properties {
		height: 50vh;
	}
	.property {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
	.property > span {
		width: 5em;
	}
	.property > .value {
		display: inline-block;
	}
	.property > .value > input {
		background-color: #333;
		border-width: 0;
		color: #bbb;
		font-size: 2.5rem;
		width: 1.5em;
	}
	.property > .value > select {
		background-color: #333;
		border-width: 0;
		color: #bbb;
		font-size: 2rem;
		width: 5em;
	}
	.button {
		display: flex;
		justify-content: center;
	}
	.button > button {
		background-color: #05a;
		border-radius: 0.5rem;
		border-width: 0;
		color: azure;
		font-size: 1.5rem;
		margin: 1rem 0px;
		padding: 0.5rem 1rem;
	}
</style>
