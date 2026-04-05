"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { getMockData } from '@/data/mockData';

export default function LifestyleHero() {
  const locale = useLocale();
  const { lifestylePage } = getMockData(locale);
  const { hero } = lifestylePage;
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="pt-20 md:pt-0 overflow-hidden">
      {/* Full-bleed hero image with text overlay */}
      <div className="relative h-[70vh] md:h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient overlay bottom-up */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#062928]/90 via-[#062928]/40 to-transparent" />
          {/* Linen texture */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px)`
          }} />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 w-full px-6 md:px-16 pb-12 md:pb-20">
          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-3 md:gap-6 mb-8 md:mb-12 flex-wrap"
          >
            {hero.categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`text-[9px] md:text-[10px] tracking-[0.4em] uppercase px-4 py-2 border transition-all duration-300 cursor-pointer ${
                  activeCategory === i
                    ? 'border-on-primary bg-on-primary/15 text-on-primary'
                    : 'border-on-primary/30 text-on-primary/50 hover:border-on-primary/60 hover:text-on-primary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-on-primary leading-tight mb-5 md:mb-6 max-w-3xl"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.65 }}
            className="text-on-primary/60 font-light text-sm md:text-base max-w-lg leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>
        </div>

        {/* Bottom fade to background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
      </div>
    </section>
  );
}
