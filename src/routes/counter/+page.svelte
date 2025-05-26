<script lang="ts">
	let count = $state(0);
</script>

<div class="flex items-center gap-2">
	<button onclick={() => count--} class="h-12 w-12 rounded-2xl bg-teal-400 hover:bg-teal-600">
		-
	</button>
	<input type="number" bind:value={count} disabled />
	<button onclick={() => count++} class="h-12 w-12 rounded-2xl bg-teal-400 hover:bg-teal-600">
		+
	</button>
</div>
