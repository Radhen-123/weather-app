// export const getWeatherData = async (datetime, )

const BASE_URL = 'https://api.meteomatics.com'

// https://api.meteomatics.com/2023-02-26T10:40:00.000-05:00/t_2m_min_1d_efi:idx/43.6534817,-79.3839347/json?model=mix
// https://api.meteomatics.com/2023-02-26T10:40:00.000-05:00--2023-02-27T10:40:00.000-05:00:PT30M/t_2m_min_1d_efi:idx/43.6534817,-79.3839347/json?model=mix
// api.meteomatics.com/2023-02-27T00:00:00Z--2023-03-02T00:00:00Z
let headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(process.env.REACT_APP_WEATHER_USERNAME + ':' + process.env.REACT_APP_WEATHER_PASSWORD));
// headers.append('Access-Control-Allow-Origin:','*')
const WEATHER_API_OPTIONS = {
	method: 'GET',
	headers: headers
}

export const weatherParameters = {
	windSpeed: 'wind_speed_10m:ms',
	temperatureC : 't_2m:C',
	maxTemperature: 't_max_2m_24h:C',
	minTemperature : 't_min_2m_24h:C',
	temperatureF : 't_2m:F',
	precipitation : 'precip_24h:mm',
	weatherSymbolForHour : 'weather_symbol_1h:idx',
	uvIndex : 'uv:idx',
	relativeHumidity : 'relative_humidity_1000hPa:p'
}

export const getWeatherData = async (location = '43.6, -79', parameter = weatherParameters.temperatureC, endDate) => {
	let today = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
	// let today = new Date().toUTCString().replace(/\s+/g,'')
	if (endDate == '') {
		endDate = ''
	}
	console.log(endDate) //2023-02-27T22:43
	// needed date 2023-02-28T13:00:00Z
	location = location.replace(/\s+/g,'')
	try {
		let result = []
		// let response = await fetch(`${BASE_URL}/${today}--${date}T10:40:00.000-05:00:PT30M/${parameter}/${location}/json?model=mix`, WEATHER_API_OPTIONS)
		let response = await fetch(`${BASE_URL}/${today}--${endDate+'00Z'}/${parameter}/${location}/json?model=mix`, WEATHER_API_OPTIONS)
		let responseJson = await response.json()
		await responseJson.data.forEach(val => {
			result =  val.coordinates[0].dates
		})
		return result
	}
	catch (e) {
		console.log(e)
	}
}
