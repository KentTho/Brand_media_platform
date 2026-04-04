'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';

export default function NewsletterSuccess() {
  const locale = useLocale();
  const isVi = locale === 'vi';

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 overflow-hidden">
      {/* Linen texture bg */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)`
      }} />

      <div className="relative z-10 text-center max-w-xl mx-auto space-y-8 md:space-y-10 py-32">

        {/* Animated checkmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-16 h-16 md:w-20 md:h-20 mx-auto border border-primary/40 rounded-full flex items-center justify-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-7 h-7 text-primary"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.4 }}
          >
            <motion.path
              d="M20 6L9 17l-5-5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            />
          </motion.svg>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-16 h-px bg-outline/30 mx-auto"
        />

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="space-y-4 md:space-y-5"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-outline/50">
            {isVi ? 'ĐĂNG KÝ THÀNH CÔNG' : 'NEWSLETTER CONFIRMED'}
          </p>
          <h1 className="font-serif text-primary italic" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {isVi
              ? 'Sự hiện diện của bạn đã được ghi nhận vào biên niên sử.'
              : 'A confirmation of your presence has been dispatched to your inbox.'}
          </h1>
          <p className="text-on-surface-variant font-light text-sm md:text-base leading-relaxed">
            {isVi
              ? 'Bạn sẽ nhận được những thiền định hàng tuần về lối sống chậm, thiết kế bền vững và nghệ thuật xúc giác từ biên tập viên của chúng tôi.'
              : 'You will receive weekly meditations on slow living, sustainable design, and the tactile arts from our editorial team.'}
          </p>
        </motion.div>

        {/* Editorial quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="py-6 md:py-8 px-6 bg-surface-container-low border-l-2 border-primary/30 text-left"
        >
          <p className="font-serif italic text-on-surface-variant text-sm md:text-base leading-relaxed">
            {isVi
              ? '"Trong những khoảng trống yên tĩnh giữa những con chữ, chúng ta tìm thấy kết cấu của sự kết nối thực sự."'
              : '"In the quiet spaces between words, we find the texture of true connection."'}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-primary text-on-primary text-[10px] tracking-[0.2em] uppercase hover:bg-secondary transition-colors duration-300"
          >
            {isVi ? 'TIẾP TỤC KHÁM PHÁ' : 'CONTINUE EXPLORING'}
          </Link>
          <Link
            href="/lifestyle"
            className="inline-flex items-center justify-center px-7 py-3.5 border border-outline/30 text-outline text-[10px] tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-all duration-300"
          >
            {isVi ? 'ĐỌC LỐI SỐNG' : 'READ LIFESTYLE'}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
