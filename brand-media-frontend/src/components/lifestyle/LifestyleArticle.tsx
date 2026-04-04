"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function LifestyleArticle() {
  const locale = useLocale();
  const { lifestylePage } = getMockData(locale);
  const article = lifestylePage.articleDetail;

  return (
    <article className="bg-background min-h-screen">

      {/* Hero — full width cinematic image */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Floating metadata block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-8 md:pb-16 z-10"
        >
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-5 md:mb-7">
              <span className="text-[9px] tracking-[0.4em] uppercase text-on-primary/70 bg-primary/80 backdrop-blur-sm px-3 py-1.5">
                {article.tag}
              </span>
            </div>
            <h1
              className="font-serif text-on-primary leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}
            >
              {article.title}
            </h1>
            <p className="text-on-primary/65 font-light text-sm md:text-base max-w-2xl leading-relaxed">
              {article.subtitle}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Article body */}
      <div className="max-w-[800px] mx-auto px-6 md:px-8 py-12 md:py-20">

        {/* Author metadata */}
        <FadeIn direction="up">
          <div className="flex items-center gap-5 pb-8 md:pb-12 border-b border-outline/10 mb-10 md:mb-14">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-serif text-sm font-bold">
                {article.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-on-background font-semibold">{article.author}</p>
              <p className="text-[9px] tracking-[0.25em] uppercase text-outline/60 mt-0.5">{article.role} · {article.date} · {article.readTime}</p>
            </div>
          </div>
        </FadeIn>

        {/* Intro paragraph — larger lead text */}
        <FadeIn direction="up" delay={0.1}>
          <p className="text-on-background font-light leading-[1.95] text-base md:text-lg mb-8 md:mb-12 font-serif italic">
            {article.intro}
          </p>
        </FadeIn>

        {/* Body text */}
        <FadeIn direction="up" delay={0.15}>
          <div className="space-y-6 text-on-surface-variant leading-[1.9] text-sm md:text-base font-light mb-12 md:mb-16">
            {article.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </FadeIn>

        {/* Pull quote */}
        <FadeIn direction="up" delay={0.2}>
          <blockquote className="my-12 md:my-16 py-8 md:py-10 px-6 md:px-10 bg-surface-container border-l-4 border-primary">
            <p
              className="font-serif italic text-primary leading-relaxed"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
            >
              {article.pullQuote}
            </p>
          </blockquote>
        </FadeIn>

        {/* Section 2 */}
        <FadeIn direction="up" delay={0.25}>
          <h2 className="font-serif text-primary text-xl md:text-2xl mb-5 md:mb-7">
            {article.section2Title}
          </h2>
          <div className="space-y-6 text-on-surface-variant leading-[1.9] text-sm md:text-base font-light mb-12 md:mb-16">
            {article.section2Body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </FadeIn>

        {/* Newsletter CTA */}
        <FadeIn direction="up" delay={0.3}>
          <div className="py-10 md:py-12 px-6 md:px-10 bg-primary-container text-center space-y-4 md:space-y-5">
            <p className="text-[9px] tracking-[0.4em] uppercase text-on-primary/50">THE CHRONICLE WEEKLY</p>
            <p className="font-serif text-on-primary text-base md:text-lg">
              {locale === 'vi'
                ? 'Tham gia vòng tròn được tuyển chọn của chúng tôi về thiền định hàng tuần về lối sống chậm, thiết kế bền vững và nghệ thuật xúc giác.'
                : 'Join our curated circle for weekly meditations on slow living, sustainable design, and the tactile arts.'}
            </p>
            <Link
              href="/lifestyle"
              className="inline-block text-[10px] tracking-[0.25em] uppercase border border-on-primary/40 text-on-primary px-6 py-3 hover:bg-on-primary/10 transition-colors mt-2"
            >
              {locale === 'vi' ? 'XEM TẤT CẢ BÀI VIẾT' : 'VIEW ALL STORIES'}
            </Link>
          </div>
        </FadeIn>

        {/* Back link */}
        <FadeIn direction="up" delay={0.35}>
          <div className="mt-10 md:mt-14 pt-8 border-t border-outline/10">
            <Link
              href="/lifestyle"
              className="inline-flex items-center gap-3 text-outline/60 text-xs tracking-wide hover:text-primary transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              {locale === 'vi' ? 'Quay lại Lối Sống' : 'Back to Lifestyle'}
            </Link>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
