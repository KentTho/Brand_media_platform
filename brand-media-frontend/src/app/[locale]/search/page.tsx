import { setRequestLocale } from 'next-intl/server';
import SearchPage from '@/components/search/SearchPage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: `DKFS | ${locale === 'vi' ? 'Tìm Kiếm' : 'Search & Exploration'}`,
    description: 'Search and explore all articles, materials, lifestyle stories and products from DKFS.',
  };
}

export default async function SearchRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SearchPage />;
}
