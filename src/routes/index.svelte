<script lang="ts">
	import { onMount } from 'svelte';
	import { domain } from '$lib/config';
	import Header from '../components/header.svelte';
	import Chart from '../components/chart.svelte';
	import AQChart from '../components/aq-chart.svelte';

	let humidity: Reading[] = [];
	let temperature: Reading[] = [];
	let outsideTemperature: Reading[] = [];
	let aq: AQ_Reading[] = [];

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

		const outsideTemperatureRes = await fetch(`${domain}/outside-temperature.json`);
		const outsideTemperatureJson = await outsideTemperatureRes.json();
		outsideTemperature = outsideTemperatureJson.map((item) => {
			return { ...item, timestamp: new Date(item.timestamp) };
		});

		const aqRes = await fetch(`${domain}/air-quality.json`);
		const aqResJson = await aqRes.json();
		aq = aqResJson.map((item) => {
			return { ...item, timestamp: new Date(item.timestamp), unit: 'µg/m^3' };
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
						{humidity[humidity.length - 1]?.value + '%'}
					</dd>
				</div>
				<div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
					<dt class="text-sm font-medium text-sky-500 truncate">Temperature</dt>
					<dd class="mt-1 text-3xl font-semibold text-sky-900">
						{temperature[temperature.length - 1]?.value + '°F'}
					</dd>
				</div>
			</dl>
			<h3 class="text-lg leading-6 font-medium text-sky-900 mt-8">Outside</h3>
			<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
				<div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
					<dt class="text-sm font-medium text-sky-500 truncate">Temperature</dt>
					<dd class="mt-1 text-3xl font-semibold text-sky-900">
						{outsideTemperature[outsideTemperature.length - 1]?.value + '°F'}
					</dd>
				</div>
			</dl>
			<h3 class="text-lg leading-6 font-medium text-sky-900 mt-8">Indoor Air Quality</h3>
			<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
				<div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
					<dt class="text-sm font-medium text-sky-500 truncate">PM 2.5</dt>
					<dd class="mt-1 text-3xl font-semibold text-sky-900">
						{aq[aq.length - 1]?.pm25 + ' 𝜇g/m³'}
					</dd>
				</div>
				<div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
					<dt class="text-sm font-medium text-sky-500 truncate">PM 10</dt>
					<dd class="mt-1 text-3xl font-semibold text-sky-900">
						{aq[aq.length - 1]?.pm10 + ' 𝜇g/m³'}
					</dd>
				</div>
			</dl>
		</div>
		<div class="p-8">
			<Chart leftData={temperature} leftDataTwo={outsideTemperature} rightData={humidity} />
		</div>
		<div class="p-8">
			<AQChart data={aq} />
		</div>
	</div>
</div>
