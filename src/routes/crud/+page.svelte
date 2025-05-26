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

<form>
	<div>
		<label>
			<span> Filter prefix: </span>
			<input type="text" bind:value={prefix} />
		</label>
	</div>

	<label>
		<span class="sr-only">Names:</span>
		<select bind:value={selected} size="5">
			{#each filteredPeople as person}
				<option value={person}>{person.surname}, {person.name}</option>
			{/each}
		</select>
	</label>

	<div>
		<label>
			<span>Name:</span>
			<input type="text" bind:value={person.name} />
		</label>

		<label>
			<span>Surname:</span>
			<input type="text" bind:value={person.surname} />
		</label>
	</div>

	<div>
		<button
			class="cursor-pointer rounded-xl bg-blue-400 p-2 hover:bg-blue-200"
			onclick={createPerson}>Create</button
		>
		<button
			onclick={updatePerson}
			class="cursor-pointer rounded-xl bg-blue-400 p-2 hover:bg-blue-200">Update</button
		>
		<button
			onclick={deletePerson}
			class="cursor-pointer rounded-xl bg-blue-400 p-2 hover:bg-blue-200">Delete</button
		>
	</div>
</form>

<style>
</style>
