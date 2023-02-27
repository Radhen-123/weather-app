export const getCities = async (value = '') =>
{
	if (!value) return
	try
	{
		let finalResult = []
		let response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&format=json&apiKey=${process.env.REACT_APP_GEOLOCATION}`)
		let responseJson = await response.json()
		await responseJson.results.forEach(value => {
			finalResult.push({
				address: value.formatted,
				lat: value.lat,
				lon: value.lon,
			})
		})
		return finalResult

	}
	catch (e) {
		console.log(e)
		return ''
	}
}