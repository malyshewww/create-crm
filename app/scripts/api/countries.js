
const key = "qvuXanVj6r1QRNGug8iGTGKApKYZo7vyhXvxNA5H";
const api_key = "0f88d657cf0950063ed934ddb7300983";
const code = "643";

async function getCountries() {
	const response = await fetch(`http://htmlweb.ru/json/geo/city_list?country=ru&api_key=${api_key}`)
	const data = await response.json();
	const result = await data;
	console.log(data);
}
getCountries();

