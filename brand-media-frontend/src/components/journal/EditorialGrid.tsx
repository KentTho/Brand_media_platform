"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function EditorialGrid() {
  const locale = useLocale();
  const t = useTranslations('journal');
  const { journalArticles } = getMockData(locale);

  if (!journalArticles || journalArticles.length === 0) return null;

  return (
    <section className="bg-surface-container-low py-16 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1920px] mx-auto space-y-16 md:space-y-48">
        
        {journalArticles.map((article, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-center">
              
              {/* Mobile: always show image first, then text */}
              {/* Image column */}
              <div className={`relative ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                <FadeIn direction="up">
                  <div className="aspect-[4/3] md:aspect-[4/5] rounded-sm overflow-hidden relative group cursor-pointer">
                    <Image 
                      className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[0.25,0.46,0.45,0.94] will-change-transform" 
                      alt={article.title}
                      src={article.image} 
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </FadeIn>
                {isEven 
                  ? <div className="hidden lg:block absolute -bottom-12 -right-12 w-2/3 h-2/3 bg-accent-warm -z-10"></div>
                  : <div className="hidden lg:block absolute -top-12 -left-12 w-2/3 h-2/3 bg-accent-cool -z-10"></div>
                }
              </div>

              {/* Text column */}
              <div className={`space-y-5 md:space-y-8 max-w-xl ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1 lg:mr-auto'}`}>
                <FadeIn direction="up" delay={0.1}>
                  <h3 className="text-2xl md:text-4xl font-serif text-primary italic leading-tight">{article.title}</h3>
                </FadeIn>
                <FadeIn direction="up" delay={0.2}>
                  <p className="text-on-surface-variant leading-[1.8] text-base md:text-lg">
                    {article.excerpt}
                  </p>
                </FadeIn>
                <FadeIn direction="up" delay={0.3}>
                  <div className="pt-2 md:pt-4">
                    <a className="inline-flex items-center space-x-4 group/btn cursor-pointer" href="#">
                      <span className="text-primary font-serif italic text-base md:text-xl border-b border-primary pb-1 group-hover/btn:pb-2 transition-all">
                        {t('read_article')}
                      </span>
                    </a>
                  </div>
                </FadeIn>
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}
