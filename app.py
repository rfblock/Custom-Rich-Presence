from pypresence import Presence
from flask import Flask, render_template, request
from options import options, client_id

RPC = Presence(client_id)
print('Connecting to RPC')
RPC.connect()
print('Connected')

app = Flask(__name__)

def __get_party_size(kwargs):
	if not options.keys() >= {'party_min', 'party_max'}: return False
	try:
		kwargs['party_size'] = [int(options[i]) for i in ['party_min', 'party_max']]
	except ValueError:
		return False
	return True

def __get_buttons(kwargs):
	values = []
	values.extend([options[i] for i in ['button-label-1', 'button-url-1', 'button-label-2', 'button-url-2']])
	if not (values[2] or values[3]): del values[2:4]
	if not (values[0] or values[1]): del values[0:2]
	buttons = [] if values else None
	while values[0:2]:
		buttons.append({'label': values[0], 'url': values[1]})
		del values[0:2]
	kwargs['buttons'] = buttons

def update():
	kwargs = {}
	__get_party_size(kwargs)
	__get_buttons(kwargs)
	for k, v in options.items():
		if k in ['button-label-1', 'button-label-2', 'button-url-1', 'button-url-2', 'party_min', 'party_max']: continue

		v = None if not v else v
		if not v: continue

		kwargs[k] = v
	RPC.update(**kwargs)
	del kwargs

@app.route('/')
def root():
	return render_template('index.html')

@app.route('/setstatus', methods=['POST'])
def setstatus():
	global options
	options = request.json
	update()
	return 'OK', 200

@app.route('/getstatus')
def getstatus():
	return options

if __name__ == '__main__':
	app.run(host='0.0.0.0', port='8081', debug=True)