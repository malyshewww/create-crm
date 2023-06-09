// Плагин календаря air-datepicker
import AirDatepicker from "air-datepicker";
// Библиотека для позиционирования календаря
import { createPopper } from '@popperjs/core';
// Библиотека для настройки анимации появления | скрытия календаря
import anime from 'animejs';
// Плагин для форматирования даты
import moment from 'moment';

// Массив со значениями атрибутов, для которых в конфигурацию добавляется возможность выбора времени помиом основной даты
// const dateValues = ["dateflight_start", "dateflight_end", "datetransfer_start", "datetransfer_end", "datehabitation_start", "datehabitation_end", "expose_payment_date", "pay_date"];

let deviceType = window.innerWidth < 991.98 ? 'mobile' : 'desktop';

function initDatePicker(type) {
	const rangeDateConfig = {
		position: 'bottom right',
		buttons: ['today', 'clear'],
		dateSeparator: ",",
		timeFormat: 'HH:mm',
	}

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
	let startConfig = {}
	let endConfig = {}
	let singleDateConfig = {}
	let settings = {}
	let singleDateSettings = {}
	if (type === 'mobile') {
		settings = {
			// описание настроек для мобильной вариации.
			isMobile: true,
		}
	} else {
		settings = {
			// описание настроек для десктопной вариации.
			isMobile: false,
		}
		singleDateSettings = {
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
		}
	}
	let forms = document.querySelectorAll('.form, .form-filter');
	[...forms].forEach((form) => {
		let inputTriggerStart = form.querySelector('[data-trigger="date_start"]');
		let inputTriggerEnd = form.querySelector('[data-trigger="date_end"]');
		let inputAltFieldStart = form.querySelector('[data-name="date_start"]');
		let inputAltFieldEnd = form.querySelector('[data-name="date_end"]');
		if (inputTriggerStart && inputTriggerEnd && inputAltFieldStart && inputAltFieldEnd) {
			if (inputAltFieldStart.value != "") {
				startConfig = {
					selectedDates: [inputAltFieldStart.value]
				}
			}
			if (inputAltFieldEnd.value != "") {
				endConfig = {
					selectedDates: [inputAltFieldEnd.value]
				}
			}
			let inputAltFieldStartFormat = inputAltFieldStart.dataset.format;
			let inputAltFieldEndFormat = inputAltFieldEnd.dataset.format;
			let datepickerStart = new AirDatepicker(inputTriggerStart, {
				altField: inputAltFieldStart,
				...rangeDateConfig,
				...settings,
				autoClose: true,
				dateFormat: inputAltFieldStartFormat == 'datetime' ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
				altFieldDateFormat: inputAltFieldStartFormat == 'datetime' ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
				timepicker: inputAltFieldStartFormat == 'datetime' ? true : false,
				onSelect: ({ date, datepicker }) => {
					datepickerEnd.update({
						minDate: date
					})
				},
				...startConfig
				// selectDates: [inputAltFieldStart.value != '' ? inputAltFieldStart.value : '']
			});
			let datepickerEnd = new AirDatepicker(inputTriggerEnd, {
				altField: inputAltFieldEnd,
				...rangeDateConfig,
				...settings,
				autoClose: true,
				dateFormat: inputAltFieldEndFormat == 'datetime' ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
				altFieldDateFormat: inputAltFieldEndFormat == 'datetime' ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
				timepicker: inputAltFieldEndFormat == 'datetime' ? true : false,
				onSelect: ({ date, datepicker }) => {
					datepickerStart.update({
						maxDate: date
					})
				},
				...endConfig
				// selectDates: [inputAltFieldEnd.value != '' ? inputAltFieldEnd.value : '']
			});
		}
	})
	function singleDates() {
		const inputTriggerDates = document.querySelectorAll('[data-trigger="date"]');
		[...inputTriggerDates].forEach((item) => {
			const parent = item.closest('.field-group__box');
			const altFieldDate = parent.querySelector('.field-group__input')
			let altFieldDateFormat = altFieldDate.dataset.format;
			if (altFieldDate.value != "") {
				singleDateConfig = {
					selectedDates: [altFieldDate.value]
				}
			}
			let datepicker = new AirDatepicker(item, {
				...settings,
				dateSeparator: "",
				position: "bottom right",
				autoClose: false,
				dateFormat: altFieldDateFormat == "datetime" ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
				altField: altFieldDate,
				altFieldDateFormat: altFieldDateFormat == "datetime" ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy",
				buttons: ['today', 'clear', button],
				timepicker: altFieldDateFormat == "datetime" ? true : false,
				timeFormat: 'HH:mm',
				// navTitles: {
				// 	days: '<strong>yyyy</strong> <i>MMMM</i>',
				// 	months: 'Выберите месяц в  <strong>yyyy</strong>'
				// },
				...singleDateConfig
				// selectedDates: [altFieldDate.value != '' ? altFieldDate.value : '']
			})
		});
	}
	singleDates();
}
initDatePicker(deviceType)
window.addEventListener("resize", () => {
	if (window.innerWidth < 991.98 && deviceType == 'desktop') {
		deviceType = 'mobile';
		// initDatePicker(deviceType);
	} else if (window.innerWidth > 991.98 && deviceType == 'mobile') {
		deviceType = 'desktop';
		// initDatePicker(deviceType);
	}
});

// Функция для диапазона дат
// let inputStartDate = document.querySelector('input[name="date_start"]');
// if (inputStartDate) {
// 	inputStartDate.addEventListener('change', function (e) {
// 		let value = inputStartDate.value;
// 		let newDate = new Date(value);
// 		inputStartDate.value = inputStartDate.value.replace(/([%#/?*+^$[\]\\(){}-])/g, '.');
// 		moment.defaultFormat = "DD.MM.YYYY";
// 		const date = moment(newDate, moment.defaultFormat, true).toDate();
// 		datepickerStart.selectedDates[0] = date;
// 		datepickerEnd.minDate = date;
// 	})
// }
