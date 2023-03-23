// import 'fslightbox'; // Lightbox: npm install fslightbox, site: https://fslightbox.com/javascript/documentation
// import Swiper from 'swiper'; // Slider: npm install swiper, site: https://swiperjs.com/get-started
// import AirDatepicker from 'air-datepicker'; // Datepicker: npm i air-datepicker -S, site: https://air-datepicker.com/ru
// import { jQuery, $ } from 'jquery';
console.log('test')

import AirDatepicker from "air-datepicker";


import "./libs/jquery.min.js";
import "./libs/bootstrap.bundle.min.js";
// Подключение модуля таблицы
import "./modules/paginationTable.js";
// Подключение модуля табов
import "./modules/tabs.js";

import moment from 'moment';

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

let inputTriggerStart = document.querySelector('.input-trigger-start');
let inputTriggerEnd = document.querySelector('.input-trigger-end');
let inputStartDate = document.querySelector('input[name="start_tour"]');
let datepickerStart = new AirDatepicker(inputTriggerStart, {
	dateSeparator: "",
	autoClose: true,
	position: 'bottom right',
	dateFormat: 'dd.MM.yyyy',
	altField: 'input[name="start_tour"]',
	altFieldDateFormat: 'dd.MM.yyyy',
	buttons: ['today', 'clear'],
	dateSeparator: " ",
	onSelect: ({ date, datepicker }) => {
		console.log(date)
		console.log(datepicker)
		datepickerEnd.update({
			minDate: date
		})
	},
});
let datepickerEnd = new AirDatepicker(inputTriggerEnd, {
	dateSeparator: "",
	autoClose: true,
	position: 'bottom right',
	dateFormat: 'dd.MM.yyyy',
	altField: 'input[name="end_tour"]',
	altFieldDateFormat: 'dd.MM.yyyy',
	buttons: ['today', 'clear'],
	onSelect: ({ date, datepicker }) => {
		datepickerStart.update({
			maxDate: date
		})
	}
});

inputStartDate.addEventListener('change', function (e) {
	let value = inputStartDate.value;
	let newDate = new Date(value);
	inputStartDate.value = inputStartDate.value.replace(/([%#/?*+^$[\]\\(){}-])/g, '.');
	moment.defaultFormat = "DD.MM.YYYY";
	const date = moment(newDate, moment.defaultFormat, true).toDate();
	console.log(date);
	datepickerStart.selectedDates[0] = date;
	datepickerEnd.minDate = date;
})
const fieldGroupItems = document.querySelectorAll('.field-group__item');
[...fieldGroupItems].forEach((group) => {
	let inputTriggerStart = group.querySelector('.input-trigger-start');
	let inputTriggerEnd = group.querySelector('.input-trigger-end');
	let inputStartDate = group.querySelector('input[name="start_tour"]');
	let inputEndDate = group.querySelector('input[name="end_tour"]');
	// dateStart(inputTriggerStart, inputStartDate)
	// dateEnd(inputTriggerEnd, inputEndDate)
})
// let datepicker = new AirDatepicker(inputTriggerStart, {
// 	dateSeparator: "",
// 	autoClose: true,
// 	position: 'bottom right',
// 	dateFormat: 'dd.MM.yyyy',
// 	altField: 'input[name="start_tour"]',
// 	altFieldDateFormat: 'dd.MM.yyyy',
// 	buttons: [button, 'clear']
// });

import DataTable from 'datatables.net-dt';
// let table = new DataTable('#example', {
// 	// ordering: false,
// 	responsive: true,
// 	// searching: false
// });
