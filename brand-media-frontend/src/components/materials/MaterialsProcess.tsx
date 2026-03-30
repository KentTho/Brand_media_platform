"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function MaterialsProcess() {
  const locale = useLocale();
  const { materialsPage } = getMockData(locale);
  const { processSections } = materialsPage;

  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">

        {/* Mobile: stacked cards. Tablet+: mosaic grid */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6">

          {/* Mobile: show all sections as clean stacked cards */}
          {/* Tablet/Desktop: asymmetric mosaic */}

          {/* Cell 1: Tall image — spans 2 rows on desktop */}
          <FadeIn direction="up" className="md:row-span-2">
            <div className="group cursor-pointer overflow-hidden aspect-[4/3] md:aspect-auto md:h-full relative min-h-[240px] md:min-h-0">
              <Image
                className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[2000ms]"
                src={processSections[0].image}
                alt={processSections[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute top-4 left-4 text-[9px] tracking-[0.35em] uppercase bg-surface/90 backdrop-blur-sm text-primary px-3 py-1.5 font-semibold">
                {processSections[0].tag}
              </span>
            </div>
          </FadeIn>

          {/* Cell 2: Zero Waste text block */}
          <FadeIn direction="up" delay={0.1} className="bg-surface-container-low p-7 md:p-10 flex flex-col justify-center space-y-4 md:space-y-5">
            <span className="text-[9px] tracking-[0.4em] uppercase text-outline/60">{processSections[1].tag}</span>
            <h3 className="text-xl md:text-2xl font-serif text-primary italic">{processSections[1].title}</h3>
            <p className="text-on-surface-variant text-sm leading-[1.8] font-light">
              {processSections[1].content}
            </p>
          </FadeIn>

          {/* Cell 3: Small image */}
          <FadeIn direction="up" delay={0.2}>
            <div className="group cursor-pointer overflow-hidden aspect-[4/3] md:aspect-square relative min-h-[200px] md:min-h-0">
              <Image
                className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[2000ms]"
                src={processSections[2].image}
                alt={processSections[2].title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute top-4 left-4 text-[9px] tracking-[0.35em] uppercase bg-surface/90 backdrop-blur-sm text-primary px-3 py-1.5 font-semibold">
                {processSections[2].tag}
              </span>
            </div>
          </FadeIn>

          {/* Cell 4: Retting Process text */}
          <FadeIn direction="up" delay={0.15} className="bg-surface-container p-7 md:p-10 space-y-3 md:space-y-4 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-serif text-primary">{processSections[0].title}</h3>
            <p className="text-on-surface-variant text-sm leading-[1.8] font-light">
              {processSections[0].content}
            </p>
          </FadeIn>

          {/* Cell 5: Zero Waste text */}
          <FadeIn direction="up" delay={0.25} className="p-7 md:p-10 bg-surface-container-lowest border border-outline/8 flex flex-col justify-center space-y-3 md:space-y-4">
            <h3 className="text-xl md:text-2xl font-serif text-primary italic">{processSections[2].title}</h3>
            <p className="text-on-surface-variant text-sm leading-[1.8] font-light">
              {processSections[2].content}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
