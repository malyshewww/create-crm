// Плагин для создания селектов
import Choices from "choices.js";

// Общая конфигурация для всех селектов
export const choiceConfig = {
	noResultsText: "Ничего не найдено",
	itemSelectText: "",
	searchPlaceholderValue: "Поиск",
	placeholder: false,
	allowHTML: true,
	removeItemButton: true,
	searchResultLimit: 8,
	shouldSort: false,
};

const selectChoices = document.querySelectorAll('.select-choices');
[...selectChoices].forEach((select) => {
	let choices = new Choices(select, choiceConfig)
})
const selectVisaCity = document.getElementById('visaCity');
if (selectVisaCity) {
	const parentCity = selectVisaCity.closest('.field-group__item');
	parentCity.style.display = "none";
}
const selectVisaInfo = document.getElementById('visaInfo');
if (selectVisaInfo) {
	selectVisaInfo.addEventListener('change', (event) => {
		showFieldSelect(event, parentCity);
	});
}
function showFieldSelect(event, selector) {
	let target = event.target
	const currentSelectValue = target.value;
	currentSelectValue == "yes" ? selector.style.display = "block" : selector.style.display = "none";
}

const selectInsuranceType = document.getElementById('insuranceType');
const inputInsuranceTypeOther = document.querySelector('input[name="insurance_type_other"]');
if (selectInsuranceType && inputInsuranceTypeOther) {
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
}
