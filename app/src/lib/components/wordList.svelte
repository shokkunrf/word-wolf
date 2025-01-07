<script lang="ts">
	import { wordSource } from '$lib/store/settings';
</script>

<div class="word-list">
	<div>
		<h2>Word List</h2>

		<div>
			{#if $wordSource}
				{#each $wordSource?.categories as category, _}
					<details>
						<summary>{category.name}</summary>
						<ul>
							{#each category.words as word, _}
								<li>{word}</li>
							{/each}
						</ul>
					</details>
				{/each}
			{/if}
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
