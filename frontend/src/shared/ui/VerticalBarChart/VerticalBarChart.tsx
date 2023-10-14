import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'

import classes from './VerticalBarChart.module.scss'

import variables from 'shared/const/ScssVariables/variables.module.scss'
import { classnames as cn, customCanvasBackgroundColor } from 'shared/lib'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
	responsive: true,
	plugins: {
		customCanvasBackgroundColor: {
			color: variables.background_color,
		},
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},
	scales: {
		y: {
			bedinAtZero: true,
			border: {
				display: false,
			},
			grid: {
				drawOnChartArea: false,
				tickColor: variables.light_gray_color,
				borderColor: 'red',
				borderWidth: 3,
			},
		},
		x: {
			stacked: true,
			border: {
				display: false,
			},
			grid: {
				tickColor: variables.light_gray_color,
				drawOnChartArea: false,
				borderColor: 'red',
				borderWidth: 3,
			},
		},
	},
}

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

export const data = {
	labels,
	datasets: [
		{
			data: [3, 7, 4, 6, 5, 5, 4],
			backgroundColor: variables.primary_color,
			borderColor: variables.primary_color,
			borderWidth: 1,
			borderRadius: 80,
			borderSkipped: false,
			barPercentage: 0.5,
		},
		{
			data: [7, 7, 7, 7, 7, 7, 7],
			backgroundColor: variables.gray_color,
			borderColor: variables.gray_color,
			borderWidth: 1,
			borderRadius: 80,
			borderSkipped: false,
			barPercentage: 0.5,
		},
	],
}

export const VerticalBarChart = ({ styles }: IVerticalBarChartProps) => {
	return (
		<div className={cn(classes.VerticalBarChart, [styles])}>
			<Bar
				options={options}
				data={data}
				plugins={[customCanvasBackgroundColor]}
			/>
		</div>
	)
}

interface IVerticalBarChartProps {
	styles?: string
}
