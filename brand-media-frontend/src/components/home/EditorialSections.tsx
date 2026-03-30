"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function EditorialSections() {
  const locale = useLocale();
  const { editorialSections } = getMockData(locale);

  if (!editorialSections || editorialSections.length < 2) return null;

  return (
    <section className="bg-surface-container-low py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 space-y-20 md:space-y-48">
        
        {/* Row 1: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <FadeIn direction="up">
              <div className="aspect-[4/3] md:aspect-[4/5] rounded-sm overflow-hidden z-10 relative group cursor-pointer">
                <Image 
                  className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[0.25,0.46,0.45,0.94] will-change-transform" 
                  alt={editorialSections[0].title}
                  src={editorialSections[0].image} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
            <div className="hidden lg:block absolute -bottom-12 -right-12 w-2/3 h-2/3 bg-surface-container-high -z-10"></div>
          </div>
          <div className="order-1 lg:order-2 space-y-5 md:space-y-8 max-w-xl">
            <FadeIn direction="up" delay={0.1}>
              <h3 className="text-2xl md:text-4xl font-serif text-primary italic">{editorialSections[0].title}</h3>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="text-on-surface-variant leading-[1.8] text-base md:text-lg">
                {editorialSections[0].content}
              </p>
            </FadeIn>
          </div>
        </div>
        
        {/* Row 2: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-5 md:space-y-8 max-w-xl lg:ml-auto order-1">
            <FadeIn direction="up" delay={0.1}>
              <h3 className="text-2xl md:text-4xl font-serif text-primary italic">{editorialSections[1].title}</h3>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="text-on-surface-variant leading-[1.8] text-base md:text-lg">
                {editorialSections[1].content}
              </p>
            </FadeIn>
          </div>
          <div className="relative order-2">
            <FadeIn direction="up">
              <div className="aspect-[4/3] md:aspect-[4/5] rounded-sm overflow-hidden z-10 relative group cursor-pointer">
                <Image 
                  className="object-cover transform group-hover:scale-[1.04] transition-transform duration-[2000ms] ease-[0.25,0.46,0.45,0.94] will-change-transform" 
                  alt={editorialSections[1].title}
                  src={editorialSections[1].image} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
            <div className="hidden lg:block absolute -top-12 -left-12 w-2/3 h-2/3 bg-primary-container/10 -z-10"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
