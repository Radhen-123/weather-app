import React, {useState} from "react";
import {AsyncPaginate} from "react-select-async-paginate";
import {getCities} from "../../services/citiesServices";

const Search = ({onCityChange}) =>
{
	const [searchValue, setSearchValue] = useState(null);

	const getOptions = async (inputValue) => {
		const citiesList = await getCities(inputValue);
		return {
			options: citiesList.map((city) =>
			{
				return {
					value: `${city.lat},${city.lon}`,
					label: `${city.address}`,
				};
			}),
		}
	};

	const onChangeSelect = (enteredData) => {
		setSearchValue(enteredData);
		onCityChange(enteredData)
	};

	return (
		<AsyncPaginate
			placeholder="Search for cities"
			value={searchValue}
			onChange={onChangeSelect}
			loadOptions={getOptions}
		/>
	);
};

export default Search;

