<script lang="ts">
	import { wordSources } from '$lib/store/settings';

	$: categories = $wordSources.flatMap((s) => s.categories);
</script>

<div class="word-list">
	<div>
		<h2>Word List</h2>

		<div>
			{#each categories as category, _}
				<details>
					<summary>{category.name}</summary>
					<ul>
						{#each category.words as word, _}
							<li>{word}</li>
						{/each}
					</ul>
				</details>
			{/each}
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.word-list {
		display: flex;
		justify-content: center;
		> div {
			width: 320px;
		}
	}
</style>
