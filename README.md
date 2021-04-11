# Custom-Rich-Presence
Customize Discord rich presence on localhost

Table of Contents
=================
1. [Requirements](#requirements)
2. [Setup](#setup)  
   2.1 [Create an App](#create-an-app)  
   2.2 [Configure options.py](#configure-optionspy)  
   2.3 [Run the app](#run-the-app) 
3. [Notes](#notes)

Requirements
============
- Python 3.8.2
- Flask 1.1.2
- PyPresence 4.2.0

Setup
=====
Install Dependencies
--------------------
First, create a virtual environment by running `python3 -m venv .`
Then, enable the virtual environment by running `source bin/activate`
Finally, install the required dependencies with `pip install flask pypresence`

Create an App
--------------
Go to the [Discord Developer Portal](https://www.discord.com/developers/applications) and click on `New Application` in the top right.
Pick a name and then create your app.
The name of your app will be shown on your status as **Playing** app name

Configure options.py
--------------------
Rename `options.example.py` to `options.py`.
Under `General Information` in the Discord Application Developer Portal, copy the Application ID, and change `client_id`'s value to be your Application ID.
Fill in values that you want to show on your profile.
These will be the default values whenever you restart the app

Run the app
-----------
Run the app with the command `python3 app.py`, this will start flask on localhost:8081 by default

Notes
=====
- To add images, go to `Rich Presence > Art Assets` and upload an image with a key.
To use the image, set the value of `large_image` or `small_image` to your image key.
  - Note that uploading images may take up to 10 minutes to upload  
- The app will automatically remove an invalid party_size or invalid buttons
- RPC May take a long time to connect when starting
- Buttons will work for other people, but you cannot click your own button
