import React from 'react';
import EditorialHero from '@/components/home/EditorialHero';
import FeaturedArticle from '@/components/home/FeaturedArticle';
import EditorialSections from '@/components/home/EditorialSections';
import MaterialHighlight from '@/components/home/MaterialHighlight';
import ProductStory from '@/components/home/ProductStory';
import Newsletter from '@/components/home/Newsletter';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main className="min-h-screen bg-background w-full">
        <EditorialHero />
        <FeaturedArticle />
        <EditorialSections />
        <MaterialHighlight />
        <ProductStory />
        <Newsletter />
      </main>
    </>
  );
}