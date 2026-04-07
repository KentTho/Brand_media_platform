"use client";

import React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import FadeIn from '@/components/ui/FadeIn';

export default function MaterialsQuality() {
  const locale = useLocale();
  const { materialsPage } = getMockData(locale);
  const { quality } = materialsPage;

  return (
    <section className="py-16 md:py-32 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: Image — shows below text on mobile */}
          <FadeIn direction="up" className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden relative group cursor-pointer">
              <Image
                className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[2000ms]"
                src={quality.image}
                alt={quality.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative offset — desktop only */}
            <div className="hidden lg:block absolute -top-6 -left-6 w-1/2 h-1/2 bg-accent-cool/50 -z-10"></div>
          </FadeIn>

          {/* Right: Text content — shows first on mobile */}
          <div className="space-y-8 md:space-y-10 order-1 lg:order-2">
            <FadeIn direction="up">
              <h2 className="font-serif text-on-background" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                {quality.title}
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <p className="text-on-surface-variant leading-[1.85] text-sm md:text-base font-light">
                {quality.description}
              </p>
            </FadeIn>

            {/* Feature list */}
            <ul className="space-y-5 md:space-y-6">
              {quality.features.map((feature, i) => (
                <FadeIn key={i} direction="up" delay={0.1 + i * 0.08}>
                  <li className="flex gap-4 md:gap-5 items-start group">
                    <div className="w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-primary transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-on-background text-sm tracking-wide">{feature.label}</p>
                      <p className="text-on-surface-variant text-sm leading-relaxed font-light mt-0.5">{feature.desc}</p>
                    </div>
                  </li>
                </FadeIn>
              ))}
            </ul>

            {/* CTA */}
            <FadeIn direction="up" delay={0.35}>
              <a
                href="#"
                className="inline-flex items-center gap-4 mt-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-on-primary text-xs tracking-[0.2em] uppercase hover:bg-secondary transition-colors duration-300 cursor-pointer"
              >
                {quality.cta}
                <span className="text-on-primary/60">→</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
