import {
	Chart as ChartJS,
	ArcElement as ChartJSArcElement,
	Color as ChartJSColor,
	ChartData as ChartJSData,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import variables from 'shared/const/ScssVariables/variables.module.scss'
import { doughnutBorderRadius } from 'shared/lib'

ChartJS.register(ChartJSArcElement)

const data: ChartJSData<'doughnut'> = {
	datasets: [
		{
			data: [67, 33],
			backgroundColor: [variables.primary_color, variables.light_gray_color],
			hoverBackgroundColor: [variables.primary_color, variables.light_gray_color],
		},
	],
}

export function DoughnutChart() {
	return (
		<div>
			<Doughnut
				width={300}
				height={300}
				data={data}
				plugins={doughnutBorderRadius}
				options={{
					maintainAspectRatio: false,
					responsive: true,
					cutout: '75%',
					plugins: {
						tooltip: { enabled: false },
						legend: { display: false },
					},
					elements: {
						arc: { borderWidth: 0 },
					},
				}}
			/>
		</div>
	)
}
