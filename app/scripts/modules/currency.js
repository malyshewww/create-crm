const rates = {};

getCurrencies();

// Асинхронная функция для получения текущего курса
async function getCurrencies() {
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
	const data = await response.json();
	const result = await data;
	console.log(result);
	rates.USD = result.Valute.USD;
	rates.EUR = result.Valute.EUR;
}

// Функция для получения селекторов и вызова функции с калькуляцией
function getValute(selectId, inputName) {
	const input = document.querySelector(`input[name=${inputName}]`)
	const select = document.getElementById(`${selectId}`)
	input.addEventListener('change', () => {
		convertValue(select, input);
	});
	select.addEventListener('change', () => {
		convertValue(select, input);
	});
}

// Функция для калькуляции стоимости с текущим курсом
function convertValue(select, input) {
	if (select.value != "RUB" && input.value != "") {
		input.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
		// input.value = Math.ceil((parseFloat(input.value) / rates[select.value].Value) * 100) / 100;
	}
}
getValute("exposeCurrency", "expose_payment_sum");
// getValute("tourPackageCurrency", "parameters_course_tourist");

// Функция для скрытия | показа поля с курсом в зависимости от выбранного значения в селекте
function hiddenField() {
	const selectTourPackageCurrency = document.getElementById('tourPackageCurrency');
	const inputCourseTourist = document.querySelector('input[name="parameters_course_tourist"]')
	const parentField = inputCourseTourist.closest('.field-group__item');
	parentField.setAttribute('hidden', true);
	selectTourPackageCurrency.addEventListener('change', (event) => {
		let self = event.target;
		const parametersPrices = document.querySelectorAll('.parameters-price');
		[...parametersPrices].forEach((parametr) => {
			const label = parametr.querySelector('.field-group__label')
			label.innerHTML = self.value;
		})
		if (self.value != "RUB") {
			parentField.removeAttribute('hidden');
		} else {
			parentField.setAttribute('hidden', true);
			inputCourseTourist.value = "";
		}
	})
}
hiddenField();