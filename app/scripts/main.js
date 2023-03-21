// import 'fslightbox'; // Lightbox: npm install fslightbox, site: https://fslightbox.com/javascript/documentation
// import Swiper from 'swiper'; // Slider: npm install swiper, site: https://swiperjs.com/get-started
// import AirDatepicker from 'air-datepicker'; // Datepicker: npm i air-datepicker -S, site: https://air-datepicker.com/ru
// import { jQuery, $ } from 'jquery';
console.log('test')

import "./libs/jquery.min.js";
// Подключение модуля таблицы
import "./modules/paginationTable.js";
// Подключение модуля табов
import "./modules/tabs.js";

document.addEventListener('click', documentActions);

function documentActions(event) {
	const target = event.target;
	if (target.closest('#passport-data')) {
		const passportBtn = document.querySelector('#passport-data');
		const passportDataContent = document.querySelector('.customer-passport');
		passportDataContent.hasAttribute('hidden')
			? passportDataContent.removeAttribute('hidden')
			: passportDataContent.setAttribute('hidden', 'true')
		// if (passportDataContent.hasAttribute('hidden')) {
		// 	passportDataContent.removeAttribute('hidden')
		// }
	}
}
// import DataTable from 'datatables.net-dt';
// let table = new DataTable('#tour-table', {
// 	"ordering": false,
// 	"searching": false
// });