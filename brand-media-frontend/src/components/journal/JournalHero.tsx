"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function JournalHero() {
  const locale = useLocale();
  const t = useTranslations('journal');
  const { journalHero } = getMockData(locale);

  if (!journalHero) return null;

  return (
    <section className="relative w-full overflow-hidden bg-background py-16 md:py-32 px-6 md:px-12 pt-28 md:pt-48">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="lg:col-span-5 space-y-8 md:space-y-12">
          <FadeIn direction="up">
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-outline">{journalHero.tag}</span>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight text-primary">
              {journalHero.title}
            </h1>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.2}>
            <p className="text-on-surface-variant leading-[1.8] text-base md:text-xl font-light">
              {journalHero.excerpt}
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.3}>
            <a className="inline-flex items-center space-x-4 group/btn cursor-pointer" href="#">
              <span className="text-primary font-serif italic text-base md:text-xl border-b border-primary pb-1 group-hover/btn:pb-2 transition-all">
                {t('read_narrative')}
              </span>
            </a>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.2} className="lg:col-span-7 h-full w-full">
          <div className="aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] w-full overflow-hidden rounded-sm relative group cursor-pointer">
            <Image 
              className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[0.25,0.46,0.45,0.94] will-change-transform" 
              alt={journalHero.title} 
              src={journalHero.image} 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
