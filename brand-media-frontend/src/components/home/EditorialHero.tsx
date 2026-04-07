"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { getMockData } from '@/data/mockData';

export default function EditorialHero() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const { hero } = getMockData(locale);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hero) return null;

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#0a1f1b]">
      {/* Background image with parallax */}
      <motion.div 
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
      >
        <Image 
          className="object-cover" 
          alt={hero.slogan} 
          src={hero.bgImage} 
          fill
          priority
        />
        {/* Multi-layer dark teal overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D2B27]/95 via-[#1A3C34]/80 to-[#0a1f1b]/70"></div>
        {/* Subtle linen texture pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px
          ), repeating-linear-gradient(
            90deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px
          )`,
        }}></div>
      </motion.div>

      {/* Main content — left aligned */}
      <div className="relative z-10 w-full px-6 md:px-16 pb-20 md:pb-32 pt-36 md:pt-48 max-w-full md:max-w-[680px]">
        
        {/* Editorial tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-8 h-px bg-on-primary-container/60"></div>
          <span className="text-on-primary-container/80 text-xs tracking-[0.35em] uppercase font-light">
            {t('editorial_tag')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-on-primary leading-[1.08] tracking-tight mb-8"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
        >
          <span className="block">{t('headline_pre')}</span>
          <em className="block italic text-on-primary-container font-normal" style={{ fontFamily: 'Noto Serif, serif' }}>
            {hero.subSlogan}
          </em>
          <span className="block">{t('headline_post')}</span>
        </motion.h1>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-on-primary/65 text-sm md:text-base leading-[1.9] font-light max-w-full md:max-w-[480px] mb-10 md:mb-14"
        >
          {hero.slogan}
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.0 }}
          className="inline-flex items-center gap-5 text-xs tracking-[0.25em] uppercase text-on-primary group cursor-pointer"
        >
          <span className="border-b border-on-primary/40 pb-0.5 group-hover:border-on-primary transition-all duration-500">
            {t('read_story')}
          </span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-on-primary-container text-base"
          >
            →
          </motion.span>
        </motion.a>
      </div>

      {/* SCROLL indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="hidden sm:flex absolute bottom-10 right-16 z-10 flex-col items-center gap-3"
      >
        <motion.div
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-14 bg-on-primary/25 origin-top"
        />
        <span 
          className="text-[9px] tracking-[0.45em] uppercase text-on-primary/40 mt-2"
          style={{ writingMode: 'vertical-rl' }}
        >
          {t('scroll')}
        </span>
      </motion.div>

      {/* Decorative edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}
