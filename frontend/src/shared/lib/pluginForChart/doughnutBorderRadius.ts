import {
	Chart as ChartJS,
	ArcElement as ChartJSArcElement,
	ArcOptions as ChartJSArcOptions,
	ArcProps as ChartJSArcProps,
	Color as ChartJSColor,
	ChartData as ChartJSData,
	DoughnutController as ChartJSDoughnutController,
	Element as ChartJSElement,
	Plugin as ChartJSPlugin,
} from 'chart.js'

import variables from 'shared/config/ScssVariables/variables.module.scss'

interface Round {
	x: number
	y: number
	radius: number
	arcColor: ChartJSColor
}

export const doughnutBorderRadius: ChartJSPlugin<'doughnut'>[] = [
	{
		id: 'arcCaps',
		afterUpdate: function (chart) {
			// we only expect 1 dataset
			const { data, controller } = chart.getDatasetMeta(0)
			const { outerRadius, innerRadius } = controller as ChartJSDoughnutController

			for (let i = data.length - 1; i >= 0; --i) {
				const arc: any = data[i]

				// determine total radius by diffing outer values
				const radiusLength = outerRadius - innerRadius

				arc.round = {
					// chart's x/y lengths
					x: (chart.chartArea.left + chart.chartArea.right) / 2,
					y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
					// radius of a single arc
					radius: innerRadius + radiusLength / 2,
					arcColor: arc.options.backgroundColor as ChartJSColor,
				}
			}
		},

		afterDraw: function (chart) {
			const { ctx } = chart

			// we only expect 1 dataset
			const { data } = chart.getDatasetMeta(0)

			// iterate through each arc's data point
			for (let i = data.length - 1; i >= 0; --i) {
				// extract data
				const arc: any = data[i]
				const round = arc.round as Round
				const props = arc.getProps([
					'startAngle',
					'endAngle',
					'innerRadius',
					'outerRadius',
					'circumference',
				])

				// determine end angle of arc within the donut shape
				const endAngle = Math.PI / 2 - props.endAngle

				ctx.save()
				ctx.translate(round.x, round.y)

				// generate white arc that serves as padding (assumes background is white)
				ctx.fillStyle = 'white'
				ctx.beginPath()
				ctx.arc(
					round.radius * Math.sin(endAngle),
					round.radius * Math.cos(endAngle),
					// twice as wide to smooth out the padding's angles
					props.outerRadius - props.innerRadius,
					// cap should "face" outward from arc's outer boundary
					0 + props.endAngle,
					Math.PI + props.endAngle,
				)
				ctx.closePath()
				ctx.fill()

				// generate cap
				ctx.fillStyle = round.arcColor
				ctx.beginPath()
				ctx.arc(
					round.radius * Math.sin(endAngle),
					round.radius * Math.cos(endAngle),
					(props.outerRadius - props.innerRadius) / 2,
					// draw a full circle for the cap to prevent any spacing issue
					0,
					Math.PI * 2,
				)
				ctx.closePath()
				ctx.fill()

				ctx.restore()
			}
		},
	},
]
