# Brand Media Platform (BMP)

Hệ thống nền tảng truyền thông thương hiệu (Brand Media Platform) tích hợp quản lý nội dung (CMS), danh mục sản phẩm và bản tin (Newsletter). Dự án được xây dựng với kiến trúc hiện đại, hỗ trợ đa ngôn ngữ và tối ưu hiệu suất.

## 🏗 Cấu trúc dự án

Dự án được chia thành hai phần chính:
- **brand-media-frontend**: Ứng dụng Frontend xây dựng bằng Next.js.
- **brand-media-platform-be**: Hệ thống Backend API xây dựng bằng Django & DRF.

---

## 🚀 Công nghệ sử dụng

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animation**: Framer Motion
- **Internationalization**: `next-intl` (Hỗ trợ: Tiếng Việt, Anh, Nga, Trung, Ả Rập)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: Django 5.2 & Django REST Framework (DRF)
- **Database**: PostgreSQL
- **Caching**: Redis & Django-Redis
- **Authentication**: JWT (SimpleJWT)
- **Multi-language**: Django-Parler (Dịch nội dung trong Database)
- **CMS Editor**: CKEditor
- **Tracking**: Hệ thống theo dõi hành vi người dùng (Behavior Tracking)

---

## ✨ Tính năng chính

1.  **Đa ngôn ngữ (i18n)**: Hỗ trợ hoàn hảo 5 ngôn ngữ cho cả giao diện và nội dung động từ cơ sở dữ liệu.
2.  **Quản lý sản phẩm (Catalog)**: Hệ thống quản lý sản phẩm chuyên nghiệp, hỗ trợ phân loại và thuộc tính.
3.  **Quản lý nội dung (Content)**: Bài viết, tin tức với trình soạn thảo rich-text.
4.  **Bản tin (Newsletter)**: Đăng ký và quản lý danh sách email nhận tin.
5.  **Theo dõi hành vi**: Middleware ghi lại tương tác của người dùng để phân tích hiệu quả nội dung.
6.  **Giao diện hiện đại**: Responsive 100%, tối ưu trải nghiệm người dùng với hiệu ứng mượt mà.

---

## 🛠 Hướng dẫn cài đặt

### 1. Yêu cầu hệ thống
- Node.js 20+
- Python 3.10+
- PostgreSQL
- Redis

### 2. Cài đặt Backend
```bash
cd brand-media-platform-be

# Tạo môi trường ảo
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Cài đặt thư viện
pip install -r requirements.txt

# Cấu hình môi trường
cp .env.example .env  # Sau đó chỉnh sửa thông tin DB, SECRET_KEY

# Chạy migrations
python manage.py migrate

# Khởi chạy server
python manage.py runserver
```

### 3. Cài đặt Frontend
```bash
cd brand-media-frontend

# Cài đặt dependencies
npm install

# Khởi chạy chế độ phát triển
npm run dev
```

---

## 📝 Thông tin thêm

- **API Documentation**: Truy cập `/api/schema/` (nếu có cấu hình Swagger/Redoc) hoặc xem trực tiếp tại code.
- **Admin Panel**: Truy cập `/admin` để quản lý nội dung và người dùng.
- **Logs**: Hệ thống lưu vết lỗi tại thư mục `logs/` trong backend.

---

© 2026 Brand Media Platform Project.
