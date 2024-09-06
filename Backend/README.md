# Installation and Running the Backend

Here are the steps to install and run the Backend project. Make sure you have Python and `ffmpeg` installed on your machine before starting.

## Step 1: Clone the project

Open a terminal or command prompt and run the following command to clone the project:

```
git clone [link](https://github.com/DienStudio/Speech-to-text-Realtime-with-extension.git)
```

## Step 2: Create a virtual environment

Navigate to the `Backend` folder you just cloned:

```
cd Backend
```

Create a virtual environment using Python:

```
python -m venv .venv
```

## Step 3: Activate the virtual environment and install required libraries

For Windows, activate the virtual environment:

```
.venv\Scripts\activate
```

Then, install the necessary libraries from `requirements.txt`:

```
pip install -r requirements.txt
```

## Step 4: Install additional libraries

Run the following commands to install additional libraries:

```
pip install openai==1.13.3
pip install djangorestframework-simplejwt==5.3.1
pip install pydub==0.25.1
pip install psycopg2==2.9.9
pip install djangorestframework==3.14.0
pip install django-cors-headers==4.3.1
pip install google-auth==2.28.1
pip install private-django-googledrive-storage==1.6.0
pip install google-auth-oauthlib==1.2.0
pip install google-auth-httplib2==0.2.0
pip install google-api-python-client==2.120.0
pip install google-api-core==2.10.2
```

## Step 5: Run the server

Before running the server, ensure that you have `ffmpeg` installed and added to your system's path environment variable. Restart your machine if `ffmpeg` is not installed.

Run the server with the following command:

```
python manage.py runserver
```

You can now access the server via the default address: `http://127.0.0.1:8000/`.

## Using Postman to test the API
Login with the following credentials:
- Username: test1
- Password: 123
- Use the audio.webm file from the `./Data/` folder

Open the developer console (F12), go to the "Application" tab, scroll down to "Local Storage," click on `http://127.0.0.1:8000/`, and copy the token.
![image](https://github.com/Research-Product-Lab/Backend/assets/97231719/c844aa03-cb25-4c25-aefe-61b7c2d108c5)

And the data is passed in `.webm` format.
![image](https://github.com/Research-Product-Lab/Backend/assets/97231719/ac69a57e-4413-4ca0-90b4-bfa24edfba99)

