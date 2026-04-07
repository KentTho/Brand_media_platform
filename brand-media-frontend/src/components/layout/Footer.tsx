"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="w-full pt-16 md:pt-24 pb-10 md:pb-12 bg-primary-container text-on-primary border-t border-on-primary/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 px-6 md:px-12 max-w-[1920px] mx-auto">
        
        {/* Brand description — full width on mobile */}
        <div className="col-span-2 space-y-5 md:space-y-8">
          <Link href="/" className="group flex items-baseline tracking-tighter transition-all duration-300 hover:scale-110 inline-block">
            <span 
              className="font-serif text-3xl md:text-4xl font-black bg-gradient-to-b from-[#FFD700] via-[#FDFBBE] to-[#B8860B] bg-clip-text text-transparent"
              style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(1px 1px 0px #8A6623) drop-shadow(2px 2px 0px #5E4514) drop-shadow(4px 4px 8px rgba(0,0,0,0.8))'
              }}
            >
              DKF
            </span>
            <span 
              className="font-serif text-xl md:text-2xl font-black bg-gradient-to-b from-[#FFD700] via-[#FDFBBE] to-[#B8860B] bg-clip-text text-transparent ml-[2px]"
              style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(1px 1px 0px #8A6623) drop-shadow(2px 2px 0px #5E4514) drop-shadow(4px 4px 8px rgba(0,0,0,0.8))'
              }}
            >
              s
            </span>
          </Link>
          <p className="font-serif text-sm md:text-base leading-[1.8] text-on-primary/60 max-w-md">
            {t('description')}
          </p>
        </div>
        
        {/* Journal column */}
        <div className="space-y-4 md:space-y-6">
          <h4 className="text-xs uppercase tracking-widest text-on-primary/30">{t('journal_col')}</h4>
          <ul className="space-y-3 md:space-y-4 font-serif">
            <li><Link className="text-sm md:text-base text-on-primary/60 hover:text-on-primary transition-colors" href="#">{t('material_stories')}</Link></li>
            <li><Link className="text-sm md:text-base text-on-primary/60 hover:text-on-primary transition-colors" href="#">{t('slow_living')}</Link></li>
            <li><Link className="text-sm md:text-base text-on-primary/60 hover:text-on-primary transition-colors" href="#">{t('craft_culture')}</Link></li>
            <li><Link className="text-sm md:text-base text-on-primary/60 hover:text-on-primary transition-colors" href="#">{t('sustainability')}</Link></li>
          </ul>
        </div>
        
        {/* Brand column */}
        <div className="space-y-4 md:space-y-6">
          <h4 className="text-xs uppercase tracking-widest text-on-primary/30">{t('brand_col')}</h4>
          <ul className="space-y-3 md:space-y-4 font-serif">
            <li><Link className="text-sm md:text-base text-on-primary/60 hover:text-on-primary transition-colors" href="#">{t('about_us')}</Link></li>
            <li><Link className="text-sm md:text-base text-on-primary/60 hover:text-on-primary transition-colors" href="#">{t('our_philosophy')}</Link></li>
            <li><Link className="text-sm md:text-base text-on-primary/60 hover:text-on-primary transition-colors" href="#">{t('products')}</Link></li>
            <li><Link className="text-sm md:text-base text-on-primary/60 hover:text-on-primary transition-colors" href="#">{t('contact')}</Link></li>
          </ul>
        </div>
        
      </div>
      
      {/* Bottom bar */}
      <div className="px-6 md:px-12 mt-12 md:mt-24 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-on-primary/8 pt-6 md:pt-8 max-w-[1920px] mx-auto">
        <span className="text-[10px] uppercase tracking-widest text-on-primary/30">{t('copyright')}</span>
        <div className="flex gap-3 md:gap-4 text-[10px] uppercase tracking-widest text-on-primary/30">
          <Link href="/" locale="vi" className="hover:text-on-primary transition-colors">VI</Link>
          <Link href="/" locale="en" className="hover:text-on-primary transition-colors">EN</Link>
          <Link href="/" locale="ru" className="hover:text-on-primary transition-colors">RU</Link>
          <Link href="/" locale="zh" className="hover:text-on-primary transition-colors">ZH</Link>
          <Link href="/" locale="ar" className="hover:text-on-primary transition-colors">AR</Link>
        </div>
      </div>
    </footer>
  );
}