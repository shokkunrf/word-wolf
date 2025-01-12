<script lang="ts">
	import { base } from '$app/paths';
	export let data;

	const { urls } = data;
</script>

<div>
	<ul>
		{#each urls as url, _}
			<li>
				<a href="{base}/{url[0]}">
					{url[0]}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss" scoped>
	li {
		list-style-type: none;
	}
</style>
