<script lang="ts">
	// `e` in the challenge. In milliseconds
	let elapsedTime = $state(0);

	// `d` in the challenge
	let duration = $state(10);

	let durationMilliseconds = $derived(duration * 1000);

	let percent = $derived((elapsedTime / durationMilliseconds) * 100);

	let isRunning = $derived.by(() => {
		if (elapsedTime >= durationMilliseconds) {
			return false;
		} else if (durationMilliseconds > elapsedTime) {
			return true;
		}
	});

	const reset = () => {
		elapsedTime = 0;
	};

	$effect(() => {
		const timeInterval = 100; // 100 milliseconds

		let timer: number | null = null;

		if (isRunning) {
			timer = setInterval(() => {
				elapsedTime += timeInterval;
			}, timeInterval);
		}

		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	});

	const colour = ['green', 'yellow', 'red'];

	let colourChoice = $derived.by(() => {
		const index = percent < 33 ? 0 : percent < 66 ? 1 : 2;
		return colour[index];
	});
</script>

<a href="/timer/v2">V2</a>

<div
	class="flex w-fit flex-col gap-2 rounded-lg bg-gray-200 p-4 shadow-lg transition-all duration-300 ease-in-out"
	class:shadow-green-500={colourChoice === 'green'}
	class:shadow-yellow-500={colourChoice === 'yellow'}
	class:shadow-red-500={colourChoice === 'red'}
>
	<div class="flex flex-row items-center gap-1">
		<p>Elapsed Time:</p>
		<!-- `G` element in challenge -->
		<div class="h-4 w-48 rounded bg-gray-300">
			<div class="h-full max-w-full rounded bg-blue-500" style="width: {percent}%"></div>
		</div>
	</div>
	<p>{elapsedTime / 1000}s</p>
	<div class="flex flex-row items-center gap-1">
		<p>Duration:</p>
		<!-- `S` in the challenge -->
		<input type="range" class="w-full accent-blue-300" min="5" max="60" bind:value={duration} />
	</div>
	<!-- `R` in the challenge -->
	<button class="h-fit w-full rounded bg-white shadow hover:bg-gray-200" onclick={reset}
		>Reset</button
	>
</div>
