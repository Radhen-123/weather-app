import Search from "../components/search/search";
import {getWeatherData} from "../services/weatherServices";
import {weatherParameters} from "../services/weatherServices";
import { useState} from "react";
import Temperature from "../components/temperature/temperature";
import WindSpeed from "../components/windSpeed/windSpeed";
import Humidity from "../components/humidity/humidity";
import DatePicker from "../components/datePicker/datePicker";

const Home = (prop) =>
{
	// var today = new Date();
	// var dd = String(today.getDate()).padStart(2, '0');
	// var mm = String(today.getMonth() + 1).padStart(2, '0');
	// var yyyy = today.getFullYear();

	// today = yyyy + '-' + mm + '-' + dd;

	let today = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()


	const [getTemperature, setTemperature] = useState([{}])
	const [getMaxTemperature, setMaxTemperature] = useState([{}])
	const [getMinTemperature, setMinTemperature] = useState([{}])
	const [getHumidity, setHumidity] = useState([{}])
	const [getWindSpeed, setWindSpeed] = useState([{}])
	const [getEndDate, setEndDate] = useState('')
	const [getSearchValue, setSearchValue] = useState({})

	let searchHandler = async (searchValue) => {
		if (!searchValue) searchValue = {value : '22,34'}
		setSearchValue(searchValue)
		let maxTemperature = await getWeatherData(searchValue.value, weatherParameters.maxTemperature, getEndDate)
		let minTemperature = await getWeatherData(searchValue.value, weatherParameters.minTemperature, getEndDate)
		let temperature = await getWeatherData(searchValue.value, weatherParameters.temperatureC, getEndDate)
		let windSpeed = await getWeatherData(searchValue.value, weatherParameters.windSpeed, getEndDate)
		let humidityData = await getWeatherData(searchValue.value, weatherParameters.relativeHumidity, getEndDate)

		setTemperature(temperature)
		setMinTemperature(minTemperature)
		setMaxTemperature(maxTemperature)
		setWindSpeed(windSpeed)
		setHumidity(humidityData)
	}
	let dateChangeHandler = (date) => {
		console.log(date)
		setEndDate(date)
		searchHandler(getSearchValue)
	};
	return (
		<>
			<Search onCityChange={searchHandler}/>
			<br/>
			<DatePicker onDateChange={dateChangeHandler}/>
			<hr/>
			<br/>
			<h1>Temperature</h1>

			{getTemperature ? <Temperature temperatureData={getTemperature} maxTemperature={getMaxTemperature} minTemperature={getMinTemperature}></Temperature>:''}
			<br/>
			<hr/>
			<br/>

			<h1>Wind Speed</h1>
			<WindSpeed windSpeedData={getWindSpeed}></WindSpeed>

			<br/>
			<hr/>
			<br/>

			<h1>Humidity</h1>
			<Humidity humidityData={getHumidity}></Humidity>
		</>

	)
}


export default Home;