import { setRequestLocale } from 'next-intl/server';
import NewsletterSuccess from '@/components/ui/NewsletterSuccess';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: `DKFS | ${locale === 'vi' ? 'Đăng Ký Thành Công' : 'Subscription Confirmed'}`,
    description: 'Thank you for joining the DKFS Chronicle.',
    robots: { index: false }, // don't index success pages
  };
}

export default async function NewsletterSuccessRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NewsletterSuccess />;
}
