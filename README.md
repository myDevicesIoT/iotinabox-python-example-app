# iotinabox-python-example-app

This example app presents all the companies, locations, and sensors associated with an IoTInABox account.


Requirements:
=============
* A web browser such as [Google Chrome](https://www.google.com/chrome/) or [Firefox](https://www.mozilla.org/en-US/firefox/new/)

* [Python 3.6](https://www.python.org/downloads/) or newer

* Flask - A back-end web development framework. Install it using:

        pip install flask

* pip - Python package manager. This should already be installed on Raspbian, but if it isnt,
  install it using:
  
		sudo apt-get update
		sudo apt-get install python-pip


Installation:
-------------
This script can be installed with git:
		
	git clone https://github.com/myDevicesIoT/iotinabox-python-example-app.git

Install the python requests library by opening up a terminal and typing:

        pip install requests

Setup:
-------------
Obtain your IoTInABox credentials (ClientID and Client Secret) from your account. Input your client ID in the login.html file where indicated, and enter the client ID and client secret in the server.py file. Both files can be opened by text editors.

To run the script, simply open up a terminal and type:

    python server.py

After running the script, open up a web browser and go to

    localhost:5000

It will prompt you to a login page. Click login and sign in using your IoTInABox credentials.

After signing in, you will be able to navigate through your companies, their locations, and the different sensors within those locations.