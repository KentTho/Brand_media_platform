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


17/03
9. Lỗi Cấu hình Đa ngôn ngữ (Next-intl Missing Request Config)
Thông báo lỗi: [next-intl] Could not locate request configuration module.

Nguyên nhân: Sử dụng createNextIntlPlugin trong next.config.ts nhưng thiếu file cấu hình i18n/request.ts. Đây là file bắt buộc để thư viện biết cách load các file JSON ngôn ngữ.

Cách xử lý: Tạo file src/i18n/request.ts và thiết lập hàm getRequestConfig để trả về locale và messages.

Bài học: Khi tích hợp các thư viện Plugin vào Next.js (như intl, sitemap, v.v.), luôn đọc kỹ yêu cầu về cấu trúc thư mục vì nhiều thư viện hoạt động dựa trên "Convention over Configuration" (quy ước hơn là cấu hình).

10. Lỗi Thiếu Dependency CSS (Autoprefixer Missing)
Thông báo lỗi: Error: Cannot find module 'autoprefixer'.

Nguyên nhân: File cấu hình PostCSS yêu cầu plugin autoprefixer nhưng thư viện này chưa được cài đặt trong node_modules.

Cách xử lý: Chạy lệnh npm install autoprefixer để bổ sung thư viện.

Bài học: Khi clone dự án hoặc cài đặt Tailwind CSS, hãy đảm bảo cài đủ bộ ba: tailwindcss, postcss, và autoprefixer.

11. Cấu hình Next.js Config (Merging Configs)
Vấn đề: Có nhiều file cấu hình Next.js riêng biệt dẫn đến xung đột hoặc thiếu tính năng.

Cách xử lý: Gộp tất cả cấu hình (Images, Internationalization, v.v.) vào một file duy nhất. Sử dụng withNextIntl bao bọc lấy toàn bộ đối tượng nextConfig.

Bài học: Đối với các plugin như next-intl, nó phải là "lớp bọc" cuối cùng (Higher-Order Function) để đảm bảo các thiết lập ngôn ngữ được áp dụng lên toàn bộ hệ thống.

12. Lựa chọn định dạng file Config (TS vs JS/MJS)
Vấn đề: Phân vân giữa .js, .mjs và .ts khi cấu hình next.config.

Cách xử lý: Luôn ưu tiên đồng bộ theo ngôn ngữ của dự án. Nếu dự án đã dùng TypeScript và có sẵn file next.config.ts, hãy sử dụng cú pháp import / export default kết hợp với type NextConfig. Tránh trộn lẫn cú pháp require (CommonJS) vào file TypeScript.

Bài học: Trong Next.js hiện đại, file config .ts đã được hỗ trợ natively. Việc dùng đúng type NextConfig sẽ giúp IDE tự động gợi ý code (autocomplete) và bắt lỗi sai chính tả các cấu hình (như remotePatterns hay domains).

