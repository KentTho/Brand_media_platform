"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/ui/FadeIn';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative py-24 md:py-40 px-6 md:px-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A3C34 0%, #0D2B27 100%)' }}>
      {/* Texture layer */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)`
      }}></div>

      <div className="relative max-w-2xl mx-auto text-center space-y-8 md:space-y-12">
        {/* Section tag */}
        <FadeIn direction="up">
          <div className="flex items-center justify-center gap-4">
            <div className="w-6 md:w-8 h-px bg-on-primary-container/40"></div>
            <span className="text-on-primary-container/60 text-[10px] tracking-[0.4em] uppercase">NEWSLETTER</span>
            <div className="w-6 md:w-8 h-px bg-on-primary-container/40"></div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h2 
            className="font-serif text-on-primary leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
          >
            {t('title')}
          </h2>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2}>
          <p className="text-on-primary/50 font-light text-sm md:text-base leading-relaxed">
            {t('subtitle')}
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto flex flex-col sm:flex-row gap-0 border border-on-primary/20 hover:border-on-primary/40 transition-colors">
              <input 
                className="flex-1 bg-transparent py-4 px-5 focus:outline-none text-sm text-on-primary placeholder:text-on-primary/30 font-light" 
                placeholder={t('placeholder')}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                className="bg-accent-warm text-primary uppercase tracking-[0.18em] text-[11px] font-bold px-7 py-4 hover:bg-white transition-colors cursor-pointer flex-shrink-0" 
                type="submit"
              >
                {t('button')}
              </button>
            </form>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-on-primary-container text-base md:text-lg font-serif italic"
            >
              {t('thanks')}
            </motion.p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
