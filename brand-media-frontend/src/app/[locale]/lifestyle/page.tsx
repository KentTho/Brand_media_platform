import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import LifestyleHero from '@/components/lifestyle/LifestyleHero';
import LifestyleGrid from '@/components/lifestyle/LifestyleGrid';
import Newsletter from '@/components/home/Newsletter';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: `DKFS | ${t('lifestyle')}`,
    description: 'Daily rituals with linen. Exploring the tactile connection between nature and the spaces we call home.',
  };
}

export default async function LifestylePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background">
      <LifestyleHero />
      <LifestyleGrid />
      <Newsletter />
    </main>
  );
}
