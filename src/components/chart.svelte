<script lang="ts">
	import '@carbon/charts/styles.min.css';
	import 'carbon-components/css/carbon-components.min.css';
	import { LineChart } from '@carbon/charts-svelte';

	export let leftData: Reading[] = [];
	export let rightData: Reading[] = [];

	$: leftChartData = leftData.map((item) => {
		return {
			timestamp: item.timestamp.toISOString(),
			leftUnit: item.unit,
			leftValue: item.value,
			group: 'Left'
		};
	});

	$: rightChartData = rightData.map((item) => {
		return {
			timestamp: item.timestamp.toISOString(),
			rightUnit: item.unit,
			rightValue: item.value,
			group: 'Right'
		};
	});

	$: chartData = [...leftChartData, ...rightChartData];

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
				title: leftChartData[0]?.leftUnit ?? '',
				correspondingDatasets: ['Left'],
				includeZero: false
			},
			bottom: {
				title: 'Date',
				mapsTo: 'timestamp',
				scaleType: 'time'
			},
			right: {
				mapsTo: 'rightValue',
				title: rightChartData[0]?.rightUnit ?? '',
				correspondingDatasets: ['Right'],
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
