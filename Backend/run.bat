@echo off
pip freeze > requirements.txt
python manage.py runserver