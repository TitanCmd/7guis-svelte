export class Temperature {
	#celsius = $state(0);
	#fahrenheit = $state(0);

	get celsius() {
		return this.#celsius;
	}

	set celsius(celsius: number) {
		this.#celsius = celsius;
		this.#fahrenheit = celsius * (9 / 5) + 32;
	}

	get fahrenheit() {
		return this.#fahrenheit;
	}

	set fahrenheit(fahrenheit: number) {
		this.#fahrenheit = fahrenheit;
		this.#celsius = (fahrenheit - 32) * (5 / 9);
	}

	reset() {
		this.#celsius = 0;
		this.#fahrenheit = 0;
	}
}
