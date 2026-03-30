import type { Article, Author, ProductStory, Material, LocaleConfig, NavItem } from '@/types'

// ── Authors ───────────────────────────────────────────────
export const AUTHORS: Author[] = [
  {
    id: 'dk-team',
    name: 'DKFS Editorial',
    role: 'Brand Storyteller',
  },
  {
    id: 'minh-anh',
    name: 'Minh Anh',
    role: 'Material Specialist',
  },
  {
    id: 'ha-linh',
    name: 'Hà Linh',
    role: 'Lifestyle Editor',
  },
]

// ── Articles ──────────────────────────────────────────────
export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'why-we-chose-linen',
    title: 'Why We Chose Linen: A Story of Touch and Memory',
    titleVI: 'Tại sao chúng tôi chọn vải lanh',
    excerpt: 'There is something ancient in the way linen feels against skin. Long before synthetic fibres existed, humans wore cloth woven from flax plants — a material with a texture that tells of its origin.',
    category: 'brand-story',
    tags: ['linen', 'materials', 'origin', 'craft'],
    author: AUTHORS[0],
    publishedAt: '2024-11-15',
    readTime: 8,
    image: {
      src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85',
      alt: 'Woven linen fabric in natural light',
    },
    featured: true,
  },
  {
    id: '2',
    slug: 'the-slow-morning',
    title: 'The Slow Morning: A Ritual of Presence',
    titleVI: 'Buổi sáng chậm: Nghi thức của hiện tại',
    excerpt: 'We wake before the light turns gold. There is a quality of stillness in early morning that modern life rarely allows — a moment before the notifications begin.',
    category: 'lifestyle',
    tags: ['slow-living', 'morning', 'ritual', 'mindfulness'],
    author: AUTHORS[2],
    publishedAt: '2024-10-28',
    readTime: 6,
    image: {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85',
      alt: 'Morning light through linen curtains',
    },
    featured: true,
  },
  {
    id: '3',
    slug: 'linen-from-field-to-fabric',
    title: 'From Field to Fabric: The Journey of Flax',
    titleVI: 'Từ đồng ruộng đến vải: Hành trình của cây lanh',
    excerpt: 'The flax plant has fed and clothed humanity for over 30,000 years. In a small village in northern France, farmers still harvest by hand — preserving a ritual older than writing itself.',
    category: 'material',
    tags: ['linen', 'flax', 'production', 'craft', 'France'],
    author: AUTHORS[1],
    publishedAt: '2024-10-10',
    readTime: 12,
    image: {
      src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85',
      alt: 'Natural linen fabric texture close-up',
    },
    featured: false,
  },
  {
    id: '4',
    slug: 'vintage-nature-philosophy',
    title: 'Vintage Nature: The DKFS Design Philosophy',
    titleVI: 'Vintage Nature: Triết lý thiết kế của DKFS',
    excerpt: 'Every piece we create carries two inheritances — the heritage of craft traditions passed through generations, and the quiet honesty of natural materials.',
    category: 'editorial',
    tags: ['brand', 'philosophy', 'design', 'craft'],
    author: AUTHORS[0],
    publishedAt: '2024-09-20',
    readTime: 7,
    image: {
      src: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=1400&q=85',
      alt: 'Natural textile with botanical elements',
    },
    featured: false,
  },
  {
    id: '5',
    slug: 'the-art-of-doing-less',
    title: 'The Art of Doing Less: Embracing a Slower Wardrobe',
    titleVI: 'Nghệ thuật làm ít hơn: Chấp nhận tủ quần áo chậm hơn',
    excerpt: 'The fast fashion industry produces 100 billion garments a year. Most will be discarded within twelve months. We believe there is another way — one that begins with asking different questions.',
    category: 'sustainability',
    tags: ['sustainability', 'slow-fashion', 'conscious', 'minimal'],
    author: AUTHORS[2],
    publishedAt: '2024-09-05',
    readTime: 9,
    image: {
      src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85',
      alt: 'Minimal natural wardrobe',
    },
    featured: false,
  },
  {
    id: '6',
    slug: 'craft-conversations-weavers',
    title: 'Craft Conversations: The Weavers of Hội An',
    titleVI: 'Trò chuyện về nghề thủ công: Những người thợ dệt ở Hội An',
    excerpt: 'In the ancient town of Hội An, we sat with third-generation weavers who still practice the same techniques their grandmothers taught them.',
    category: 'craft',
    tags: ['craft', 'weavers', 'Vietnam', 'heritage', 'artisan'],
    author: AUTHORS[0],
    publishedAt: '2024-08-18',
    readTime: 10,
    image: {
      src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85',
      alt: 'Traditional Vietnamese weaving craft',
    },
    featured: false,
  },
]

