/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
  </svg>
);

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    } else {
      router.push('/search');
      setSearchOpen(false);
    }
  };

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { name: 'home', href: '/' },
    { name: 'journal', href: '/journal' },
    { name: 'materials', href: '/materials' },
    { name: 'lifestyle', href: '/lifestyle' },
    { name: 'products', href: '/products' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-[100] bg-primary-container/90 backdrop-blur-xl border-b border-on-primary/5 shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all">
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 md:py-5 max-w-[1920px] mx-auto">

          {/* Logo */}
          <Link href="/" className="font-serif text-xl md:text-2xl tracking-tighter text-on-primary font-bold hover:opacity-70 transition-opacity">
            DKFS
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-12 font-serif italic text-lg tracking-wide">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  className={`transition-all duration-500 pb-1 border-b-2 ${isActive
                    ? 'text-on-primary border-on-primary/60 font-bold'
                    : 'text-on-primary/60 border-transparent hover:text-on-primary hover:border-on-primary/30'
                    }`}
                  href={item.href}
                >
                  {t(item.name)}
                </Link>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Search icon button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="w-9 h-9 flex items-center justify-center text-on-primary/60 hover:text-on-primary transition-colors rounded-sm hover:bg-on-primary/10"
            >
              <SearchIcon className="w-4 h-4" />
            </button>

            <LanguageSwitcher />

            {/* Logo avatar — desktop only */}
            <div className="hidden md:block w-8 h-8 rounded-full bg-on-primary/5 overflow-hidden relative ring-2 ring-on-primary/20">
              <Image alt="DKFS Logo" className="object-cover" src="/images/logo-icon.jpg" fill sizes="32px" />
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-sm hover:bg-on-primary/10 transition-colors"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5 h-px bg-on-primary origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px bg-on-primary"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5 h-px bg-on-primary origin-center"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Search dropdown overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[65px] left-0 right-0 z-[99] bg-primary-container/98 backdrop-blur-xl border-b border-on-primary/10 shadow-2xl"
          >
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto px-6 py-5 flex gap-3 items-center">
              <SearchIcon className="w-4 h-4 text-on-primary/40 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={locale === 'vi' ? 'Tìm kiếm bài viết, chủ đề...' : 'Search articles, topics...'}
                className="flex-1 bg-transparent text-on-primary placeholder:text-on-primary/30 outline-none text-base font-light"
              />
              <button type="submit" className="text-[9px] tracking-[0.3em] uppercase text-on-primary/50 hover:text-on-primary transition-colors px-3 py-1.5 border border-on-primary/20 hover:border-on-primary/50">
                {locale === 'vi' ? 'TÌM' : 'GO'}
              </button>
              <button type="button" onClick={() => setSearchOpen(false)} className="ml-1 text-on-primary/40 hover:text-on-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[90] bg-primary-container/98 backdrop-blur-2xl flex flex-col justify-center items-start px-10 pt-24 pb-16 md:hidden"
          >
            {/* Nav links */}
            <nav className="flex flex-col space-y-1 w-full">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block font-serif italic py-4 border-b border-on-primary/8 transition-all ${isActive
                        ? 'text-on-primary text-4xl'
                        : 'text-on-primary/50 text-3xl hover:text-on-primary'
                        }`}
                    >
                      {t(item.name)}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile search link */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: navItems.length * 0.07 }}
            >
              <Link
                href="/search"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 font-serif italic py-4 border-b border-on-primary/8 text-on-primary/50 text-3xl hover:text-on-primary transition-all"
              >
                <SearchIcon className="w-7 h-7" />
                {locale === 'vi' ? 'Tìm Kiếm' : 'Search'}
              </Link>
            </motion.div>

            {/* Bottom: logo + lang */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-auto pt-12 flex items-center gap-6"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden relative ring-2 ring-on-primary/20">
                <Image alt="DKFS Logo" className="object-cover" src="/images/logo-icon.jpg" fill sizes="40px" />
              </div>
              <span className="font-serif text-on-primary/40 text-sm">DKFS · Vintage Nature</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}