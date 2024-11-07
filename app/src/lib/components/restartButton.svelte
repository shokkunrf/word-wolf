<script lang="ts">
	import { location } from '$lib/store/location';

	function init() {
		if (confirm('設定画面からやり直しますか？')) {
			location.set('setting');
		}
	}
</script>

<button on:click={init}>はじめから</button>

<style>
	button {
		background-color: #a50;
		border-radius: 0.5rem;
		border-width: 0;
		color: azure;
		font-size: 1.5rem;
		margin: 1rem 0px;
		padding: 0.5rem 1rem;
	}
</style>
