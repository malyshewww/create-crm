import { translit } from 'gost-transliteration';

const inputPersonSurName = document.querySelector('input[name="person_surname"]');
const inputPersonSurNameLat = document.querySelector('input[name="person_surname_lat"]');
const inputPersonName = document.querySelector('input[name="person_name"]');
const inputPersonNameLat = document.querySelector('input[name="person_name_lat"]');
const inputTranslit = document.querySelector('input[name="translit"]');

inputTranslit.addEventListener('change', (event) => {
	const inputPersonSurNameValue = inputPersonSurName.value;
	const inputPersonNameValue = inputPersonName.value;
	if (event.target.checked) {
		if (inputPersonSurNameValue != "" && inputPersonNameValue != "") {
			inputPersonSurNameLat.value = translit(inputPersonSurNameValue).toUpperCase();
			inputPersonNameLat.value = translit(inputPersonNameValue).toUpperCase();
		}
	} else {
		inputPersonSurNameLat.value = "";
		inputPersonNameLat.value = "";
	}
})
function transliterate(word) {
	var answer = "";
	var a = {}

	a["Ё"] = "YO"; a["Й"] = "I"; a["Ц"] = "TS"; a["У"] = "U"; a["К"] = "K"; a["Е"] = "E"; a["Н"] = "N"; a["Г"] = "G"; a["Ш"] = "SH"; a["Щ"] = "SCH"; a["З"] = "Z"; a["Х"] = "H"; a["Ъ"] = "'";
	a["ё"] = "yo"; a["й"] = "i"; a["ц"] = "ts"; a["у"] = "u"; a["к"] = "k"; a["е"] = "e"; a["н"] = "n"; a["г"] = "g"; a["ш"] = "sh"; a["щ"] = "sch"; a["з"] = "z"; a["х"] = "h"; a["ъ"] = "'";
	a["Ф"] = "F"; a["Ы"] = "Y"; a["В"] = "V"; a["А"] = "a"; a["П"] = "P"; a["Р"] = "R"; a["О"] = "O"; a["Л"] = "L"; a["Д"] = "D"; a["Ж"] = "ZH"; a["Э"] = "E";
	a["ф"] = "f"; a["ы"] = "y"; a["в"] = "v"; a["а"] = "a"; a["п"] = "p"; a["р"] = "r"; a["о"] = "o"; a["л"] = "l"; a["д"] = "d"; a["ж"] = "zh"; a["э"] = "e";
	a["Я"] = "Ya"; a["Ч"] = "CH"; a["С"] = "S"; a["М"] = "M"; a["И"] = "I"; a["Т"] = "T"; a["Ь"] = "'"; a["Б"] = "B"; a["Ю"] = "YU";
	a["я"] = "ya"; a["ч"] = "ch"; a["с"] = "s"; a["м"] = "m"; a["и"] = "i"; a["т"] = "t"; a["ь"] = "'"; a["б"] = "b"; a["ю"] = "yu";
	for (let i = 0; i < word.length; ++i) {
		answer += a[word[i]] === undefined ? word[i] : a[word[i]];
	}
	return answer;
}

console.log(transliterate("по госту"));
// console.log(transliterate("Алексей"));