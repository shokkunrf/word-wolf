<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="app">
	<header>
		<a href={base}>
			<h1>Word Wolf</h1>
		</a>
	</header>

	<main>
		<slot />
	</main>

	<footer />
</div>

<style lang="scss" scoped>
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
		a {
			text-decoration: none;
			color: #ddd;
		}
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
