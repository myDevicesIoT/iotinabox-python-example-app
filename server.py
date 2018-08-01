from flask import Flask, render_template, url_for, request, redirect, jsonify, send_from_directory
import requests
import json
app = Flask(__name__, static_url_path='/static')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

TOKEN_URL = 'https://va-staging-keycloak.mydevices.com/auth/realms/iotinabox/protocol/openid-connect/token'

#Input your client credentials here
CLIENT_ID = ''
CLIENT_SECRET = ''


POST_DATA = {
    'grant_type': 'authorization_code',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'scope': 'offline_access',
    'redirect_uri': 'http://localhost:5000/auth/cb'
}
TOKEN_DATA = {}


def getTokens():
    token_request = requests.post(TOKEN_URL, data=POST_DATA).json()
    TOKEN_DATA['access_token'] = token_request['access_token']
    TOKEN_DATA['refresh_token'] = token_request['refresh_token']
    print("Tokens Retrieved")


@app.route('/auth/cb', methods=['GET','POST'])
def authenticate():
    POST_DATA['code'] = request.args.get('code')
    getTokens()
    return redirect('home')

@app.route('/data')
def return_data():
    return jsonify(TOKEN_DATA)

@app.route('/')
def loginRedirect():
    return redirect('login')

@app.route('/home')
def home():
    return app.send_static_file('home.html')

@app.route('/login')
def login():
    return app.send_static_file('login.html')

@app.route('/<path>')
def send_file(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)