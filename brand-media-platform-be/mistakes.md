❌ Lỗi: Không cấu hình pagination global
👉 Nguyên nhân: Nghĩ rằng data ít
👉 Hậu quả: API chậm, FE khó xử lý
👉 Cách tránh: Luôn config REST_FRAMEWORK từ đầu




❌ Lỗi: ImproperlyConfigured – You must define a 'default' database
📍 Vị trí: core/settings.py
🎯 Nguyên nhân:
    - Chưa cấu hình DATABASES
    - Hoặc xóa SQLite mặc định nhưng chưa thêm PostgreSQL
🛠 Cách tránh:
    - Luôn đảm bảo DATABASES['default'] tồn tại
    - Migrate chỉ chạy sau khi DB config xong



❌ Lỗi: DATABASE config dùng getenv nhưng không validate
📍 Vị trí: settings.py
🎯 Nguyên nhân: biến môi trường chưa tồn tại
🛠 Fix: thêm default hoặc check bắt buộc


📅 Log lỗi ngày 19/02/2026
1. Lỗi Truy vấn Database (PostgreSQL Relation Error)
Thông báo lỗi: ProgrammingError: relation "catalog_material" does not exist

Bối cảnh: Xảy ra khi truy cập vào trang Admin của một Model nhưng bảng tương ứng trong Database chưa được tạo.

Nguyên nhân gốc rễ: * Do sự lệch pha giữa các file Migration trong code và cấu trúc bảng thực tế trong PostgreSQL.

Lệnh migrate báo "No migrations to apply" vì bảng django_migrations ghi nhận đã chạy rồi, nhưng thực tế bảng vật lý không tồn tại (có thể do xóa database thủ công hoặc clone code mà chưa đồng bộ DB).

Vị trí lỗi: App catalog, Model Material.

Giải pháp triệt để:

Kiểm tra file migration của app: python manage.py showmigrations catalog.

Nếu cần làm sạch để chạy lại: python manage.py migrate catalog zero --fake.

Chạy lại lệnh: python manage.py migrate catalog.

2. Lỗi Cấu hình Đa ngôn ngữ (Django-Parler Config)
Thông báo lỗi: ImproperlyConfigured: QuerySet class does not inherit from TranslatableQuerySet

Bối cảnh: Xảy ra khi vào trang Admin của App users (danh sách người dùng).

Nguyên nhân gốc rễ: * Xung đột kế thừa: Class Admin (CustomUserAdmin) đang kế thừa từ TranslatableAdmin của thư viện django-parler.

Thư viện này yêu cầu Model đi kèm (User) cũng phải kế thừa từ TranslatableModel. Tuy nhiên, Model User trong dự án là model chuẩn, không có tính năng dịch thuật.

Vị trí lỗi: File users/admin.py, tại class CustomUserAdmin.

Giải pháp triệt để:

Đưa class Admin về cấu hình chuẩn của Django vì User thường không cần dịch đa ngôn ngữ.

Sửa kế thừa từ TranslatableAdmin thành UserAdmin (hoặc admin.ModelAdmin).

Code sửa: ```python
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
class CustomUserAdmin(BaseUserAdmin): # Không dùng TranslatableAdmin
...


📅 Log lỗi ngày 24/02/2026
3. Lỗi Trùng lặp App Label (Duplicate App Declaration)
Thông báo lỗi: ImproperlyConfigured: Application labels aren't unique, duplicates: rest_framework

Nguyên nhân: Khai báo một app (trong trường hợp này là rest_framework) hai lần trong danh sách INSTALLED_APPS tại file settings.py.

Cách xử lý: Kiểm tra file settings.py, sử dụng Ctrl + F để tìm các dòng trùng lặp và xóa dòng thừa.

Bài học: Mỗi khi thêm một thư viện mới vào dự án, hãy kiểm tra xem nó đã tồn tại trong INSTALLED_APPS chưa, đặc biệt là khi làm việc trên các project có nhiều người cùng code hoặc clone từ nhiều nguồn.
4. Lỗi Trùng lặp App Label (Tái diễn với Parler)
Thông báo lỗi: ImproperlyConfigured: Application labels aren't unique, duplicates: parler

Nguyên nhân: Khai báo thư viện parler hai lần trong INSTALLED_APPS. Đây là lỗi hệ thống phổ biến khi gộp code hoặc copy cấu hình từ nhiều file khác nhau.

Cách xử lý: Xóa dòng khai báo dư thừa trong settings.py.

Bài học kinh nghiệm: * Trước khi chạy makemigrations, nên kiểm tra file settings.py một lượt để đảm bảo tính duy nhất (uniqueness) của các app.

Luôn sử dụng chức năng "Search" của IDE để kiểm tra sự tồn tại của một từ khóa trước khi định thêm nó vào danh sách.
5. Lỗi Cấu hình Logging (Missing Log Directory)
Thông báo lỗi: ValueError: Unable to configure handler 'file' đi kèm FileNotFoundError.

Nguyên nhân: Django cấu hình ghi log vào một file nằm trong thư mục không tồn tại (core/logs/). Python không tự động tạo thư mục trung gian khi mở một file để ghi log.

Cách xử lý: * Tạo thư mục logs thủ công trong đường dẫn được chỉ định.

Hoặc thêm đoạn mã os.makedirs() vào file settings để tự động tạo thư mục log khi khởi chạy dự án.

Bài học: Khi sử dụng các handler lưu trữ file (như Logging hay Media), luôn đảm bảo cấu trúc thư mục đã sẵn sàng trước khi ứng dụng chạy. Các thư mục rỗng thường không được Git lưu lại, nên cần chú ý khi setup project trên máy mới.