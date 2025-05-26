<script lang="ts">
	type Options = 'one-way' | 'return';

	function getDate() {
		const date = new Date();
		const [day, month, year] = date
			.toLocaleDateString('en-au', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			})
			.split('/');

		return `${year}-${month}-${day}`;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		alert(
			`You have booked a ${selected} flight ${selected === 'return' ? `from ${startDate} to ${returnDate}` : `on ${startDate}`}`
		);
	}

	let selected = $state<Options>('one-way');
	let startDate = $state(getDate());
	let returnDate = $state(getDate());

	$inspect({
		selected,
		startDate,
		returnDate
	});
</script>

<svelte:head>
	<title>Book Flight</title>
</svelte:head>

<form
	onsubmit={handleSubmit}
	class="flex w-fit flex-col items-center gap-4 rounded-lg bg-slate-200 p-2"
>
	<select bind:value={selected} class=" rounded-lg bg-slate-50 p-2">
		<option value="one-way">one-way flight</option>
		<option value="return">return flight</option>
	</select>
	<label>
		<span class="sr-only">Select the start date:</span>
		<input bind:value={startDate} type="date" required class="rounded-lg" />
	</label>
	<label>
		<span class="sr-only">Select the return date:</span>
		<input
			bind:value={returnDate}
			disabled={selected === 'one-way'}
			type="date"
			class="rounded-lg disabled:cursor-not-allowed"
		/>
	</label>

	<button
		disabled={!startDate || (selected === 'return' && returnDate < startDate)}
		type="submit"
		class="cursor-pointer rounded-lg p-2 disabled:cursor-not-allowed"
	>
		Book
	</button>
</form>

<style>
	select,
	input,
	button {
		background-color: rgb(140, 181, 221);
		&:disabled {
			background-color: rgb(226, 232, 240);
		}
	}
</style>
