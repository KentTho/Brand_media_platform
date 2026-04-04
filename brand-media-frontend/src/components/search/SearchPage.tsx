"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getMockData } from '@/data/mockData';
import { Link } from '@/navigation';
import FadeIn from '@/components/ui/FadeIn';
import { AnimatePresence, motion } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', labelVi: 'Tất cả', labelEn: 'All' },
  { id: 'journal', labelVi: 'Tạp chí', labelEn: 'Journal' },
  { id: 'materials', labelVi: 'Chất liệu', labelEn: 'Materials' },
  { id: 'lifestyle', labelVi: 'Lối sống', labelEn: 'Lifestyle' },
  { id: 'products', labelVi: 'Sản phẩm', labelEn: 'Products' },
];

const QUOTE = {
  vi: '"Thiên nhiên không vội vã, nhưng mọi thứ đều được hoàn thành."',
  en: '"Nature does not hurry, yet everything is accomplished."',
};
const QUOTE_AUTHOR = 'Elena Voss · Master Weaver';

export default function SearchPage() {
  const locale = useLocale();
  const { journalArticles, lifestylePage } = getMockData(locale);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Aggregate all searchable content
  const allItems = [
    ...journalArticles.map(a => ({ title: a.title, excerpt: a.excerpt, image: a.image, tag: a.tag ?? '', section: 'journal', href: '/journal' })),
    ...lifestylePage.articles.map(a => ({ title: a.title, excerpt: a.excerpt, image: a.image, tag: a.tag ?? '', section: 'lifestyle', href: `/lifestyle/${a.slug}` })),
  ];

  const filtered = allItems.filter(item => {
    const matchesQuery = !query || item.title.toLowerCase().includes(query.toLowerCase()) || item.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCategory === 'all' || item.section === activeCategory;
    return matchesQuery && matchesCat;
  });

  const hasNoResults = query.length > 0 && filtered.length === 0;

  const catLabel = (cat: typeof CATEGORIES[0]) => locale === 'vi' ? cat.labelVi : cat.labelEn;

  return (
    <main className="min-h-screen bg-background">
      {/* Search Hero */}
      <section className="pt-24 md:pt-36 pb-12 md:pb-20 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-6 h-px bg-outline" />
              <span className="text-[10px] tracking-[0.45em] uppercase text-outline/60">
                {locale === 'vi' ? 'TÌM KIẾM & KHÁM PHÁ' : 'SEARCH & EXPLORATION'}
              </span>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h1 className="font-serif text-primary mb-8 md:mb-10" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              {locale === 'vi' ? 'Tìm Kiếm Biên Niên Sử' : 'Journal Search & Exploration'}
            </h1>
          </FadeIn>

          {/* Search input */}
          <FadeIn direction="up" delay={0.15}>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={locale === 'vi' ? 'Tìm kiếm bài viết, chủ đề, chất liệu...' : 'Search articles, topics, materials...'}
                className="w-full bg-background border border-outline/20 focus:border-primary/60 outline-none text-on-background placeholder:text-outline/40 font-light text-base md:text-lg px-5 md:px-6 py-4 md:py-5 pr-14 transition-colors"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-outline/40">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
            </div>
          </FadeIn>

          {/* Category filters */}
          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-wrap gap-2 md:gap-3 mt-5 md:mt-6">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-[9px] md:text-[10px] tracking-[0.35em] uppercase px-4 py-2 border transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'border-primary bg-primary text-on-primary'
                      : 'border-outline/20 text-outline/60 hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  {catLabel(cat)}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto">
          <AnimatePresence mode="wait">
            {hasNoResults ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 md:py-32 space-y-5"
              >
                <p className="text-outline/40 text-4xl md:text-6xl font-serif italic">∅</p>
                <p className="text-on-surface-variant font-light text-base">
                  {locale === 'vi'
                    ? 'Không tìm thấy kết quả nào. Hãy thử từ khóa khác hoặc khám phá các chủ đề.'
                    : "We couldn't find any results. Consider exploring our curated themes or checking your spelling."}
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                    <button key={cat.id} onClick={() => { setQuery(''); setActiveCategory(cat.id); }}
                      className="text-[9px] tracking-[0.35em] uppercase px-4 py-2 border border-outline/20 text-outline/60 hover:border-primary hover:text-primary transition-all">
                      {catLabel(cat)}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Result count */}
                {query && (
                  <p className="text-outline/50 text-[10px] tracking-widest uppercase mb-8 md:mb-12">
                    {filtered.length} {locale === 'vi' ? 'kết quả' : 'results'}
                  </p>
                )}

                {/* Curated editorial items (when no query) */}
                {!query && (
                  <div className="mb-12 md:mb-16">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-outline/50 mb-8 md:mb-10">
                      {locale === 'vi' ? 'BÀI VIẾT TIÊU BIỂU' : 'CURATED STORIES'}
                    </p>
                  </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {filtered.map((item, i) => (
                    <FadeIn key={`${item.section}-${i}`} direction="up" delay={i * 0.07}>
                      <Link href={item.href} className="group block space-y-4 cursor-pointer">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transform group-hover:scale-[1.03] transition-transform duration-[2000ms] ease-out"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="text-[8px] tracking-[0.3em] uppercase bg-surface/90 backdrop-blur-sm text-primary px-3 py-1.5">{item.section.toUpperCase()}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[9px] tracking-[0.35em] uppercase text-outline/55">{item.tag}</p>
                          <h3 className="font-serif italic text-primary text-lg leading-tight group-hover:text-secondary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-on-surface-variant text-sm leading-relaxed font-light line-clamp-2">{item.excerpt}</p>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
                </div>

                {/* Inspirational quote — editorial touch */}
                {!query && (
                  <FadeIn direction="up" className="mt-20 md:mt-32 text-center">
                    <div className="max-w-xl mx-auto space-y-3">
                      <p className="font-serif italic text-outline text-base md:text-xl leading-relaxed">
                        {QUOTE[locale as 'vi' | 'en'] ?? QUOTE.en}
                      </p>
                      <p className="text-[9px] tracking-[0.4em] uppercase text-outline/50">{QUOTE_AUTHOR}</p>
                    </div>
                  </FadeIn>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
