import Choices from "choices.js";
import { cities } from "../../json/cities.js";
import { choiceConfig } from "../../modules/choices.js";

const newArrCities = cities.map((city, index) => {
	// let obj = Object.assign({}, city);
	// index == 0 ? city.label = true : null;
	return {
		...city,
		value: city.label,
		id: index + 1,
		selected: false,
	}
})
// Добавляем в начало массива элемент (объект) с пустыми значениями, чтобы оставить селект пустым, если ничего не выбрано
newArrCities.unshift({ value: "", label: "", selected: true, disabled: true })


let forms = document.querySelectorAll('.form');
forms.forEach((form) => {
	setCities(form, ".departureСity");
	setCities(form, ".visaCity");
})
function setCities(form, selectId) {
	let select = form.querySelector(selectId);
	if (select) {
		let choices = new Choices(select, choiceConfig);
		choices.setChoices(newArrCities, 'value', 'label');
	}
	return false;
}

