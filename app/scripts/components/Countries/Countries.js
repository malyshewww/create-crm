import Choices from "choices.js";
import { countries } from "../../json/countries.js";
import { choiceConfig } from "../../modules/choices.js";

const newArrCountries = countries.map((country, index) => {
	index == 0 ? country.selected = true : null;
	return {
		...country,
		value: country.label,
		id: index + 1,
	}
})
const selectCountries = document.getElementById('countryArrival');
let choices = new Choices(selectCountries, choiceConfig);
choices.setValue(newArrCountries);