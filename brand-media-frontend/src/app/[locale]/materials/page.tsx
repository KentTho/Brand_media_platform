import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import MaterialsHero from '@/components/materials/MaterialsHero';
import MaterialsProcess from '@/components/materials/MaterialsProcess';
import MaterialsQuote from '@/components/materials/MaterialsQuote';
import MaterialsQuality from '@/components/materials/MaterialsQuality';
import Newsletter from '@/components/home/Newsletter';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: `DKFS | ${t('materials')}`,
    description: 'The Soul of Linen. Discover the art and philosophy behind our natural materials.',
  };
}

export default async function MaterialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background">
      <MaterialsHero />
      <MaterialsProcess />
      <MaterialsQuote />
      <MaterialsQuality />
      <Newsletter />
    </main>
  );
}
