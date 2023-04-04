import Choices from "choices.js";
import { countries } from "../../json/countries.js";
import { choiceConfig } from "../../modules/choices.js";

const newArrCountries = countries.map((country, index) => {
	return {
		...country,
		value: country.label,
		id: index + 1,
		selected: false
	}
})
// Добавляем в начало массива элемент (объект) с пустыми значениями, чтобы оставить селект пустым, если ничего не выбрано
newArrCountries.unshift({ value: "", label: "", selected: true, disabled: true })

const selectCountries = document.getElementById('countryArrival');
let choices = new Choices(selectCountries, choiceConfig);
choices.setChoices(newArrCountries, 'value', 'label');
