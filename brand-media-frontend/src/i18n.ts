import { getRequestConfig } from "next-intl/server";
import { routing } from "./navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  // Lấy locale từ URL request (chuẩn next-intl v4)
  let locale = await requestLocale;

  // Nếu không có locale hợp lệ, dùng ngôn ngữ mặc định
  if (!locale || !routing.locales.includes(locale as 'vi' | 'en' | 'ru' | 'zh' | 'ar')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
