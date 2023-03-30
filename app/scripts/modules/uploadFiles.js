const inputUpload = document.querySelector('#file_uploads');
const preview = document.querySelector('.preview');

inputUpload.style.opacity = 0;
inputUpload.addEventListener('change', updateImageDisplay);
function updateImageDisplay() {
	while (preview.firstChild) {
		preview.removeChild(preview.firstChild);
	}
	const curFiles = inputUpload.files;
	if (curFiles.length === 0) {
		const para = document.createElement('p');
		para.textContent = 'No files currently selected for upload';
		preview.appendChild(para);
	} else {
		const list = document.createElement('ul');
		preview.appendChild(list);

		for (const file of curFiles) {
			const listItem = document.createElement('li');
			const para = document.createElement('p');
			if (validFileType(file)) {
				para.textContent = `File name: ${file.name}, file size: ${returnFileSize(file.size)}.`;
				// const image = document.createElement('img');
				// image.src = URL.createObjectURL(file);

				// listItem.appendChild(image);
				listItem.appendChild(para);
			} else {
				alert("Недопустимый тип файла");
				// para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
				listItem.appendChild(para);
			}
			list.appendChild(listItem);
		}
	}
}
const fileTypes = [
	"image/apng",
	"image/bmp",
	"image/gif",
	"image/jpeg",
	"image/pjpeg",
	"image/png",
	"image/svg+xml",
	"image/tiff",
	"image/webp",
	"image/x-icon"
];

function validFileType(file) {
	return fileTypes.includes(file.type);
}
function returnFileSize(number) {
	if (number < 1024) {
		return `${number} bytes`;
	} else if (number >= 1024 && number < 1048576) {
		return `${(number / 1024).toFixed(1)} KB`;
	} else if (number >= 1048576) {
		return `${(number / 1048576).toFixed(1)} MB`;
	}
}

const dropArea = document.querySelector('.drag-area');

dropArea.addEventListener('click', () => {
	inputUpload.click();
})

let file;

dropArea.addEventListener('dragover', (event) => {
	event.preventDefault();
	dropArea.classList.add('active');
	// console.log('File is over dropArea');
})
dropArea.addEventListener('dragleave', () => {
	dropArea.classList.remove('active');
	// console.log('File is outside from dropArea');
})
dropArea.addEventListener('drop', (event) => {
	event.preventDefault();
	file = event.dataTransfer.files[0];
	if (file.size > 15728640) {
		alert("Файл не должен превышать 15 МБ")
	}
	if (validFileType(file)) {
		// Если необходимо вывести изображение в превью, то делаем через создание new FileReader()
		// let fileReader = new FileReader();
		// fileReader.onload = function () {
		// 	let fileURL = fileReader.result;
		// 	let imgTag = `<img src="${fileURL}" alt>`;
		// 	dropArea.innerHTML = imgTag;
		// }
		// fileReader.readAsDataURL(file)
		preview.textContent = `File name: ${file.name}, file size: ${returnFileSize(file.size)}.`;
		dropArea.classList.remove('active');
	} else {
		alert("Недопустимый тип файла");
		// preview.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
		dropArea.classList.remove('active');
	}
	// console.log('File is dropped on dropArea');
})
