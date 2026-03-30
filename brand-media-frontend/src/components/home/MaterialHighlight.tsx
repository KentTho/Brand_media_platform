"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function MaterialHighlight() {
  const locale = useLocale();
  const { materialHighlight } = getMockData(locale);
  const t = { manifesto: 'DKFS Manifesto' }; // inline fallback — handled by parent translations

  if (!materialHighlight) return null;

  return (
    <section className="py-16 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto bg-surface-container-highest p-8 md:p-24 rounded-sm flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 space-y-6 md:space-y-8 w-full">
          <FadeIn direction="up">
            <span className="text-xs md:text-sm tracking-widest text-outline uppercase">{materialHighlight.tag}</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-serif text-primary">{materialHighlight.title}</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-on-surface-variant font-light italic leading-relaxed">
              {materialHighlight.quote}
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <div className="flex gap-4">
              <div className="w-12 h-px bg-primary mt-4"></div>
              <p className="text-primary font-medium">DKFS Manifesto</p>
            </div>
          </FadeIn>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-3 md:gap-4 w-full">
          <FadeIn direction="up" delay={0.2}>
            <div className="aspect-square bg-surface rounded-sm shadow-sm overflow-hidden relative group cursor-pointer">
              <Image 
                className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[0.25,0.46,0.45,0.94] will-change-transform" 
                alt="Material Detail" 
                src={materialHighlight.image1} 
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.4}>
            <div className="aspect-square bg-surface rounded-sm shadow-sm overflow-hidden md:translate-y-8 relative group cursor-pointer">
              <Image 
                className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[0.25,0.46,0.45,0.94] will-change-transform" 
                alt="Material Detail" 
                src={materialHighlight.image2} 
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
