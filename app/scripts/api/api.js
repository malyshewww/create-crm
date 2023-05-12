export const rates = {};
getCurrencies();
// Асинхронная функция для получения текущего курса
async function getCurrencies() {
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
	const data = await response.json();
	const result = await data;
	rates.USD = result.Valute.USD;
	rates.EUR = result.Valute.EUR;
}


