<script lang="ts">
	import '@carbon/charts/styles.min.css';
	import 'carbon-components/css/carbon-components.min.css';
	import { LineChart } from '@carbon/charts-svelte';

	export let data: AQ_Reading[] = [];

	$: leftChartData = data.map((item) => {
		return {
			timestamp: item.timestamp.toISOString(),
			unit: item.unit,
			leftValue: item.pm25,
			group: 'PM 2.5'
		};
	});

	$: rightChartData = data.map((item) => {
		return {
			timestamp: item.timestamp.toISOString(),
			unit: item.unit,
			rightValue: item.pm10,
			group: 'PM 10'
		};
	});

	$: chartData = [...leftChartData, ...rightChartData];

	const yesterday = new Date();

	yesterday.setDate(yesterday.getDate() - 1);
</script>

<LineChart
	data={chartData}
	options={{
		points: false,
		title: 'Air Quality',
		axes: {
			left: {
				mapsTo: 'leftValue',
				title: 'PM 2.5 (𝜇g/m³)',
				correspondingDatasets: ['PM 2.5'],
				includeZero: true,
				thresholds: [
					{
						value: 12,
						label: 'Moderate PM 2.5',
						fillColor: '#6929C4'
					},
					{
						value: 35.5,
						label: 'Unhealthy PM 2.5',
						fillColor: '#6929C4'
					}
				]
			},
			bottom: {
				title: 'Date',
				mapsTo: 'timestamp',
				scaleType: 'time'
			},
			right: {
				mapsTo: 'rightValue',
				title: 'PM 10 (𝜇g/m³)',
				correspondingDatasets: ['PM 10'],
				includeZero: true,
				thresholds: [
					{
						value: 50,
						label: 'Moderate PM 10',
						fillColor: '#009D9A'
					},
					{
						value: 100,
						label: 'Unhealthy PM 10',
						fillColor: '#009D9A'
					}
				]
			}
		},
		experimental: true,
		zoomBar: {
			top: {
				initialZoomDomain: [yesterday.toISOString(), new Date()],
				enabled: true,
				type: 'slider_view'
			}
		},
		curve: 'curveMonotoneX',
		timeScale: {
			addSpaceOnEdges: 0
		},
		height: '400px'
	}}
/>
