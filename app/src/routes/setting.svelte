<script lang="ts">
	import { initGame } from '$lib/store/words';
	import {
		categoryIdx,
		participantCount,
		wolfCount,
		wordSources,
		wordSourceURLs
	} from '$lib/store/settings';
	import { location } from '$lib/store/location';

	$: categories = (() => {
		return $wordSources.flatMap((s) => {
			return s.categories.map((c) => {
				return {
					name: c.name,
					words: c.words
				};
			});
		});
	})();
	$: categoryNames = (() => {
		categoryIdx.set(0);
		const a = categories.map((c) => c.name);
		a.unshift('ランダム');
		return a;
	})();

	let urls = [...$wordSourceURLs];
	// ボタンを押さないと取得しないのはURL入力中に取得するのを防ぐため
	function fetchWordSources() {
		urls = urls.filter((url) => url !== '');
		wordSourceURLs.set(urls);
	}

	function submit() {
		if (categoryNames.length === 1) {
			alert('カテゴリを取得できませんでした');
			return;
		}

		const selectedIdx =
			$categoryIdx === 0 ? Math.floor(Math.random() * categories.length) : $categoryIdx - 1;

		const selectedWords = categories.find((_, i) => i === selectedIdx)?.words ?? [];
		if (selectedWords.length < 2) {
			alert('カテゴリが選択できませんでした');
			return;
		}

		initGame(selectedWords, $wolfCount, $participantCount, categoryNames[selectedIdx + 1]);
		location.set('game');
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
			<div class="property">
				<details>
					<ul>
						{#each urls as _, i}
							<li>
								<input type="text" bind:value={urls[i]} />
							</li>
						{/each}
					</ul>

					<!-- 入力ボックスを追加する -->
					<button on:click={() => (urls = [...urls, ''])} class="icon-button">+</button>

					<!-- 取得ボタン -->
					<button on:click={fetchWordSources} class="icon-button">⟳</button>
				</details>
			</div>
		</div>

		<div class="button">
			<button on:click={submit}>はじめる</button>
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.setting {
		font-size: 2rem;
		display: flex;
		justify-content: center;
	}
	.properties {
		height: 50vh;
		.property {
			display: flex;
			flex-wrap: wrap;
			align-items: end;
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
			> span {
				width: 5em;
			}
			> .value {
				display: inline-block;
				> input {
					background-color: #333;
					border-width: 0;
					color: #bbb;
					font-size: 2.5rem;
					width: 1.5em;
				}
				> select {
					background-color: #333;
					border-width: 0;
					color: #bbb;
					font-size: 2rem;
					width: 5em;
				}
			}
		}
	}

	.button {
		display: flex;
		justify-content: center;
		> button {
			background-color: #05a;
			border-radius: 0.5rem;
			border-width: 0;
			color: azure;
			font-size: 1.5rem;
			margin: 1rem 0px;
			padding: 0.5rem 1rem;
		}
	}

	.icon-button {
		background-color: #333;
		border-radius: 0.5rem;
		border: 1px solid transparent;
		color: #bbb;
		font-size: large;
		cursor: pointer;
		width: 2rem;
		height: 2rem;
	}
</style>
