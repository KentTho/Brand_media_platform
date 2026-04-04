"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { getMockData } from '@/data/mockData';

export default function ProductsHero() {
  const locale = useLocale();
  const { productsPage } = getMockData(locale);
  const { hero } = productsPage;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-end overflow-hidden">
      {/* Parallax background */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.25}px) scale(1.1)` }}
      >
        <Image
          className="object-cover"
          alt={hero.title}
          src={hero.image}
          fill
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062928]/95 via-[#062928]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062928]/70 to-transparent" />
        {/* Linen texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px)`
        }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-16 pb-16 md:pb-32 pt-32 md:pt-48 max-w-full md:max-w-[780px]">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-center gap-4 mb-6 md:mb-8"
        >
          <div className="w-8 h-px bg-on-primary-container/50" />
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-on-primary-container/70 font-light">
            {hero.eyebrow}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-on-primary leading-[1.06] tracking-tight mb-6 md:mb-8"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)' }}
        >
          {hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-on-primary/60 text-sm md:text-base leading-[1.9] font-light max-w-[500px] mb-10 md:mb-14"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA - scroll down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.1 }}
          className="flex items-center gap-4 text-xs tracking-[0.25em] uppercase text-on-primary/50 group cursor-pointer"
        >
          <motion.div
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-10 bg-on-primary/30 origin-top"
          />
          <span>{hero.tag}</span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
}
