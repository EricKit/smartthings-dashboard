<script lang="ts">
	import '@carbon/charts/styles.min.css';
	import 'carbon-components/css/carbon-components.min.css';
	import { LineChart } from '@carbon/charts-svelte';

	export let leftData: Reading[] = [];
	export let rightData: Reading[] = [];
	export let leftDataTwo: Reading[] = [];

	$: leftChartData = leftData.map((item) => {
		return {
			timestamp: item.timestamp.toISOString(),
			leftUnit: item.unit,
			leftValue: item.value,
			group: 'Temperature'
		};
	});

	$: leftChartDataTwo = leftDataTwo.map((item) => {
		return {
			timestamp: item.timestamp.toISOString(),
			leftUnit: item.unit,
			leftValue: item.value,
			group: 'Outside Temperature'
		};
	});

	$: rightChartData = rightData.map((item) => {
		return {
			timestamp: item.timestamp.toISOString(),
			rightUnit: item.unit,
			rightValue: item.value,
			group: 'Humidity'
		};
	});

	$: chartData = [...leftChartData, ...leftChartDataTwo, ...rightChartData];

	const yesterday = new Date();

	yesterday.setDate(yesterday.getDate() - 1);
</script>

<LineChart
	data={chartData}
	options={{
		title: 'Bedroom Temperature and Humidity',
		axes: {
			left: {
				mapsTo: 'leftValue',
				title: 'Degrees F',
				correspondingDatasets: ['Temperature', 'Outside Temperature'],
				includeZero: false
			},
			bottom: {
				title: 'Date',
				mapsTo: 'timestamp',
				scaleType: 'time'
			},
			right: {
				mapsTo: 'rightValue',
				title: '% Relative Humidity',
				correspondingDatasets: ['Humidity'],
				includeZero: false
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
