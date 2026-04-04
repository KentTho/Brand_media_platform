import { setRequestLocale } from 'next-intl/server';
import LifestyleArticle from '@/components/lifestyle/LifestyleArticle';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale } = await params;
  return {
    title: `DKFS | The Quiet Architecture of Linen and Light`,
    description: 'A meditation on the tactile relationship between our skin, our spaces, and the natural fibers that ground us.',
  };
}

export default async function LifestyleArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background">
      <LifestyleArticle />
    </main>
  );
}
