"use strict";

// <spaghetti>

window.addEventListener("load", () => {
	let dom_input_options = document.getElementsByClassName("input-option");
	let dom_select_options = document.getElementsByClassName("select-option");
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



	let dom_displays = {}
	dom_displays["state"] = document.getElementById("value-state");
	dom_displays["party"] = document.getElementById("display-party");
	dom_displays["state-party"] = document.getElementById("display-state");
	dom_displays["details"] = document.getElementById("display-details");
	dom_displays["timestamp"] = document.getElementById("timestamp");
	dom_displays["large_image"] = document.getElementById("large-image");
	dom_displays["small_image"] = document.getElementById("small-image");
	dom_displays["name"] = document.getElementById("name");
	dom_displays["button-1-wrap"] = document.getElementById("button-1-wrapper");
	dom_displays["button-2-wrap"] = document.getElementById("button-2-wrapper");
	dom_displays["button-1"] = document.getElementById("button-1-content");
	dom_displays["button-2"] = document.getElementById("button-2-content");

	let client_id
	fetch("/getappinfo")
	.then(response => response.json())
	.then(data => {
		client_id = data["client_id"];
		dom_displays["name"].textContent = data["application_name"];
	})

	let inputs = ["state", "details", "start", "end", "large_image", "large_text", "small_image", "small_text",
		"party_id", "party_min", "party_max", "join", "spectate", "match",
		"button-label-1", "button-url-1", "button-label-2", "button-url-2"];

	let dom_inputs = {};
	for (const i in inputs) {
		dom_inputs[inputs[i]] = document.getElementById(inputs[i])
	}

	let button_names = [["button-label-1", "button-url-1"], ["button-label-2", "button-url-2"]]

	fetch('/getassets')
		.then(response => response.json())
		.then(data => {
			let assets = data;
			for (let i = 0; i < dom_select_options.length; i++) {
				let element = dom_select_options.item(i);
				for (const j in assets) {
					let opt = document.createElement('option');
					opt.value = j;
					opt.innerHTML = j;
					element.appendChild(opt);
				}
			}
			fetch('/getstatus')
			.then(response => response.json())
			.then(options => {
				for (const i in options) {
					document.getElementById(i).value = options[i];
				}

				dom_displays["state"].textContent = dom_inputs["state"].value
				if (!dom_inputs["state"].value) { dom_displays["state-party"].style["display"] = "none"; }

				dom_displays["details"].textContent = dom_inputs["details"].value
				if (!dom_inputs["details"].value) { dom_displays["details"].style["display"] = "none"; }

				for (const i in ["large_image", "small_image"]) {
					const k = ["large_image", "small_image"][i];
					dom_displays[k].src = `https://cdn.discordapp.com/app-assets/${client_id}/${assets[dom_inputs[k].value]}`
				}

				for (const i in button_names) {
					const label = dom_inputs[button_names[i][0]];
					const url = dom_inputs[button_names[i][1]];
					const wrapper = dom_displays[["button-1-wrap", "button-2-wrap"][i]];
					const content = dom_displays[["button-1", "button-2"][i]];
					content.textContent = label.value;
					if (!label.value&&url.value) { wrapper.style["display"] = "none"; }
				}
			});
		});
	
		var assets
		fetch('/getassets')
		.then(response => response.json())
		.then(data => assets = data)

	dom_inputs["state"].addEventListener("input", e => {
		if (e.target.value) {
			dom_displays["state-party"].style["display"] = "block";
			dom_displays["state"].textContent = e.target.value;
		} else {
			dom_displays["state-party"].style["display"] = "none";
		}
	});

	dom_inputs["details"].addEventListener("input", e => {
		if (e.target.value) {
			dom_displays["details"].style["display"] = "block";
			dom_displays["details"].textContent = e.target.value;
		} else {
			dom_displays["details"].style["display"] = "none";
		}
	});

	let two_val_display_check = (display_element, style_display, input_1, input_2, check) => {
		for (const i in [input_1, input_2]) {
			const k = [input_1, input_2][i];
			k.addEventListener("input", e => {
				const value = check(input_1.value, input_2.value);
				display_element.textContent = value;
				if (value) { display_element.style["display"] = style_display; }
				else { display_element.style["display"] = "none"; }
			})
		}
	}
	two_val_display_check(dom_displays["party"], "inline", dom_inputs["party_min"], dom_inputs["party_max"], (a, b) => {
		if (a&&b) { return `(${a} of ${b})`; }
		else { return ''; }
	});
	two_val_display_check(dom_displays["timestamp"], "block", dom_inputs["start"], dom_inputs["end"], (a, b) => {
		return get_timestamp();
	});

	for (const i in button_names) {
		const label = dom_inputs[button_names[i][0]];
		const url = dom_inputs[button_names[i][1]];
		const wrapper = dom_displays[["button-1-wrap", "button-2-wrap"][i]]
		const content = dom_displays[["button-1", "button-2"][i]]
		for (const k in [label, url]) {
			const element = [label, url][k]
			element.addEventListener("input", e => {
				content.textContent = element.value;
				if (label.value&&url.value) { wrapper.style["display"] = "block"; }
				else { wrapper.style["display"] = "none"; }
			})
		}
	}

	let format_seconds = seconds => {

		if (seconds <= 0) { return '00:00'}
		else if (seconds < 3600) { return `${String(Math.floor(seconds/60)).padStart(2, '0')}:${String(Math.round(seconds%60)).padStart(2, '0')}`}
		else { return `${String(Math.floor(seconds/3600)).padStart(2, '0')}:${String(Math.floor(seconds/60%60)).padStart(2, '0')}:${String(Math.round(seconds%60)).padStart(2, '0')}` }
	}

	let get_timestamp = () => {
		let start = dom_inputs["start"].value;
		let end = dom_inputs["end"].value;
		let now = Date.now() / 1000
		if (end) {
			let seconds = end - now
			return `${format_seconds(seconds)} left`
		} else if (start) {
			let seconds = now - start
			return `${format_seconds(seconds)} elapsed`
		} else {
			return ''
		}
	}
	setInterval(() => {dom_displays["timestamp"].textContent = get_timestamp()}, 1000);

	for (const i in ["small_image", "large_image"]) {
		const k = ["small_image", "large_image"][i];
		dom_inputs[k].addEventListener("change", () => {
			dom_displays[k].src = `https://cdn.discordapp.com/app-assets/${client_id}/${assets[dom_inputs[k].value]}`
		});
	}

});

// </spaghetti>