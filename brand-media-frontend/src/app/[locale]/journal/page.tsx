import { setRequestLocale } from 'next-intl/server';
import JournalHero from '@/components/journal/JournalHero';
import EditorialGrid from '@/components/journal/EditorialGrid';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: `DKFS | ${t('journal')}`,
    description: 'The Tactile Chronicler. A digital sanctuary for the sensory observer.',
  };
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background">
      <JournalHero />
      <EditorialGrid />
    </main>
  );
}
