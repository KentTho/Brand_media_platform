// ── Article Types ─────────────────────────────────────────
export interface Article {
    id: string
    slug: string
    title: string
    titleVI?: string
    excerpt: string
    content?: string
    category: ArticleCategory
    tags: string[]
    author: Author
    publishedAt: string
    readTime: number
    image: {
      src: string
      alt: string
      credit?: string
    }
    featured?: boolean
  }
  
  export type ArticleCategory =
    | 'editorial'
    | 'material'
    | 'lifestyle'
    | 'brand-story'
    | 'craft'
    | 'sustainability'
  
  // ── Author ────────────────────────────────────────────────
  export interface Author {
    id: string
    name: string
    role?: string
    avatar?: string
  }
  
  // ── Product Story ─────────────────────────────────────────
  export interface ProductStory {
    id: string
    slug: string
    name: string
    category: string
    description: string
    story: string
    material: string
    image: {
      src: string
      alt: string
    }
  }
  
  // ── Material ──────────────────────────────────────────────
  export interface Material {
    id: string
    name: string
    origin: string
    description: string
    properties: string[]
    image: {
      src: string
      alt: string
    }
  }
  
  // ── Navigation ────────────────────────────────────────────
  export interface NavItem {
    label: string
    labelVI?: string
    href: string
  }
  
  // ── Language ──────────────────────────────────────────────
  export type Locale = 'en' | 'vi' | 'ru' | 'zh' | 'ar'
  
  export interface LocaleConfig {
    code: Locale
    name: string
    dir: 'ltr' | 'rtl'
    slogan: string
  }
  
  // ── Newsletter ────────────────────────────────────────────
  export interface NewsletterSubscriber {
    email: string
    locale: Locale
    subscribedAt: string
  }