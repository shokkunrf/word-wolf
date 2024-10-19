<script lang="ts">
	import { getCategories } from '$lib/repositories/genres';
	import { initGame } from '$lib/store/words';
	import { categoryIdx, participantCount, wolfCount } from '$lib/store/settings';
	import { goto } from '$app/navigation';

	const categories = getCategories();
	const categoryNames = categories.map((c) => c.name);
	categoryNames.unshift('全部');

	function submit() {
		const selectedGenres =
			$categoryIdx === 0
				? categories.flatMap((category) => category.genres)
				: categories.find((_, i) => i === $categoryIdx - 1)!.genres;

		initGame(selectedGenres, $wolfCount, $participantCount);
		goto('/game');
	}
</script>

<div class="setting">
	<div>
		<div class="properties">
			<div class="property">
				<span>人狼:</span>
				<div class="value">
					<input bind:value={$wolfCount} min="1" max={$participantCount - 1} type="number" />
					/
					<input bind:value={$participantCount} min="2" type="number" />
				</div>
			</div>
			<div class="property">
				<span>カテゴリ:</span>
				<div class="value">
					<select bind:value={$categoryIdx}>
						{#each categoryNames as categoryName, i}
							<option value={i}>{categoryName}</option>
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
