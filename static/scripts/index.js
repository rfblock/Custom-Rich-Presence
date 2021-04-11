"use strict";

window.addEventListener("load", () => {
	let dom_input_options = document.getElementsByClassName("input-option");
	let dom_submit_options = document.getElementById("submit-options");
	dom_submit_options.addEventListener("click", () => {
		let options = {};
		for (let i = 0; i < dom_input_options.length; i++) {
			let element = dom_input_options.item(i);
			options[element.id] = element.value;
		}
		fetch('/setstatus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(options)
		});
	});

	for (let i = 0;  i < dom_input_options.length; i++) {
		let element = dom_input_options.item(i);
		element.placeholder = element.id;
	}
	fetch('/getstatus')
		.then(response => response.json())
		.then(data => {
			for (const i in data) {
				document.getElementById(i).value = data[i];
			}
		});
});