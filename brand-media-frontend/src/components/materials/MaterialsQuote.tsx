"use client";

import React from 'react';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function MaterialsQuote() {
  const locale = useLocale();
  const { materialsPage } = getMockData(locale);
  const { quote, quoteAuthor } = materialsPage;

  return (
    <section className="py-14 md:py-20 bg-surface-container-high">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
        <FadeIn direction="up">
          <div className="flex gap-4 md:gap-8 items-start max-w-4xl mx-auto">
            {/* Big quote mark */}
            <span
              className="text-outline/20 select-none flex-shrink-0 leading-none"
              style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', fontFamily: 'Noto Serif, serif', lineHeight: 0.8 }}
            >
              "
            </span>
            <div className="space-y-4 md:space-y-6">
              <p
                className="font-serif italic text-on-background leading-[1.6] text-outline"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)' }}
              >
                {quote}
              </p>
              <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-outline/60">{quoteAuthor}</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
