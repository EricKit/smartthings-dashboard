<script lang="ts">
	import { onMount } from 'svelte';
	import { domain } from '$lib/config';

	type Reading = {
		value: number;
		timestamp: Date;
		unit: string;
	};

	let humidity: Reading[] = [];
	let temperature: Reading[] = [];

	onMount(async () => {
		const humidityRes = await fetch(`${domain}/humidity.json`);
		humidity = await humidityRes.json();
		const temperatureRes = await fetch(`${domain}/temperature.json`);
		temperature = await temperatureRes.json();
	});
</script>

<div class="container mx-auto sm:px-6 lg:px-8">
	<div class="md:flex md:items-center md:justify-between mt-4 mb-16">
		<div class="flex-1 min-w-0">
			<h2 class="text-2xl font-bold leading-7 text-sky-900 sm:text-3xl sm:truncate">
				Kitaif Dashboard
			</h2>
		</div>
	</div>

	<div class="bg-sky-50 overflow-hidden sm:rounded-lg">
		<div class="px-4 py-5 sm:p-6">
			<h3 class="text-lg leading-6 font-medium text-sky-900">Bedroom</h3>
			<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
				<div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
					<dt class="text-sm font-medium text-sky-500 truncate">Humidity</dt>
					<dd class="mt-1 text-3xl font-semibold text-sky-900">
						{humidity[humidity.length - 1]?.value + humidity[humidity.length - 1]?.unit}
					</dd>
				</div>
				<div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
					<dt class="text-sm font-medium text-sky-500 truncate">Temperature</dt>
					<dd class="mt-1 text-3xl font-semibold text-sky-900">
						{temperature[temperature.length - 1]?.value + temperature[temperature.length - 1]?.unit}
					</dd>
				</div>
			</dl>
		</div>
	</div>
</div>
