<script lang="ts">
	type Person = {
		name: string;
		surname: string;
	};

	let people = $state([
		{
			name: 'Rich',
			surname: 'Harris'
		},
		{
			name: 'Ryan',
			surname: 'Carniato'
		},
		{
			name: 'Evan',
			surname: 'You'
		}
	]);

	let selected = $state<Person>();
	let person = $state({ name: '', surname: '' });
	let prefix = $state('');

	const filteredPeople = $derived<Person[]>(
		prefix ? people.filter((p) => p.surname.toLowerCase().startsWith(prefix.toLowerCase())) : people
	);

	$effect(() => {
		person = { name: selected?.name ?? '', surname: selected?.surname ?? '' };
	});

	function createPerson() {
		people.push(person);
		clearFields();
	}

	function updatePerson() {
		const index = people.indexOf(selected!);
		people[index] = { name: person.name, surname: person.surname };
	}

	function deletePerson() {
		people = people.filter((p) => p.name !== person.name || p.surname !== person.surname);
		clearFields();
	}

	function clearFields() {
		person = { name: '', surname: '' };
	}
</script>

<form
	class="mx-auto mt-10 max-w-md space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow"
>
	<div>
		<label class="mb-1 block font-medium text-slate-700">
			<span> Filter prefix: </span>
			<input
				type="text"
				bind:value={prefix}
				class="mt-1 w-full rounded border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
			/>
		</label>
	</div>

	<label class="block">
		<span class="sr-only">Names:</span>
		<select
			bind:value={selected}
			size="5"
			class="w-full rounded border border-slate-300 bg-slate-50 px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
		>
			{#each filteredPeople as person}
				<option value={person}>{person.surname}, {person.name}</option>
			{/each}
		</select>
	</label>

	<div class="flex gap-4">
		<label class="flex-1">
			<span class="mb-1 block font-medium text-slate-700">Name:</span>
			<input
				type="text"
				bind:value={person.name}
				class="w-full rounded border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
			/>
		</label>

		<label class="flex-1">
			<span class="mb-1 block font-medium text-slate-700">Surname:</span>
			<input
				type="text"
				bind:value={person.surname}
				class="w-full rounded border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
			/>
		</label>
	</div>

	<div class="flex justify-end gap-3">
		<button
			class="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
			onclick={createPerson}>Create</button
		>
		<button
			onclick={updatePerson}
			class="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
			>Update</button
		>
		<button
			onclick={deletePerson}
			class="rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
			>Delete</button
		>
	</div>
</form>

<style>
</style>
