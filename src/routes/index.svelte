<script lang="ts">
	import { onMount } from 'svelte';
	import { domain } from '$lib/config';
	import Header from '../components/header.svelte';
	import Chart from '../components/chart.svelte';

	let humidity: Reading[] = [];
	let temperature: Reading[] = [];
	console.log(humidity);
	onMount(async () => {
		const humidityRes = await fetch(`${domain}/humidity.json`);
		const humidityJson = await humidityRes.json();
		humidity = humidityJson.map((item) => {
			return { ...item, timestamp: new Date(item.timestamp) };
		});
		const temperatureRes = await fetch(`${domain}/temperature.json`);
		const temperatureJson = await temperatureRes.json();
		temperature = temperatureJson.map((item) => {
			return { ...item, timestamp: new Date(item.timestamp) };
		});
	});
</script>

<div class="container mx-auto sm:px-6 lg:px-8">
	<Header />
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
		<div class="p-8">
			<Chart leftData={temperature} rightData={humidity} />
		</div>
	</div>
</div>
