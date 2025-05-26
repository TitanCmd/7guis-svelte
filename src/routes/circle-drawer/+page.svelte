<script lang="ts">
	type Circle = {
		id: string;
		cx: number;
		cy: number;
		r: number;
	};

	type Status = 'drawing' | 'editing';

	let status = $state<Status>('drawing');
	let circles = $state<Circle[]>([]);
	let selected = $state<Circle>()!;

	let snapshots: Circle[][] = [];
	let history = $state(-1);

	function drawCircle(e: MouseEvent) {
		if (status === 'editing') {
			snapshot();
			status = 'drawing';
			return;
		}

		const svgEl = e.target as SVGElement;
		const { left, top } = svgEl.getBoundingClientRect();

		const circle = {
			id: window.crypto.randomUUID(),
			cx: +(e.clientX - left).toFixed(),
			cy: +(e.clientY - top).toFixed(),
			r: 40
		};

		circles.push(circle);
		selected = circle;

		snapshot();
	}

	function undo() {
		circles = snapshots[--history];
	}

	function redo() {
		circles = snapshots[++history];
	}

	function snapshot() {
		history++;
		snapshots.push($state.snapshot(circles));
	}
</script>

<div>
	<div>
		<button disabled={history === -1} onclick={undo}>Undo</button>
		<button disabled={history === snapshots.length - 1} onclick={redo}>Redo</button>
	</div>

	{#if status === 'editing'}
		<div class="adjust">
			<span>Adjust diameter of circle at ({selected.cx}, {selected.cy})</span>
			<input type="range" min="5" bind:value={selected.r} />
		</div>
	{/if}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<svg onclick={drawCircle} class="h-[400px] w-[600px] border-2" viewBox="0 0 600 400">
		{#each circles as circle}
			<circle
				{...circle}
				fill={selected.id === circle.id ? '#999' : '#444'}
				stroke="#fff"
				stroke-width="2"
				onclick={(e) => {
					e.stopPropagation();
					selected = circle;
				}}
				oncontextmenu={(e) => {
					if (status === 'editing') {
						snapshot();
					}
					e.preventDefault();
					status = 'editing';
					selected = circle;
				}}
			></circle>
		{/each}
	</svg>
</div>

<style>
	.adjust {
		width: 400px;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		padding: 1rem;
		text-align: center;
	}
</style>
