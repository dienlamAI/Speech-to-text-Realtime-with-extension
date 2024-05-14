# Dựa trên hệ điều hành cơ bản nào
FROM python:3

# Khai báo thư mục làm việc
WORKDIR /app

COPY . .
RUN pip install -r requirements.txt


EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

