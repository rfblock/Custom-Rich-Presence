# Custom-Rich-Presence
Customize Discord rich presence on localhost

Table of Contents
=================
1. [Requirements](#requirements)
2. [Setup](#setup)  
   2.1 [Install Dependencies](#install-dependencies)  
   2.2 [Create an App](#create-an-app)  
   2.3 [Configure options.py](#configure-optionspy)  
   2.4 [Run the app](#run-the-app)  
3. [Setup for Windows](#setup-for-windows-10)  
   3.1 [Install Dependencies](#install-dependencies-1)  
   3.2 [Create an App](#create-an-app-1)  
   3.3 [Configure options.py](#create-an-app-1)  
   3.4 [Run the app](#run-the-app-1)
5. [Notes](#notes)

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
Under `General Information` in the Discord Application Developer Portal, copy the Application ID, and change `client_id`'s value to be your Application ID, not the client secret.
Fill in values that you want to show on your profile.
These will be the default values whenever you restart the app

Run the app
-----------
Run the app with the command `python3 app.py`, this will start flask on localhost:8081 by default. To change the RPC options, go to localhost:8081 and fill in the values.

Setup for Windows 10
====================
Install Dependencies
--------------------
First, create a virtual environment by running `py -m venv .`
Then, enable the virtual environment by running `Scripts\activate.bat`
Finally, install the required dependencies with `py -m pip install flask pypresence`

Create an App
--------------
Go to the [Discord Developer Portal](https://www.discord.com/developers/applications) and click on `New Application` in the top right.
Pick a name and then create your app.
The name of your app will be shown on your status as **Playing** app name

Configure options.py
--------------------
Rename `options.example.py` to `options.py`.
Under `General Information` in the Discord Application Developer Portal, copy the Application ID, and change `client_id`'s value to be your Application ID, not the client secret.
Fill in values that you want to show on your profile.
These will be the default values whenever you restart the app

Run the app
-----------
Make sure to run command prompt as administrator during this step.
If you do not have all the dependencies installed, the code will not run. 
Run the app with the command `py app.py`, this will start flask on localhost:8081 by default. To change the RPC options, go to localhost:8081 and fill in the values.

Notes
=====
- To get a preview of what your RPC will look like, in the developer portal for your application, go to `Rich Presence > Visualizer` and try out some options.
- To add images, go to `Rich Presence > Art Assets` and upload an image with a key.
To use the image, set the value of `large_image` or `small_image` to your image key.

- Note that uploading images may take up to 10 minutes to upload  
- The app will automatically remove an invalid party_size or invalid buttons
- RPC May take a long time to connect when starting
- Buttons will work for other people, but you cannot click your own button
