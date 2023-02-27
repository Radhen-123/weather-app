import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend, LabelList, Label,
} from "recharts";
import {useState} from "react";

const WindSpeed = ({windSpeedData}) => {


	const [windowSize, setWindowSize] = useState(window.innerWidth)
	window.addEventListener('resize', () => {
		setWindowSize(window.innerWidth)
	});
	let graphData = [{}]
	windSpeedData.forEach((data) =>
	{
		let dateData = new Date(data.date)
		graphData.push({
			date:`${dateData.getDate()}-${dateData.getMonth()+1}(${dateData.getHours()}:${dateData.getMinutes()})`,
			windSpeed: data.value,
		})
	})


	return (
		<>
				<BarChart
					width={windowSize > 750 ? 750 : windowSize-20}
					height={300}
					data={graphData}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" axisLine={false} tick={false}><Label style={{
						textAnchor: "middle",
						fontSize: "130%",
						fill: "Black",
						top: '30px'
					}}
					>Date and Time</Label></XAxis>
					<YAxis >
						<Label style={{
							textAnchor: "middle",
							fontSize: "130%",
							fill: "Black",
							top: '30px'
						}}
						>Wind Speed</Label>
					</YAxis>
					<Tooltip />
					<Legend />
					<Bar dataKey="windSpeed" fill="#8884d8" minPointSize={5}>
						{/*<LabelList dataKey="date" />*/}
					</Bar>
				</BarChart>
		</>
	)
}

export default WindSpeed