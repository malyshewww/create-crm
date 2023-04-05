
import DataTable from 'datatables.net-dt';
let table = new DataTable('#table-id', {
	ordering: false,
	responsive: true,
	searching: false,
	"language": {
		"emptyTable": "Данные в таблице отсутствуют",
		"lengthMenu": "Элементов на странице _MENU_",
		// "info": "Страница _START_ из _END_ (Всего элементов: _TOTAL_)",
		"info": "Страница _PAGE_ из _PAGES_ (Всего элементов: _TOTAL_)",
		"infoEmpty": "Страница 0 to 0 (Всего элементов: 0)",
		"search": "Search:",
		"paginate": {
			"first": "First",
			"last": "Last",
			"next": `<span><i class="fa-solid fa-angle-right"></i></span`,
			"previous": `<span><i class="fa-solid fa-angle-left"></i></span>`
		},
	},
	"aLengthMenu": [[1, 5, 10, 15, 25, 50, 100, 200 - 1], [1, 5, 10, 15, 25, 50, 100, 200, "All"]],
	"iDisplayLength": 5,
});

const mainPage = document.querySelector('main');
if (mainPage) {
	const tableLength = document.querySelector('.dataTables_length');
	const tableInfo = document.querySelector('.dataTables_info');
	const tablePaginate = document.getElementById('table-id_paginate')
	const pagination = document.querySelector('.pagination')
	const tableBottom = document.querySelector('.table-bottom');
	pagination.insertAdjacentElement("afterbegin", tableInfo);
	pagination.insertAdjacentElement("beforeend", tablePaginate);
	tableBottom.insertAdjacentElement("beforeend", tableLength);
}