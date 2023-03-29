// import 'fslightbox'; // Lightbox: npm install fslightbox, site: https://fslightbox.com/javascript/documentation
// import Swiper from 'swiper'; // Slider: npm install swiper, site: https://swiperjs.com/get-started
// import AirDatepicker from 'air-datepicker'; // Datepicker: npm i air-datepicker -S, site: https://air-datepicker.com/ru

// Подключение библиотеки jquery
import "./libs/jquery.min.js";

// Подключение модуля translit
import "./modules/translit.js";

// Подключение модуля choices
import "./modules/choices.js";

// Подключение модуля calendar
import "./modules/calendar.js";

// Подключение модуля таблицы
import "./modules/paginationTable.js";

// Подключение модуля табов
import "./modules/tabs.js";

// Подключение модуля с курсами валют
import "./modules/currency.js";

// import "./libs/jquery.min.js";
import "./libs/bootstrap.bundle.min.js";

// import "./libs/jquery.min.js";
import "./modules/bootstrapTooltip.js";

document.addEventListener('click', documentActions);

function documentActions(event) {
	const target = event.target;
	if (target.closest('#passport-data')) {
		showHide("#passport-data", ".customer-passport");
	}
	if (target.closest('#tourist-price')) {
		showHide("#tourist-price", ".tourist-price-content");
	}
	if (target.closest('#finance-price')) {
		showHide("#finance-price", ".finance-price-content");
	}
	if (target.closest('#history-price')) {
		showHide("#history-price", ".finance-table");
	}
}
function showHide(target, contentBlock) {
	const btn = document.querySelector(target);
	btn.classList.toggle('isActive');
	const content = document.querySelector(contentBlock);
	content.hasAttribute('hidden')
		? content.removeAttribute('hidden')
		: content.setAttribute('hidden', 'true')
}

import DataTable from 'datatables.net-dt';
// let table = new DataTable('#example', {
// 	// ordering: false,
// 	responsive: true,
// 	// searching: false
// });
