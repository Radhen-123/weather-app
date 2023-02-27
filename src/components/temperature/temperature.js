import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend, Label,
} from "recharts";
import {useState} from "react";

const Temperature = ({temperatureData, maxTemperature, minTemperature}) => {

	const [windowSize, setWindowSize] = useState(window.innerWidth)
	window.addEventListener('resize', () => {
		setWindowSize(window.innerWidth)
	});
	let graphData = [{}]
	temperatureData.forEach((data, index) =>
	{
		let dateData = new Date(data.date)
		graphData.push({
			date:`${dateData.getDate()}-${dateData.getMonth()+1}(${dateData.getHours()}:${dateData.getMinutes()})`,
			temperature: data.value,
			maxTemperature: maxTemperature[index].value,
			minTemperature: minTemperature[index].value,
		})
	})


	return (
		<>
			<LineChart
				width={windowSize > 750 ? 750 : windowSize-20}
				height={200}
				data={graphData}
				margin={{
					top: 25,
					right: 30,
					left: 20,
					bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" ><Label style={{
					textAnchor: "middle",
					fontSize: "130%",
					fill: "Black",
					top: '30px'
				}}
				>Date and Time</Label></XAxis>
				<YAxis dataKey="temperature">
					<Label style={{
						textAnchor: "middle",
						fontSize: "130%",
						fill: "Black",
						top: '30px'
					}}
					>Temperature (C)</Label>
				</YAxis>
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="temperature"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
				<Line type="monotone" dataKey="maxTemperature" stroke="#f94449" />
				<Line type="monotone" dataKey="minTemperature" stroke="#3895d3" />

			</LineChart>
		</>
	)
}

export default Temperature