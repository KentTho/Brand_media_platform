'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)`
      }} />

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8 md:space-y-10 py-32 md:py-0">

        {/* Large editorial 404 number */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p
            className="font-serif text-outline/10 select-none leading-none"
            style={{ fontSize: 'clamp(8rem, 25vw, 18rem)', lineHeight: 0.85 }}
          >
            404
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-16 h-px bg-outline/30 mx-auto"
        />

        {/* Editorial message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="space-y-4 md:space-y-5"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-outline/50">
            {isVi ? 'TRANG KHÔNG TÌM THẤY' : 'PAGE NOT FOUND'}
          </p>
          <h1 className="font-serif text-primary italic" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {isVi
              ? 'Những trang của thời gian đã lật qua, nhưng câu chuyện này vẫn chưa được viết ra.'
              : 'The pages of time have turned, but this particular chronicle remains unwritten.'}
          </h1>
          <p className="text-on-surface-variant font-light text-sm md:text-base leading-relaxed max-w-md mx-auto">
            {isVi
              ? 'Có lẽ nó đã được lưu trữ trong kho thư mục cũ. Hãy quay lại và khám phá những câu chuyện khác.'
              : 'It may have been tucked away in the archives. Return and explore other chronicles waiting to be discovered.'}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-2"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-primary text-on-primary text-[10px] tracking-[0.2em] uppercase hover:bg-secondary transition-colors duration-300"
          >
            {isVi ? 'QUAY LẠI TRANG CHỦ' : 'RETURN TO JOURNAL'}
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-3 px-7 py-3.5 border border-outline/30 text-outline text-[10px] tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            {isVi ? 'TÌM KIẾM' : 'SEARCH ARCHIVE'}
          </Link>
        </motion.div>

        {/* Navigation links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap justify-center gap-6 pt-4 text-[9px] tracking-[0.3em] uppercase text-outline/40"
        >
          {[
            { href: '/journal', labelVi: 'Tạp Chí', labelEn: 'Journal' },
            { href: '/materials', labelVi: 'Chất Liệu', labelEn: 'Materials' },
            { href: '/lifestyle', labelVi: 'Lối Sống', labelEn: 'Lifestyle' },
            { href: '/products', labelVi: 'Sản Phẩm', labelEn: 'Products' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {isVi ? link.labelVi : link.labelEn}
            </Link>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
