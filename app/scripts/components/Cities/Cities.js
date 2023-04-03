import Choices from "choices.js";
import { cities } from "../../json/cities.js";
import { choiceConfig } from "../../modules/choices.js";

const newArrCities = cities.map((city, index) => {
	// let obj = Object.assign({}, city);
	index == 0 ? city.selected = true : null;
	return {
		...city,
		value: city.label,
		id: index + 1,
	}
})

const selectCities = document.getElementById('departureСity');
const selectVisaCities = document.getElementById('visaCity');

function setCities(selectId) {
	let choices = new Choices(selectId, choiceConfig);
	choices.setValue(newArrCities);
}

setCities(selectCities);
setCities(selectVisaCities);