// ── Product Stories ───────────────────────────────────────
export const PRODUCT_STORIES: ProductStory[] = [
  {
    id: 'p1',
    slug: 'the-linen-shirt',
    name: 'The Linen Shirt',
    category: 'Apparel',
    description: 'Woven in Italy from long-staple European flax.',
    story: 'This shirt began as a question: what does it feel like to wear something made without compromise? The answer took three years and seven iterations.',
    material: '100% European Linen',
    image: {
      src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=85',
      alt: 'The DKFS linen shirt in natural light',
    },
  },
  {
    id: 'p2',
    slug: 'linen-home-throw',
    name: 'The Home Throw',
    category: 'Living',
    description: 'A piece of evening — gathered in cloth.',
    story: 'We wanted to create something that would soften the transition between day and rest. The result is this throw, woven with just the right weight.',
    material: '100% Washed Linen',
    image: {
      src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85',
      alt: 'Linen throw on a natural wood chair',
    },
  },
]

// ── Materials ─────────────────────────────────────────────
export const MATERIALS: Material[] = [
  {
    id: 'm1',
    name: 'European Linen',
    origin: 'Normandy, France',
    description: 'The finest flax linen in the world, grown in the unique microclimate of northwestern France where cool rain and rich soil produce the strongest, finest fibres.',
    properties: ['Thermoregulating', 'Antibacterial', 'Gets softer with age', 'Biodegradable', '20× stronger than cotton'],
    image: {
      src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85',
      alt: 'European linen close-up texture',
    },
  },
  {
    id: 'm2',
    name: 'Stone-Washed Linen',
    origin: 'Italy',
    description: 'Traditional stone-washing softens raw linen while preserving its natural drape and strength. The process reveals the fabric\'s true character — relaxed, tactile, honest.',
    properties: ['Pre-softened', 'Relaxed texture', 'Minimal shrinkage', 'Rich drape'],
    image: {
      src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85',
      alt: 'Stone-washed linen texture',
    },
  },
]

// ── Navigation ────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: 'Journal',    href: '/journal' },
  { label: 'Materials',  href: '/materials' },
  { label: 'Products',   href: '/products' },
  { label: 'Lifestyle',  href: '/lifestyle' },
  { label: 'About',      href: '/about' },
]

// ── Locales ───────────────────────────────────────────────
export const LOCALES: LocaleConfig[] = [
  {
    code: 'en',
    name: 'English',
    dir: 'ltr',
    slogan: 'Real Touch Real Emotions',
  },
  {
    code: 'vi',
    name: 'Tiếng Việt',
    dir: 'ltr',
    slogan: 'Chạm thật – Cảm xúc thật',
  },
  {
    code: 'ru',
    name: 'Русский',
    dir: 'ltr',
    slogan: 'Настоящее прикосновение – настоящие эмоции',
  },
  {
    code: 'zh',
    name: '中文',
    dir: 'ltr',
    slogan: '真实触感 · 真实情感',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    slogan: 'لمسة حقيقية · مشاعر حقيقية',
  },
]

// ── Category Labels ───────────────────────────────────────
export const CATEGORY_LABELS: Record<string, string> = {
  editorial:       'Editorial',
  material:        'Material',
  lifestyle:       'Lifestyle',
  'brand-story':   'Brand Story',
  craft:           'Craft',
  sustainability:  'Sustainability',
}