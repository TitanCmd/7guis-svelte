<script lang="ts">
	import { Temperature } from './temperature.svelte';

	const temperature = new Temperature();
</script>

<div class="flex items-center space-x-2">
	<input type="number" bind:value={temperature.celsius} />
	<p>Celsius =</p>
	<input type="number" bind:value={temperature.fahrenheit} />
	<p>Fahrenheit</p>
	<button
		class="cursor-pointer rounded-2xl border-2 border-amber-500 bg-amber-300 p-2 hover:border-amber-200 hover:bg-amber-100"
		onclick={() => temperature.reset()}>Reset</button
	>
</div>

<style>
	input[type='number'] {
		max-width: 10ch;
	}
</style>
