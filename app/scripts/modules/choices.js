// Плагин для создания селектов
import Choices from "choices.js";

// Общая конфигурация для всех селектов
const choiceConfig = {
	noResultsText: "Ничего не найдено",
	itemSelectText: "",
	searchPlaceholderValue: "Поиск",
	placeholder: false,
	shouldSortItems: false,
	allowHTML: true,
};
const selectChoices = document.querySelectorAll('.select-choices');
[...selectChoices].forEach((select) => {
	if (select.getAttribute('id') != "visaCity") {
		const choices = new Choices(select, choiceConfig)
	}
})
const selectVisaCity = document.getElementById('visaCity');
const parentCity = selectVisaCity.closest('.field-group__item');
if (selectVisaCity) {
	parentCity.style.display = "none";
	const choices = new Choices(selectVisaCity, choiceConfig)
}
const selectVisaInfo = document.getElementById('visaInfo');
selectVisaInfo.addEventListener('change', (event) => {
	showFieldSelect(event, parentCity);
});
function showFieldSelect(event, selector) {
	let target = event.target
	const currentSelectValue = target.value;
	currentSelectValue == "yes" ? selector.style.display = "block" : selector.style.display = "none";
}

const selectInsuranceType = document.getElementById('insuranceType');
const inputInsuranceTypeOther = document.querySelector('input[name="insurance_type_other"]');
let inputInsuranceTypeOtherParent = inputInsuranceTypeOther.closest(".field-group__item");
inputInsuranceTypeOtherParent.setAttribute('hidden', true);
selectInsuranceType.addEventListener('change', (event) => {
	let target = event.target;
	const currentSelectValue = target.value;
	if (currentSelectValue == "other") {
		inputInsuranceTypeOtherParent.removeAttribute('hidden');
		setTimeout(() => {
			inputInsuranceTypeOther.focus();
		}, 100)
	} else {
		inputInsuranceTypeOtherParent.setAttribute('hidden', true);
	}
})
