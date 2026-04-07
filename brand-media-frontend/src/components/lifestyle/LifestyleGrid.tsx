"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function LifestyleGrid() {
  const locale = useLocale();
  const { lifestylePage } = getMockData(locale);
  const { articles } = lifestylePage;
  const featured = articles.find(a => a.featured) ?? articles[0];
  const rest = articles.filter(a => !a.featured);

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-background overflow-hidden">
      <div className="max-w-[1920px] mx-auto space-y-16 md:space-y-24">

        {/* Featured article — large editorial layout */}
        <FadeIn direction="up">
          <Link href={`/lifestyle/${featured.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center cursor-pointer">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Featured badge */}
                <div className="absolute top-5 left-5 bg-primary/90 backdrop-blur-sm px-3 py-1.5">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-accent-warm font-bold">{featured.tag}</span>
                </div>
              </div>
              {/* Text */}
              <div className="space-y-5 md:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-outline/40" />
                  <span className="text-[10px] tracking-[0.4em] uppercase text-outline/60">{featured.readTime}</span>
                </div>
                <h2
                  className="font-serif text-primary italic leading-tight group-hover:text-secondary transition-colors"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}
                >
                  {featured.title}
                </h2>
                <p className="text-on-surface-variant text-sm md:text-base leading-[1.85] font-light">
                  {featured.excerpt}
                </p>
                <div className="inline-flex items-center gap-3 text-primary font-serif italic text-sm border-b border-primary/40 pb-0.5 group-hover:gap-5 group-hover:border-primary transition-all">
                  Đọc câu chuyện <span className="text-primary/50">→</span>
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>

        {/* Quote */}
        <FadeIn direction="up">
          <div className="border-l-4 border-accent-cool pl-6 md:pl-10 max-w-2xl mx-auto py-2">
            <p className="font-serif italic text-on-surface-variant text-base md:text-xl leading-relaxed">
              {lifestylePage.quote}
            </p>
          </div>
        </FadeIn>

        {/* 3-column grid of remaining articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {rest.map((article, i) => (
            <FadeIn key={article.slug} direction="up" delay={i * 0.1}>
              <Link href={`/lifestyle/${article.slug}`} className="group block space-y-5 cursor-pointer">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Meta */}
                <div className="flex items-center gap-3">
                  <span className="text-[9px] tracking-[0.35em] uppercase text-outline/60">{article.tag}</span>
                  <div className="w-1 h-1 rounded-full bg-outline/30" />
                  <span className="text-[9px] tracking-wide text-outline/50">{article.readTime}</span>
                </div>
                {/* Title */}
                <h3 className="font-serif text-primary italic text-lg md:text-xl leading-tight group-hover:text-secondary transition-colors">
                  {article.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed font-light line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-serif italic text-sm border-b border-primary/30 pb-0.5 group-hover:gap-4 group-hover:border-primary transition-all">
                  Đọc <span className="text-primary/50">→</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
