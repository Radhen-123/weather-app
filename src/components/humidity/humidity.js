import {PieChart, Pie} from 'recharts';
const Humidity = ({humidityData}) =>
{
	let graphData = [{}]
	humidityData.forEach((data) => {
		let dateData = new Date(data.date)
		graphData.push([{
			date: `${dateData.getDate()}-${dateData.getMonth() + 1}(${dateData.getHours()}:${dateData.getMinutes()})`,
			humidity: data.value,
		},{
			data:'',
			humidity : 100-data.value
		}])
	})

	return (
		<>
			<PieChart width={250} height={250}>
				<Pie
					dataKey="humidity"
					startAngle={180}
					endAngle={0}
					data={graphData[1]}
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill="rgb(137, 207, 239)"
					label
				/>
			</PieChart>
		</>
	)
}

export default Humidity