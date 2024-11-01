<script lang="ts">
	import { goto } from '$app/navigation';
	import { categoryName, words } from '$lib/store/words';

	let isDisplayed = false;
	function displayResult() {
		if (confirm()) {
			isDisplayed = true;
		}
	}

	function next() {
		goto('/');
	}

	let timer = 0;
	setInterval(() => {
		timer++;
	}, 1000);
</script>

<div class="result">
	<div class="contents">
		<div class="categoryName">
			カテゴリ:
			<div>
				{$categoryName}
			</div>
		</div>
		<div>
			{#if !isDisplayed}
				<div class="meeting">
					議論開始！
					<div class="timer">
						{Math.floor(timer / 60)
							.toString()
							.padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
					</div>
				</div>
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
	</div>

	<div class="button">
		{#if !isDisplayed}
			<button on:click={displayResult}>結果を表示する</button>
		{:else}
			<button on:click={next}>タイトルに戻る</button>
		{/if}
	</div>
</div>

<style lang="scss" scoped>
	.result {
		font-size: 2rem;
	}
	.contents {
		height: 50vh;
		.categoryName {
			font-size: 0.5em;
			background-color: #333;
			width: 90%;
			border-radius: 0.5em;
			padding: 0.5em;
			margin: 0 auto 2rem;
			> div {
				font-size: 1.5em;
			}
		}

		.meeting {
			text-align: center;
		}
		.timer {
			font-size: 3rem;
		}
	}
	.button {
		text-align: center;
		> button {
			background-color: #05a;
			border: 0 solid #000;
			border-radius: 0.5rem;
			border-width: 0;
			color: azure;
			font-size: 1.5rem;
			margin: 1rem auto;
			padding: 0.5rem 1rem;
		}
	}
</style>
