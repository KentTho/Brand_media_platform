"use client";



import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function FeaturedArticle() {
  const locale = useLocale();
  const t = useTranslations('featured');
  const { featuredArticle } = getMockData(locale);

  if (!featuredArticle) return null;

  return (
    <section className="py-16 md:py-32 px-6 md:px-12 max-w-[1920px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 items-center">
        <FadeIn direction="up" className="lg:col-span-7 aspect-[16/10] overflow-hidden rounded-sm relative group cursor-pointer">
          <Image 
            className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[0.25,0.46,0.45,0.94] will-change-transform" 
            alt={featuredArticle.title} 
            src={featuredArticle.image} 
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </FadeIn>
        <div className="lg:col-span-5 space-y-6 md:space-y-8 lg:pl-12">
          <FadeIn direction="up" delay={0.1}>
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-outline">{featuredArticle.tag}</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight text-primary">{featuredArticle.title}</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <p className="text-on-surface-variant leading-[1.8] text-lg font-light">
              {featuredArticle.excerpt}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <div className="pt-6">
              <a className="inline-flex items-center space-x-4 group/btn cursor-pointer" href="#">
                <span className="text-primary font-serif italic text-xl border-b border-primary pb-1 group-hover/btn:pb-2 transition-all">{t('read_story')}</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
