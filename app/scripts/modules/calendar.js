// Плагин календаря air-datepicker
import AirDatepicker from "air-datepicker";
// Плагин для форматирования даты
import moment from 'moment';

const inputTriggerDate = document.querySelector('.input-trigger-date');
if (inputTriggerDate) {
	const parent = inputTriggerDate.closest('.field-group__box');
	const altFieldDate = parent.querySelector('.field-group__input')
	let datepicker = new AirDatepicker(inputTriggerDate, {
		dateSeparator: "",
		autoClose: true,
		position: 'bottom right',
		dateFormat: 'dd.MM.yyyy',
		altField: altFieldDate,
		altFieldDateFormat: 'dd.MM.yyyy',
		buttons: ['today', 'clear'],
	});
}

let inputTriggerStart = document.querySelector('.input-trigger-start');
let inputTriggerEnd = document.querySelector('.input-trigger-end');
let inputStartDate = document.querySelector('input[name="date_start"]');
let datepickerStart = new AirDatepicker(inputTriggerStart, {
	dateSeparator: "",
	autoClose: true,
	position: 'bottom right',
	dateFormat: 'dd.MM.yyyy',
	altField: 'input[name="date_start"]',
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
	altField: 'input[name="date_end"]',
	altFieldDateFormat: 'dd.MM.yyyy',
	buttons: ['today', 'clear'],
	onSelect: ({ date, datepicker }) => {
		datepickerStart.update({
			maxDate: date
		})
	}
});
if (inputStartDate) {
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
}
const fieldGroupItems = document.querySelectorAll('.field-group__item');
[...fieldGroupItems].forEach((group) => {
	let inputTriggerStart = group.querySelector('.input-trigger-start');
	let inputTriggerEnd = group.querySelector('.input-trigger-end');
	let inputStartDate = group.querySelector('input[name="date_start"]');
	let inputEndDate = group.querySelector('input[name="date_end"]');
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