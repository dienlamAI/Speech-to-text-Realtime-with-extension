# Hướng dẫn cài đặt và chạy Backend

Dưới đây là các bước cài đặt và chạy dự án Backend. Hãy chắc chắn rằng bạn đã cài đặt Python và `ffmpeg` trên máy của bạn trước khi bắt đầu.

## Bước 1: Clone dự án

Mở terminal hoặc command prompt và chạy lệnh sau để clone dự án:

```
git clone link
```

## Bước 2: Tạo môi trường ảo

Chuyển đến thư mục `Backend` vừa clone:

```
cd Backend
```

Tạo một môi trường ảo bằng cách sử dụng Python:

```
python -m venv .venv
```

## Bước 3: Kích hoạt môi trường ảo và cài đặt các thư viện cần thiết

Đối với Windows, kích hoạt môi trường ảo:

```
.venv\Scripts\activate
```

Sau đó, cài đặt các thư viện cần thiết từ `requirements.txt`:

```
pip install -r requirements.txt
```

## Bước 4: Cài đặt thư viện bổ sung

Chạy các lệnh sau để cài đặt các thư viện bổ sung:

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

## Bước 5: Chạy máy chủ

Trước khi chạy máy chủ, hãy đảm bảo rằng bạn đã cài đặt `ffmpeg` và thêm nó vào biến môi trường (path environment variable) của hệ thống. Khởi động lại máy của bạn nếu chưa có `ffmpeg`.

Chạy máy chủ bằng cách sử dụng lệnh:

```
python manage.py runserver
```

Bây giờ, bạn có thể truy cập máy chủ thông qua địa chỉ mặc định: `http://127.0.0.1:8000/`.

## Sử dụng dùng Postman để test API
Login tài khoản: 
- Tên: test1
- MK: 123
- Sử dụng audio.webm trên folder ./Data/
F12 vào phần Application phía dưới có Local storage click vào `http://127.0.0.1:8000/` và copy đoạn token
  i
![image](https://github.com/Research-Product-Lab/Backend/assets/97231719/c844aa03-cb25-4c25-aefe-61b7c2d108c5)

Và dữ liệu được chuyền dưới dạng .webm 
![image](https://github.com/Research-Product-Lab/Backend/assets/97231719/ac69a57e-4413-4ca0-90b4-bfa24edfba99)

