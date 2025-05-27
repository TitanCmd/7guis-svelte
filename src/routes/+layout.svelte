<script lang="ts">
	import type { LayoutProps } from './$types';
	import { base } from '$app/paths';
	import '../app.css';

	let summaryOpen = $state(false);

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex w-4/5 space-x-2">
	<aside class="h-screen w-fit min-w-fit bg-slate-400 p-4">
		<ul class="flex flex-col">
			{#snippet listItem(href: string, title: string)}
				<li>
					<a
						href={base + href}
						class="block w-full rounded p-2 text-slate-800 transition-colors hover:bg-slate-600 hover:text-slate-200"
					>
						{title}
					</a>
				</li>
			{/snippet}
			{@render listItem('/', 'Home')}
			{#each data.guis as gui}
				{@render listItem(gui.href, gui.title)}
			{/each}
		</ul>
	</aside>
	<main>
		{#if data.active}
			<h1 class="text-2xl font-bold text-slate-800">{data.active.title}</h1>
			<details bind:open={summaryOpen}>
				<summary>Challenge details</summary>
				<p class="text-slate-600">{data.active.description}</p>
				<img src={data.active.img} alt="challenge example end goal" />
			</details>
		{/if}

		{@render children?.()}
	</main>
</div>
