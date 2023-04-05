// Плагин календаря air-datepicker
import AirDatepicker from "air-datepicker";
// Библиотека для позиционирования календаря
import { createPopper } from '@popperjs/core';
// Библиотека для настройки анимации появления | скрытия календаря
import anime from 'animejs';
// Плагин для форматирования даты
import moment from 'moment';

// Массив со значениями атрибутов, для которых в конфигурацию добавляется возможность выбора времени помиом основной даты
const dateValues = ["dateflight_start", "dateflight_end", "datetransfer_start", "datetransfer_end", "datehabitation_start", "datehabitation_end", "expose_payment_date", "pay_date"];

function mobilePicker() {
	return window.innerWidth >= 991.98 ? false : true
}
window.addEventListener("resize", function () {
	mobilePicker();
})

// Конфигурация для одиночных дат
let button = {
	content: 'Применить',
	className: 'custom-button-classname',
	onClick: (dp, date) => {
		let newDate = new Date(date);
		dp.selectDate(newDate);
		dp.setViewDate(newDate);
		dp.hide();
	}
}
function singleDates(datesId) {
	const inputTriggerDates = document.querySelectorAll(`[data-id=${datesId}]`);
	[...inputTriggerDates].forEach((item) => {
		const parent = item.closest('.field-group__box');
		const altFieldDate = parent.querySelector('.field-group__input')
		let datepicker = new AirDatepicker(item, {
			dateSeparator: "",
			position: "bottom right",
			autoClose: false,
			dateFormat: dateValues.includes(datesId) ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
			altField: altFieldDate,
			altFieldDateFormat: dateValues.includes(datesId) ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
			buttons: ['today', 'clear', button],
			timepicker: dateValues.includes(datesId) ? true : false,
			timeFormat: 'HH:mm',
			// navTitles: {
			// 	days: '<strong>yyyy</strong> <i>MMMM</i>',
			// 	months: 'Выберите месяц в  <strong>yyyy</strong>'
			// },
			container: "#scroll-container",
			position({ $datepicker, $target, $pointer, isViewChange, done }) {
				let popper = createPopper($target, $datepicker, {
					placement: 'bottom',
					onFirstUpdate: state => {
						!isViewChange && anime.remove($datepicker);
						$datepicker.style.transformOrigin = 'center top';
						!isViewChange && anime({
							targets: $datepicker,
							opacity: [0, 1],
							rotateX: [-90, 0],
							easing: 'spring(1.3, 80, 5, 0)',
						})

					},
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 10]
							}
						},
						{
							name: 'arrow',
							options: {
								element: $pointer,
							}
						},
						{
							name: 'computeStyles',
							options: {
								gpuAcceleration: false,
							},
						},
					]
				});
				return () => {
					anime({
						targets: $datepicker,
						opacity: 0,
						rotateX: -90,
						duration: 300,
						easing: 'easeOutCubic'
					}).finished.then(() => {
						popper.destroy();
						done();
					})
				}
			}
		})
		altFieldDate.addEventListener('change', function (e) {
			let value = altFieldDate.value;
			let newDate = new Date(value).toString();
			altFieldDate.value = altFieldDate.value.replace(/([%;#/?*+^$[\]\\(){}-])/g, '.');
			moment.defaultFormat = "DD.MM.YYYY";
			const date = moment(newDate, moment.defaultFormat, true).toDate();
			datepicker.selectedDates[0] = date;
		})
	});
}
singleDates("date");
singleDates("pay_date");

// Функция для диапазона дат
function rangeDate(start, end) {
	let inputTriggerStart = document.querySelector(`[data-id=${start}]`);
	let inputTriggerEnd = document.querySelector(`[data-id=${end}]`);
	let inputAltFieldStart = document.querySelector(`input[name=${start}]`);
	let inputAltFieldEnd = document.querySelector(`input[name=${end}]`);
	let datepickerStart = new AirDatepicker(inputTriggerStart, {
		autoClose: dateValues.includes(start) ? false : true,
		position: 'bottom right',
		dateFormat: dateValues.includes(start) ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
		altField: inputAltFieldStart,
		altFieldDateFormat: dateValues.includes(start) ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
		buttons: ['today', 'clear'],
		dateSeparator: ",",
		timepicker: dateValues.includes(start) ? true : false,
		timeFormat: 'HH:mm',
		isMobile: mobilePicker(),
		onSelect: ({ date, datepicker }) => {
			console.log(date)
			console.log(datepicker)
			datepickerEnd.update({
				minDate: date
			})
		},
	});
	let datepickerEnd = new AirDatepicker(inputTriggerEnd, {
		autoClose: dateValues.includes(end) ? false : true,
		position: 'bottom right',
		dateFormat: dateValues.includes(end) ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
		altField: inputAltFieldEnd,
		altFieldDateFormat: dateValues.includes(end) ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
		buttons: ['today', 'clear'],
		dateSeparator: ",",
		timepicker: dateValues.includes(end) ? true : false,
		timeFormat: 'HH:mm',
		isMobile: mobilePicker(),
		onSelect: ({ date, datepicker }) => {
			datepickerStart.update({
				maxDate: date
			})
		}
	});
}
rangeDate("date_start", "date_end");
rangeDate("datetour_start", "datetour_end");
rangeDate("datetourpack_start", "datetourpack_end");
rangeDate("dateflight_start", "dateflight_end");
rangeDate("dateinsurance_start", "dateinsurance_end");
rangeDate("datetransfer_start", "datetransfer_end");
rangeDate("datevisa_start", "datevisa_end");
rangeDate("datehabitation_start", "datehabitation_end");
// let inputStartDate = document.querySelector('input[name="date_start"]');
// if (inputStartDate) {
// 	inputStartDate.addEventListener('change', function (e) {
// 		let value = inputStartDate.value;
// 		let newDate = new Date(value);
// 		inputStartDate.value = inputStartDate.value.replace(/([%#/?*+^$[\]\\(){}-])/g, '.');
// 		moment.defaultFormat = "DD.MM.YYYY";
// 		const date = moment(newDate, moment.defaultFormat, true).toDate();
// 		console.log(date);
// 		datepickerStart.selectedDates[0] = date;
// 		datepickerEnd.minDate = date;
// 	})
// }
