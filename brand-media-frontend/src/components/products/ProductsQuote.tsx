"use client";

import React from 'react';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function ProductsQuote() {
  const locale = useLocale();
  const { productsPage } = getMockData(locale);
  const { quote, quoteAuthor, pillars } = productsPage;

  return (
    <section className="py-16 md:py-24 bg-primary-container overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">

        {/* Editorial quote */}
        <FadeIn direction="up">
          <div className="flex gap-4 md:gap-8 items-start max-w-4xl mx-auto mb-16 md:mb-24">
            <span
              className="text-on-primary/10 select-none flex-shrink-0 leading-none"
              style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', fontFamily: 'Noto Serif, serif', lineHeight: 0.8 }}
            >
            </span>
            <div className="space-y-4 md:space-y-5">
              <p
                className="font-serif italic text-on-primary/80 leading-[1.6]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 1.7rem)' }}
              >
                {quote}
              </p>
              <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-on-primary/40">
                {quoteAuthor}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Pillars — 3 craft principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-on-primary/10">
          {pillars.map((pillar, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.1}>
              <div className="px-0 sm:px-8 md:px-12 space-y-3 md:space-y-4 pb-8 sm:pb-0 border-b sm:border-b-0 border-on-primary/10 last:border-b-0">
                <div className="w-8 h-px bg-on-primary/25 mb-4 md:mb-6" />
                <h4 className="font-serif text-on-primary/90 text-base md:text-lg">{pillar.title}</h4>
                <p className="text-on-primary/50 text-sm leading-relaxed font-light">{pillar.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
