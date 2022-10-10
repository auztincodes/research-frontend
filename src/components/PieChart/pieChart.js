import { Pie } from 'vue-chartjs';

export default {
	name: 'pie-chart',
	extends: Pie,
	data: () => ({
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	}),
	props: {
		labels: {
			type: Array,
			default: []
		},
		chartData: {
			type: Array
		}
	},
	computed: {
		chartDataObj() {
			return {
				labels: this.labels,
				datasets: [
					{
						data: this.chartData,
						backgroundColor: ['rgb(231, 103, 82)', 'rgb(240, 198, 79)', 'rgb(124, 199, 135)'],
						hoverOffset: 4
					}
				]
			};
		}
	},
	mounted() {
		this.renderChart(this.chartDataObj, this.options);
	}
};
