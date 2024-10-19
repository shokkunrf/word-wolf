<script lang="ts">
	import lzString from 'lz-string';
	import { page } from '$app/stores';
	import { share, wordSourceURLs } from '$lib/store/settings';

	const param = $page.url.searchParams.get('share');
	if (param) {
		const urls = JSON.parse(lzString.decompressFromEncodedURIComponent(param)) as string[];
		wordSourceURLs.set(urls);
	}

	function copyLink() {
		navigator.clipboard.writeText(`${$page.url.origin}?share=${$share}`);
		alert('リンクをコピーしました');
	}
</script>

<div class="app">
	<header>
		<h1>Word Wolf</h1>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<button on:click={copyLink}>ゲームをシェア</button>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	header {
		margin: 0 auto;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
