import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import ProductsHero from '@/components/products/ProductsHero';
import ProductsFeatured from '@/components/products/ProductsFeatured';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsQuote from '@/components/products/ProductsQuote';
import ProductsMaterialStory from '@/components/products/ProductsMaterialStory';
import Newsletter from '@/components/home/Newsletter';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: `DKFS | ${t('products')}`,
    description: 'The Narrative of Objects. Discover our collection of heirloom-quality linen artifacts crafted with intention.',
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background">
      <ProductsHero />
      <ProductsFeatured />
      <ProductsGrid />
      <ProductsQuote />
      <ProductsMaterialStory />
      <Newsletter />
    </main>
  );
}
