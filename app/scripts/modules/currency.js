const rates = {};

getCurrencies();

async function getCurrencies() {
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
	const data = await response.json();
	const result = await data;
	console.log(result);
	rates.USD = result.Valute.USD;
	rates.EUR = result.Valute.EUR;
}
const selectCurrency = document.getElementById('exposeCurrency');
const input = document.querySelector('input[name="expose_payment_sum"]');
const result = input;

input.addEventListener('input', convertValue);
selectCurrency.addEventListener('change', convertValue);

function convertValue(event) {
	if (selectCurrency.value != "RUB" && input.value != "") {
		input.value = (parseFloat(input.value) / rates[selectCurrency.value].Value).toFixed(2);
	}
}