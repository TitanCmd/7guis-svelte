<script lang="ts">
	import { base } from '$app/paths';
	let elapsed = $state(0);
	let duration = $state(5);
	let interval: number;

	function start() {
		interval = setInterval(() => {
			elapsed += 0.1;
			if (elapsed > duration) {
				elapsed = duration;
				clearInterval(interval);
			}
		}, 100);
	}

	function reset() {
		elapsed = 0;
		start();
	}

	$effect(() => {
		if (!duration) return;
		start();
		return () => clearInterval(interval);
	});
</script>

<a href="{base}/timer">V1</a>

<div>
	<div>
		<label for="">
			<span>Elapsed time:</span>
			<progress max={duration} value={elapsed}></progress>
		</label>
		<div>{elapsed.toFixed(1)}s</div>
	</div>

	<label for="">
		<span>Duration:</span>
		<input type="range" bind:value={duration} min="1" max="10" />
	</label>

	<button onclick={reset}>Reset</button>
</div>
